import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { parseHTML, DOMParser } from "linkedom";

const output = path.resolve("_site");
const archive = JSON.parse(await readFile("content-export/blogger.json", "utf8"));
const mappings = JSON.parse(await readFile("content-export/import-map.json", "utf8"));
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
  const pagePath = `/${path.relative(output, file).replaceAll(path.sep, "/")}`;
  for (const element of document.querySelectorAll("[href], [src]")) {
    const reference = element.getAttribute("href") || element.getAttribute("src");
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

for (const mapping of mappings) {
  assert.match(mapping.newPath, /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/);
  const original = archive.posts.find(post => post.id.$t === mapping.bloggerId);
  assert.ok(original, mapping.originalUrl);
  const source = await readFile(mapping.source, "utf8");
  assert.ok(source.includes(`date: "${original.published.$t.slice(0, 10)}"`));
  const built = documents.get(path.join(output, mapping.newPath, "index.html"));
  assert.ok(built, mapping.newPath);
  assert.equal(built.querySelector("h1").textContent, original.title.$t);
  const originalDocument = parseHTML(`<html><body>${original.content.$t}</body></html>`).document;
  const codeBlocks = [...originalDocument.querySelectorAll("pre")]
    .filter(pre => !/^\s*\d+(?:\s+\d+)*\s*$/.test(pre.textContent));
  if (codeBlocks.length) {
    const rendered = [...built.querySelectorAll("pre code")];
    assert.equal(rendered.length, codeBlocks.length);
    codeBlocks.forEach((block, index) => {
      assert.equal(rendered[index].textContent.replace(/\n$/, ""), block.textContent.replace(/\n$/, ""),
        "Imported code must preserve comments, whitespace, and text exactly");
    });
    assert.ok(built.querySelector("pre code .token.keyword"), "Code highlighting is generated at build time");
  }
  assert.equal(built.querySelectorAll("article img").length, originalDocument.querySelectorAll("img").length);
  for (const image of built.querySelectorAll("article img")) {
    assert.ok(image.getAttribute("src").startsWith("/assets/blog/"));
    assert.ok(image.getAttribute("alt"));
  }
}
for (const name of ["feed.xml", "sitemap.xml"]) {
  const xml = await readFile(path.join(output, name), "utf8");
  assert.ok(!/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i.test(xml), "XML entities must be escaped");
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  assert.ok(doc.documentElement);
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
console.log(`Imported ${mappings.length} posts: original dates, local images, and exact code text preserved.`);
