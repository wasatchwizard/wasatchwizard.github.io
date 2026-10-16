import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import { parseHTML } from "linkedom";

const archive = JSON.parse(await readFile("content-export/blogger.json", "utf8"));
const sourceUrls = process.argv.slice(2);
if (!sourceUrls.length) throw new Error("Pass one or more original Blogger post URLs");
const mapPath = "content-export/import-map.json";
let mappings = [];
try { mappings = JSON.parse(await readFile(mapPath, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }

for (const sourceUrl of sourceUrls) {
  const originalPath = new URL(sourceUrl).pathname;
  const entry = archive.posts.find(post => post.link.some(link =>
    link.rel === "alternate" && new URL(link.href).pathname === originalPath));
  if (!entry) throw new Error(`Post not found in export: ${sourceUrl}`);
  const title = entry.title.$t;
  const slug = title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) throw new Error(`Cannot generate a descriptive slug: ${title}`);
  const output = `src/posts/${slug}.md`;
  try { await access(output); throw new Error(`Already exists; edit Markdown directly: ${output}`); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  const originalUrl = entry.link.find(link => link.rel === "alternate").href;
  const { document } = parseHTML(`<html><body>${entry.content.$t}</body></html>`);
  if (document.querySelector("iframe, script, object, embed")
    || [...document.querySelectorAll("table")].some(table => table.querySelectorAll("pre").length < 2)) {
    throw new Error(`Review embedded content or data tables manually before importing: ${originalUrl}`);
  }
  const assets = new Map();
  const converter = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });

  function imageAsset(image) {
    const source = image.getAttribute("src");
    const parent = image.parentNode;
    const fullSize = parent.nodeName === "A" ? parent.getAttribute("href") : null;
    // Blogger usually wraps thumbnails in a link to the original image.
    const sourceImage = new URL(source, originalUrl);
    const linkedImage = fullSize ? new URL(fullSize, originalUrl) : null;
    const download = linkedImage && linkedImage.hostname === sourceImage.hostname
      && /\.(jpe?g|png|gif|webp)$/i.test(linkedImage.pathname) ? linkedImage : sourceImage;
    if (!assets.has(download.href)) {
      const name = decodeURIComponent(path.basename(download.pathname)).replace(/[^a-zA-Z0-9._-]/g, "-");
      const publicPath = `/assets/blog/${slug}/${name}`;
      if ([...assets.values()].some(asset => asset.publicPath === publicPath)) {
        throw new Error(`Different images share a filename; review them manually: ${originalUrl}`);
      }
      assets.set(download.href, { sourceUrl: download.href, publicPath, output: `src${publicPath}` });
    }
    const asset = assets.get(download.href);
    const alt = (image.getAttribute("alt") || title).replace(/[\[\]\n]/g, " ");
    return { ...asset, markdown: `![${alt}](${asset.publicPath})` };
  }
  converter.addRule("localImages", {
    filter: "img",
    replacement: (_content, node) => imageAsset(node).markdown,
  });
  converter.addRule("linkedLocalImages", {
    filter: node => node.nodeName === "A" && node.querySelector("img") && !node.textContent.trim(),
    replacement: (_content, node) => {
      const asset = imageAsset(node.querySelector("img"));
      return `[${asset.markdown}](${asset.publicPath})`;
    },
  });
  converter.addRule("fontStyledInlineCode", {
    filter: node => node.nodeName === "SPAN" && /Consolas|monospace/i.test(node.getAttribute("style") || ""),
    replacement: content => `\`${content}\``,
  });
  converter.addRule("legacyCodeTable", {
    filter: node => node.nodeName === "TABLE" && node.querySelectorAll("pre").length > 1,
    replacement: (_content, node) => {
      const blocks = Array.from(node.querySelectorAll("pre")).filter(pre => !/^\s*\d+(?:\s+\d+)*\s*$/.test(pre.textContent));
      if (blocks.length !== 1) throw new Error(`Review multi-block code table manually: ${originalUrl}`);
      // Extract text, not styled HTML, preserving the original comments and indentation.
      const code = blocks[0].textContent.replace(/\r\n/g, "\n").replace(/\n$/, "");
      const language = /\bPrivate Sub\b|\bEnd Sub\b/.test(code) ? "vbnet" : "text";
      return `\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    },
  });
  const markdown = converter.turndown(entry.content.$t);
  const summary = document.querySelector("p")?.textContent.trim().replace(/\s+/g, " ") || title;
  const topics = (entry.category || []).map(category => category.term);
  const frontMatter = {
    title,
    date: entry.published.$t.slice(0, 10),
    summary,
    topics,
    originalUrl,
    bloggerId: entry.id.$t,
  };
  for (const asset of assets.values()) {
    try { await access(asset.output); throw new Error(`Refusing to replace an existing image: ${asset.output}`); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    const response = await fetch(asset.sourceUrl, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
      throw new Error(`Image download failed: ${asset.sourceUrl} (HTTP ${response.status})`);
    }
    await mkdir(path.dirname(asset.output), { recursive: true });
    await writeFile(asset.output, new Uint8Array(await response.arrayBuffer()));
  }
  await mkdir(path.dirname(output), { recursive: true });
  // JSON values are valid YAML scalars and preserve quotes and Unicode safely.
  const metadata = Object.entries(frontMatter).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n");
  await writeFile(output, `---\n${metadata}\n---\n\n${markdown}\n`, "utf8");
  mappings = mappings.filter(item => item.bloggerId !== entry.id.$t);
  mappings.push({ bloggerId: entry.id.$t, originalUrl, newPath: `/blog/${slug}/`, source: output,
    images: [...assets.values()].map(({ sourceUrl, publicPath }) => ({ sourceUrl, publicPath })) });
  // Preserve progress if another post needs manual conversion or its image is unavailable.
  await writeFile(mapPath, `${JSON.stringify(mappings, null, 2)}\n`, "utf8");
  console.log(`Imported ${title} -> /blog/${slug}/ (${assets.size} local images)`);
}
