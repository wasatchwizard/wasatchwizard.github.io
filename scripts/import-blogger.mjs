import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import TurndownService from "turndown";
import { parseHTML } from "linkedom";
import { postSourceVariants } from "./post-sources.mjs";

const archive = JSON.parse(await readFile("content-export/blogger.json", "utf8"));
const args = process.argv.slice(2);
const all = args.length === 1 && args[0] === "--all";
if (!args.length || (args.includes("--all") && !all)) {
  throw new Error("Pass original Blogger post URLs, or --all to import unmapped archive entries");
}
const mapPath = "content-export/import-map.json";
let mappings = [];
try { mappings = JSON.parse(await readFile(mapPath, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }
const titleFor = entry => parseHTML(`<span>${entry.title.$t.replaceAll("<", "&lt;")}</span>`)
  .document.querySelector("span").textContent;
function slugFor(entry) {
  const slug = titleFor(entry).normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) throw new Error(`Cannot generate a descriptive slug: ${entry.title.$t}`);
  return slug;
}
const originalUrlFor = entry => entry.link.find(link => link.rel === "alternate").href;
const paths = new Map();
const slugs = new Set();
for (const entry of archive.posts) {
  const slug = slugFor(entry);
  if (slugs.has(slug)) throw new Error(`Duplicate post slug needs manual review: ${slug}`);
  slugs.add(slug);
  paths.set(new URL(originalUrlFor(entry)).pathname, `/blog/${slug}/`);
}
const entries = all ? archive.posts.filter(entry => !mappings.some(item => item.bloggerId === entry.id.$t))
  : args.map(sourceUrl => {
    const originalPath = new URL(sourceUrl).pathname;
    const entry = archive.posts.find(post => new URL(originalUrlFor(post)).pathname === originalPath);
    if (!entry) throw new Error(`Post not found in export: ${sourceUrl}`);
    return entry;
  });

// BR is a visible line break in old code, even though DOM textContent omits it.
function codeText(node) {
  if (node.nodeType === 3) return node.textContent.replace(/\u00a0/g, " ");
  if (node.nodeName === "BR") return "\n";
  let text = [...node.childNodes].map(codeText).join("");
  if (node.classList?.contains("indentation")) {
    text = text.split("\n").map(line => line ? `    ${line}` : line).join("\n");
    if (node.nodeName === "DIV") text = `\n${text.replace(/\n?$/, "\n")}`;
  } else if (node.classList?.contains("indent1")) text = `    ${text}`;
  return text;
}
function languageFor(code) {
  if (/\b(?:Private |Public )?Sub\b|\bEnd Sub\b/.test(code)) return "vbnet";
  if (/^\s*#Persistent/m.test(code)) return "autohotkey";
  if (/^@echo off/i.test(code)) return "batch";
  if (/^\s*<(?:\?xml|VisualStudio|PropertyGroup|ToolInfo|root)\b/.test(code)) return "xml";
  if (/\bTCHAR\b|\bDWORD\b/.test(code)) return "cpp";
  if (/\b(?:public|private)\s+(?:class|void)|\b(?:Enum\.GetNames|XmlDocument|FieldInfo)\b/.test(code)) return "csharp";
  if (/\bjQuery\.fn\b|\bfunction\b|\btypeof\b/.test(code)) return "javascript";
  if (/^\s*[\[{]\s*"/.test(code)) return "json";
  return "text";
}
function fence(code, language) {
  const longest = Math.max(0, ...[...code.matchAll(/`+/g)].map(match => match[0].length));
  const delimiter = "`".repeat(Math.max(3, longest + 1));
  return `\n\n${delimiter}${language}\n${code.replace(/\n+$/, "")}\n${delimiter}\n\n`;
}
const mono = node => node.nodeType === 1 && /^(SPAN|FONT)$/.test(node.nodeName)
  && /Consolas|monospace|Courier/i.test(`${node.getAttribute("style")} ${node.getAttribute("face")}`);
const hash = text => createHash("sha256").update(text).digest("hex");

for (const entry of entries) {
  const title = titleFor(entry);
  const slug = slugFor(entry);
  const output = `src/posts/${slug}.md`;
  // An explicit historical import must not republish an intentionally hidden post.
  for (const existing of postSourceVariants(output)) {
    try { await access(existing); throw new Error(`Already exists; edit Markdown directly: ${existing}`); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
  const originalUrl = originalUrlFor(entry);
  // A mistyped CODE opener in one article would otherwise swallow its prose.
  const html = entry.content.$t.replace(/<cod>([^<]*)<\/code>/gi, "<code>$1</code>");
  const { document } = parseHTML(`<html><body>${html}</body></html>`);
  if (document.querySelector("iframe, object, embed, script[src]")) {
    throw new Error(`Review embedded content manually before importing: ${originalUrl}`);
  }
  const notes = [];
  const assets = new Map();
  const linkChanges = [];
  const converter = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
  // Angle brackets that were escaped in the original prose must remain text,
  // rather than becoming HTML tags when Markdown is rendered.
  const escape = converter.escape.bind(converter);
  converter.escape = text => escape(text).replace(/</g, "\\<");
  function preFor(node, code = codeText(node)) {
    const pre = document.createElement("pre");
    pre.textContent = code.replace(/\r\n/g, "\n");
    node.replaceWith(pre);
    return pre;
  }

  // These styles implement the retired syntax highlighter, not article content.
  for (const style of document.querySelectorAll("style")) style.remove();
  for (const table of document.querySelectorAll("table")) {
    const blocks = [...table.querySelectorAll("pre")];
    if (blocks.length < 2) continue;
    const code = blocks.filter(pre => !/^\s*\d+(?:\s+\d+)*\s*$/.test(pre.textContent));
    if (code.length !== 1) throw new Error(`Review multi-block code table manually: ${originalUrl}`);
    preFor(table, codeText(code[0]));
  }
  for (const node of document.querySelectorAll("span.source, div[style*='white-space: pre']")) preFor(node);
  for (const code of document.querySelectorAll("code")) {
    if (!code.closest("pre") && /<br\b|\n/i.test(code.innerHTML)) preFor(code);
  }
  for (const node of document.querySelectorAll("span, font")) {
    if (mono(node) && node.querySelector("br")) preFor(node);
  }
  // Some Blogger code uses consecutive monospace spans, one line per BR.
  // Group the lines before conversion to retain readable code and indentation.
  for (const parent of [...document.querySelectorAll("body, div, p, span, font")].reverse()) {
    for (let node = parent.firstChild; node;) {
      if (!mono(node)) { node = node.nextSibling; continue; }
      const group = [];
      let next = node;
      while (next && (mono(next) || next.nodeName === "BR"
        || (next.nodeType === 3 && !next.textContent.trim()))) {
        group.push(next);
        next = next.nextSibling;
      }
      if (group.filter(mono).length > 1) {
        const code = group.map(item => item.nodeType === 3 && /\n/.test(item.textContent) ? "" : codeText(item)).join("");
        const pre = document.createElement(group.some(item => item.nodeName === "BR") ? "pre" : "code");
        pre.textContent = code;
        node.before(pre);
        for (const item of group) item.remove();
      }
      node = next;
    }
  }
  const demos = [...document.querySelectorAll("script")];
  for (const script of demos) preFor(script, script.textContent.replace(/<br\s*\/?>/gi, "\n"));
  for (const input of document.querySelectorAll("input")) input.remove();
  if (demos.length) notes.push("The original interactive demo buttons are preserved as source examples instead of runnable demos.");

  for (const link of document.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (/^javascript:/i.test(href) || href === "https://draft.blogger.com/null") {
      link.replaceWith(document.createTextNode(link.textContent));
      notes.push("Bookmarklet source is preserved below; original draggable links are shown as text.");
      continue;
    }
    const url = new URL(href, originalUrl);
    let target;
    if (/(^|\.)elegantdevelopment\.blogspot\.com$/.test(url.hostname) && paths.has(url.pathname)) {
      target = paths.get(url.pathname) + url.hash;
    } else if (/^(www\.)?wasatchwizard\.com$/.test(url.hostname)) {
      target = url.pathname === "/" ? "/" : `https://web.archive.org/web/*/${url.href}`;
      if (url.pathname !== "/") notes.push("Links to retired Wasatch Wizard pages open the Internet Archive.");
    }
    if (target) { link.setAttribute("href", target); linkChanges.push({ originalUrl: href, newUrl: target }); }
  }

  // Resolve images before conversion so an unavailable decorative image can use
  // its alt text. Substantive image failures still stop the import for review.
  for (const image of document.querySelectorAll("img")) {
    const source = new URL(image.getAttribute("src"), originalUrl);
    const linked = image.parentNode.nodeName === "A" ? new URL(image.parentNode.getAttribute("href"), originalUrl) : null;
    const full = linked && linked.hostname === source.hostname && /\.(jpe?g|png|gif|webp)$/i.test(linked.pathname) ? linked : source;
    if (assets.has(source.href)) continue;
    const candidates = [...new Set([full.href.replace("/s1600-h/", "/s1600/"), source.href]
      .map(url => url.replace(/^http:/, "https:")))];
    let asset;
    for (const candidate of candidates) {
      try {
        const response = await fetch(candidate, { signal: AbortSignal.timeout(20000) });
        const type = response.headers.get("content-type")?.split(";")[0];
        if (!response.ok || !type?.startsWith("image/")) continue;
        const extension = ({ "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp" })[type];
        if (!extension) throw new Error(`Unsupported image type: ${type}`);
        let name = decodeURIComponent(path.basename(full.pathname)).replace(/[^a-zA-Z0-9._-]/g, "-");
        if (!/\.(jpe?g|png|gif|webp)$/i.test(name)) name = `image-${assets.size + 1}${extension}`;
        name = name.slice(-100);
        const publicPath = `/assets/blog/${slug}/${name}`;
        if ([...assets.values()].some(item => item.publicPath === publicPath)) throw new Error(`Duplicate image filename: ${name}`);
        asset = { originalSourceUrl: source.href, sourceUrl: candidate, publicPath,
          output: `src${publicPath}`, bytes: new Uint8Array(await response.arrayBuffer()) };
        break;
      } catch (error) {
        if (error.name !== "TimeoutError" && error.name !== "TypeError") throw error;
      }
    }
    if (!asset) {
      // This decorative smiley is 404 and has no Internet Archive capture.
      if (source.href !== "http://www.wasatchwizard.com/personal/blog/images/Smiley.png") {
        throw new Error(`Image download failed; review manually: ${source.href}`);
      }
      asset = { originalSourceUrl: source.href, unavailable: true, alt: image.getAttribute("alt") || "8^)" };
      notes.push("The original smiley image is unavailable; its original text alternative is preserved.");
    }
    assets.set(source.href, asset);
  }
  function imageMarkdown(image) {
    const asset = assets.get(new URL(image.getAttribute("src"), originalUrl).href);
    if (asset.unavailable) return asset.alt;
    const alt = (image.getAttribute("alt") || title).replace(/[\[\]\n]/g, " ");
    return `![${alt}](${asset.publicPath})`;
  }
  converter.addRule("localImages", { filter: "img", replacement: (_content, node) => imageMarkdown(node) });
  converter.addRule("linkedLocalImages", {
    filter: node => node.nodeName === "A" && node.querySelectorAll("img").length === 1 && !node.textContent.trim(),
    replacement: (_content, node) => {
      const image = node.querySelector("img");
      const asset = assets.get(new URL(image.getAttribute("src"), originalUrl).href);
      return asset.unavailable ? asset.alt : `[${imageMarkdown(image)}](${asset.publicPath})`;
    },
  });
  converter.addRule("fontStyledInlineCode", {
    filter: mono,
    replacement: (_content, node) => {
      // Turndown's child content is already Markdown-escaped; use the original
      // text here so underscores, slashes, and markup never enter code as escapes.
      const content = node.textContent.trim();
      const longest = Math.max(0, ...[...content.matchAll(/`+/g)].map(match => match[0].length));
      const delimiter = "`".repeat(longest + 1);
      const padding = content.startsWith("`") || content.endsWith("`") ? " " : "";
      return `${delimiter}${padding}${content}${padding}${delimiter}`;
    },
  });
  converter.addRule("staticCode", {
    filter: "pre",
    replacement: (_content, node) => fence(node.textContent, languageFor(node.textContent)),
  });
  converter.addRule("dataTables", {
    filter: "table",
    replacement: (_content, node) => {
      // Preserve spans and links, without legacy styles and layout attributes.
      // The five data tables use embedded HTML within otherwise editable Markdown.
      const table = node.cloneNode(true);
      for (const element of [table, ...table.querySelectorAll("*")]) {
        for (const attribute of [...element.attributes]) {
          const keep = (/^(TD|TH)$/.test(element.nodeName) && /^(colspan|rowspan)$/.test(attribute.name))
            || (element.nodeName === "A" && attribute.name === "href");
          if (!keep) element.removeAttribute(attribute.name);
        }
      }
      return `\n\n<div class="table-scroll" role="region" aria-label="Article table" tabindex="0">\n${table.outerHTML}\n</div>\n\n`;
    },
  });
  for (const pre of document.querySelectorAll("pre")) {
    pre.textContent = codeText(pre);
    if (!pre.textContent.trim()) pre.remove();
    // An old font wrapper can otherwise move its indentation before the fence,
    // causing Markdown to dedent the entire code block.
    while (pre.parentNode && /^(SPAN|FONT|STRONG|B)$/.test(pre.parentNode.nodeName)
      && [...pre.parentNode.childNodes].every(node => node === pre || !node.textContent.trim())) {
      pre.parentNode.replaceWith(pre);
    }
  }
  const codeBlocks = [...document.querySelectorAll("pre")].map(pre => ({
    sha256: hash(pre.textContent.replace(/\n+$/, "")), language: languageFor(pre.textContent),
  }));
  // Passing the DOM avoids a second HTML parse dropping the first newline of PRE.
  const markdown = converter.turndown(document.body);
  const summaryDocument = document.cloneNode(true);
  for (const node of summaryDocument.querySelectorAll("pre, table, img")) node.remove();
  for (const br of summaryDocument.querySelectorAll("br")) br.replaceWith(summaryDocument.createTextNode(" "));
  for (const p of summaryDocument.querySelectorAll("p")) p.append(summaryDocument.createTextNode(" "));
  const summaryText = summaryDocument.body.textContent.trim().replace(/\s+/g, " ");
  const summary = summaryText.length <= 240 ? summaryText : `${summaryText.slice(0, 237).replace(/\s+\S*$/, "")}…`;
  const frontMatter = { title, date: entry.published.$t.slice(0, 10), summary: summary || title,
    topics: (entry.category || []).map(category => category.term), originalUrl, bloggerId: entry.id.$t };
  if (notes.length) frontMatter.migrationNote = [...new Set(notes)].join(" ");
  for (const asset of assets.values()) {
    if (asset.unavailable) continue;
    try { await access(asset.output); throw new Error(`Refusing to replace an existing image: ${asset.output}`); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
  for (const asset of assets.values()) {
    if (asset.unavailable) continue;
    await mkdir(path.dirname(asset.output), { recursive: true });
    await writeFile(asset.output, asset.bytes, { flag: "wx" });
  }
  await mkdir(path.dirname(output), { recursive: true });
  // JSON values are valid YAML scalars and preserve quotes and Unicode safely.
  const metadata = Object.entries(frontMatter).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n");
  await writeFile(output, `---\n${metadata}\n---\n\n${markdown}\n`, { encoding: "utf8", flag: "wx" });
  mappings.push({ bloggerId: entry.id.$t, originalUrl, newPath: `/blog/${slug}/`, source: output,
    images: [...assets.values()].map(({ bytes, output: assetOutput, ...asset }) => asset), codeBlocks,
    ...(linkChanges.length ? { linkChanges } : {}), ...(notes.length ? { notes: [...new Set(notes)] } : {}) });
  // Preserve progress if another post needs manual conversion or its image is unavailable.
  await writeFile(mapPath, `${JSON.stringify(mappings, null, 2)}\n`, "utf8");
  console.log(`Imported ${title} -> /blog/${slug}/ (${assets.size} images)`);
}
console.log(`Archive migration: ${mappings.length}/${archive.postCount} posts mapped.`);
