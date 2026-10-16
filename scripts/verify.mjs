import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { parseHTML, DOMParser } from "linkedom";

const output = path.resolve("_site");
// Exact archive parity is a migration audit, not a permanent ban on editing posts.
const auditMigration = process.argv.includes("--migration");
const archive = JSON.parse(await readFile("content-export/blogger.json", "utf8"));
const mappings = JSON.parse(await readFile("content-export/import-map.json", "utf8"));
assert.equal(mappings.length, archive.postCount, "The entire published Blogger archive must be mapped");
assert.equal(new Set(mappings.map(item => item.bloggerId)).size, mappings.length);
assert.equal(new Set(mappings.map(item => item.newPath)).size, mappings.length);
assert.equal(archive.postCount, archive.posts.length);
assert.equal(Number(archive.feedMetadata.openSearch$totalResults.$t), archive.postCount);
assert.equal(new Set(archive.posts.map(post => post.id.$t)).size, archive.postCount);
for (const post of archive.posts) {
  assert.equal(post.content.type, "html");
  assert.equal(typeof post.content.$t, "string");
}
if (archive.comments.status === "exported") {
  assert.equal(archive.comments.count, archive.comments.entries.length);
  assert.equal(Number(archive.comments.metadata.openSearch$totalResults.$t), archive.comments.count);
}
const documents = new Map();
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) {
      documents.set(full, parseHTML(await readFile(full, "utf8")).document);
    }
  }
}
await walk(output);
for (const [file, document] of documents) {
  assert.equal(document.querySelectorAll("h1").length, 1, file);
  assert.equal(document.querySelectorAll("script").length, 0, file);
  assert.equal(document.querySelectorAll("iframe, object, embed, input, [onclick]").length, 0, file);
  const navigation = [...document.querySelectorAll('.page-nav a')];
  assert.deepEqual(navigation.map(link => [link.textContent, link.getAttribute("href")]),
    [["Home", "/"], ["Blog", "/blog/"], ["Projects", "/projects/"]], file);
  const relativeFile = path.relative(output, file).replaceAll(path.sep, "/");
  if (relativeFile !== "404.html") {
    const section = relativeFile.startsWith("projects/") ? "/projects/"
      : relativeFile.startsWith("blog/") ? "/blog/" : "/";
    assert.deepEqual(navigation.filter(link => link.hasAttribute("aria-current"))
      .map(link => link.getAttribute("href")), [section], file);
  }
  const pagePath = `/${path.relative(output, file).replaceAll(path.sep, "/")}`;
  for (const element of document.querySelectorAll("[href], [src]")) {
    const reference = element.getAttribute("href") || element.getAttribute("src");
    assert.ok(!/^javascript:/i.test(reference), "Historical scripts must be displayed as code, not executed");
    const url = new URL(reference, `https://www.wasatchwizard.com${pagePath}`);
    if (url.origin !== "https://www.wasatchwizard.com") continue;
    let target = path.resolve(output, `.${decodeURIComponent(url.pathname)}`);
    assert.ok(target.startsWith(`${output}${path.sep}`) || target === output);
    if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    assert.ok((await stat(target)).isFile(), `${file}: ${reference}`);
    if (url.hash && target.endsWith(".html")) {
      assert.ok(documents.get(target).getElementById(decodeURIComponent(url.hash.slice(1))), reference);
    }
  }
}

const home = documents.get(path.join(output, "index.html"));
const blog = documents.get(path.join(output, "blog", "index.html"));
const projectIndex = documents.get(path.join(output, "projects", "index.html"));
assert.ok(home && blog && projectIndex, "All three tab destinations must exist");
const postLinks = element => [...element.querySelectorAll(".post-list h2 a, .post-list h3 a")]
  .map(link => link.getAttribute("href"));
const blogLinks = postLinks(blog);
for (const mapping of mappings) assert.ok(blogLinks.includes(mapping.newPath), `Missing from Blog: ${mapping.newPath}`);
const homeLinks = postLinks(home);
assert.equal(new Set(homeLinks).size, homeLinks.length, "Home must not repeat pinned posts in Recent posts");
for (const link of homeLinks) assert.ok(blogLinks.includes(link), "Home posts must also appear in Blog");
const recentSection = home.querySelector("#recent-heading").parentElement;
assert.ok(postLinks(recentSection).length <= 3, "Home shows at most three recent unpinned posts");
const dates = [...blog.querySelectorAll(".post-list time")].map(time => time.getAttribute("datetime"));
assert.deepEqual(dates, [...dates].sort().reverse(), "Blog remains chronological regardless of pinning");

const listedProjects = [...projectIndex.querySelectorAll(".project-list > li")];
const projectPages = [...documents.keys()].filter(file => file.startsWith(path.join(output, "projects") + path.sep)
  && file !== path.join(output, "projects", "index.html"));
assert.equal(listedProjects.length, projectPages.length, "Every published project must appear in the index");
const projectDates = listedProjects.map(item => {
  const date = item.querySelector("time")?.getAttribute("datetime");
  const timestamp = date ? Date.parse(date) : 0;
  assert.ok(Number.isFinite(timestamp), "Project dates must be valid");
  return timestamp;
});
assert.deepEqual(projectDates, [...projectDates].sort((a, b) => b - a), "Projects show newest code pushes first");
const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
assert.ok(sitemap.includes("https://www.wasatchwizard.com/projects/"));
for (const item of listedProjects) {
  const link = item.querySelector("h2 a");
  const projectPath = link.getAttribute("href");
  // Project filenames follow GitHub repository names, including case, dots, and underscores.
  assert.match(projectPath, /^\/projects\/(?!\.{1,2}\/)[A-Za-z0-9._-]+\/$/);
  const project = documents.get(path.join(output, projectPath, "index.html"));
  assert.equal(project.querySelector("h1").textContent, link.textContent);
  assert.ok(sitemap.includes(`https://www.wasatchwizard.com${projectPath}`));
  assert.ok(project.querySelector('a[href="/projects/"]'), "Projects have a return link");
  assert.ok(project.querySelector('article header a[href^="https://github.com/"]'), "Projects link to source code");
}

for (const mapping of mappings) {
  assert.match(mapping.newPath, /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/);
  const original = archive.posts.find(post => post.id.$t === mapping.bloggerId);
  assert.ok(original, mapping.originalUrl);
  const source = await readFile(mapping.source, "utf8");
  const built = documents.get(path.join(output, mapping.newPath, "index.html"));
  assert.ok(built, mapping.newPath);
  if (!auditMigration) continue;
  assert.ok(source.includes(`date: "${original.published.$t.slice(0, 10)}"`));
  const originalTitle = parseHTML(`<span>${original.title.$t.replaceAll("<", "&lt;")}</span>`)
    .document.querySelector("span").textContent;
  assert.equal(built.querySelector("h1").textContent, originalTitle);
  const originalDocument = parseHTML(`<html><body>${original.content.$t}</body></html>`).document;
  const codeBlocks = [...originalDocument.querySelectorAll("pre")]
    .filter(pre => !/^\s*\d+(?:\s+\d+)*\s*$/.test(pre.textContent));
  if (codeBlocks.length) {
    const rendered = [...built.querySelectorAll("pre code")];
    codeBlocks.forEach(block => {
      const copy = block.cloneNode(true);
      for (const br of copy.querySelectorAll("br")) br.replaceWith(originalDocument.createTextNode("\n"));
      const expected = copy.textContent.replace(/\u00a0/g, " ").replace(/\n+$/, "");
      assert.ok(rendered.some(code => code.textContent.replace(/\n+$/, "") === expected),
        `Original code, line breaks, comments, and indentation must survive: ${mapping.newPath}`);
    });
  }
  if (mapping.codeBlocks) {
    const rendered = [...built.querySelectorAll("pre code")];
    assert.deepEqual(rendered.map(code => createHash("sha256").update(code.textContent.replace(/\n+$/, "")).digest("hex")),
      mapping.codeBlocks.map(code => code.sha256), `Every converted code block must retain its exact text: ${mapping.newPath}`);
  }
  const unavailable = mapping.images.filter(image => image.unavailable);
  assert.equal(built.querySelectorAll("article img").length,
    originalDocument.querySelectorAll("img").length - unavailable.length);
  for (const image of built.querySelectorAll("article img")) {
    assert.ok(image.getAttribute("src").startsWith("/assets/blog/"));
    assert.ok(image.getAttribute("alt"));
  }
  for (const image of unavailable) {
    assert.equal(image.originalSourceUrl, "http://www.wasatchwizard.com/personal/blog/images/Smiley.png");
    assert.ok(built.querySelector("article").textContent.includes(image.alt));
    const originalImage = [...originalDocument.querySelectorAll("img")]
      .find(element => element.getAttribute("src") === image.originalSourceUrl);
    originalImage.replaceWith(originalDocument.createTextNode(image.alt));
  }
  const originalTables = [...originalDocument.querySelectorAll("table")].filter(table => !table.querySelector("pre"));
  const builtTables = [...built.querySelectorAll("article table")];
  const cells = table => [...table.querySelectorAll("td, th")].map(cell => [
    cell.textContent.replace(/\s+/g, " ").trim(), cell.getAttribute("colspan"), cell.getAttribute("rowspan"),
  ]);
  assert.deepEqual(builtTables.map(cells), originalTables.map(cells), `Preserve data-table cells and spans: ${mapping.newPath}`);
  // Compare the complete visible text independently of the Markdown converter.
  // Ignore layout whitespace, retired line numbers, and the explicit migration note.
  for (const style of originalDocument.querySelectorAll("style")) style.remove();
  for (const script of originalDocument.querySelectorAll("script")) {
    script.textContent = script.textContent.replace(/<br\s*\/?>/gi, "\n");
  }
  for (const pre of originalDocument.querySelectorAll("pre")) {
    if (/^\s*\d+(?:\s+\d+)*\s*$/.test(pre.textContent)) pre.remove();
  }
  const article = built.querySelector("article").cloneNode(true);
  for (const node of article.querySelectorAll("header, .post-back, .migration-note")) node.remove();
  assert.equal(article.textContent.replace(/\s/g, ""), originalDocument.body.textContent.replace(/\s/g, ""),
    `All original prose and code must survive conversion: ${mapping.newPath}`);
  assert.ok(sitemap.includes(`https://www.wasatchwizard.com${mapping.newPath}`));
}
for (const name of ["feed.xml", "sitemap.xml"]) {
  const xml = await readFile(path.join(output, name), "utf8");
  assert.ok(!/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i.test(xml), "XML entities must be escaped");
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  assert.ok(doc.documentElement);
  if (name === "feed.xml") assert.equal(doc.querySelectorAll("item").length, blogLinks.length);
}
const css = await readFile("src/assets/site.css", "utf8");
assert.ok(!/@import|https?:\/\//.test(css), "Styles and fonts must load locally");
assert.ok(css.includes("#3f6689"));
for (const match of css.matchAll(/url\("([^"\)]+)"\)/g)) {
  assert.ok((await stat(path.resolve(output, "assets", match[1]))).isFile());
}
for (const privatePath of ["content-export", "scripts", "node_modules", "package.json", "scss", "js"]) {
  await assert.rejects(stat(path.join(output, privatePath)), { code: "ENOENT" });
}
console.log(`Verified ${documents.size} static pages, local links/assets, descriptive URLs, RSS/sitemap, and no browser scripts.`);
console.log(`Archive: ${archive.postCount} posts; public comments: ${archive.comments.count ?? archive.comments.status}.`);
console.log(`Mapped ${mappings.length} imported posts to published pages.`);
if (auditMigration) console.log("Migration audit: original dates, titles, prose, tables, images, and code text verified against the archive.");
console.log(`Navigation, pinned/recent post lists, and ${listedProjects.length} project pages verified.`);
