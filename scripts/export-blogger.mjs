import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const blogUrl = "https://elegantdevelopment.blogspot.com";
const output = path.resolve(process.argv[2] || "content-export/blogger.json");

// Read every page and verify the advertised total before replacing an archive.
// Blogger's public feeds cannot expose drafts or private posts.
async function readFeed(kind) {
  const entries = [];
  const ids = new Set();
  let metadata;
  let total;
  do {
    const url = new URL(`/feeds/${kind}/default`, blogUrl);
    url.searchParams.set("alt", "json");
    url.searchParams.set("max-results", "150");
    url.searchParams.set("start-index", String(entries.length + 1));
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${kind}: HTTP ${response.status}`);
    const { feed } = await response.json();
    const { entry = [], ...pageMetadata } = feed;
    metadata ??= pageMetadata;
    const pageTotal = Number(feed.openSearch$totalResults?.$t);
    if (!Number.isSafeInteger(pageTotal) || pageTotal < 0) {
      throw new Error(`${kind}: missing or invalid feed total`);
    }
    total ??= pageTotal;
    if (pageTotal !== total) throw new Error(`${kind}: feed changed during export; retry`);
    if (!entry.length && entries.length < total) throw new Error(`${kind}: incomplete feed`);
    for (const item of entry) {
      const id = item.id?.$t;
      if (!id || ids.has(id)) throw new Error(`${kind}: missing or duplicate entry ID`);
      ids.add(id);
      entries.push(item);
    }
  } while (entries.length < total);
  if (entries.length !== total) throw new Error(`${kind}: entry count does not match feed total`);
  return { metadata, entries };
}

const posts = await readFeed("posts");
if (!posts.entries.length) throw new Error("Refusing to replace an archive with no posts");
let comments;
try {
  const feed = await readFeed("comments");
  comments = { status: "exported", count: feed.entries.length, ...feed };
} catch (error) {
  // Keep the distinction between an unavailable comments feed and zero comments.
  comments = { status: "unavailable", reason: error.message };
}
const archive = {
  schemaVersion: 1,
  blogUrl,
  exportedAt: new Date().toISOString(),
  scope: "Public published posts and available public comments. Images remain referenced by URL. Drafts and private content are not included.",
  postCount: posts.entries.length,
  feedMetadata: posts.metadata,
  posts: posts.entries,
  comments,
};
await mkdir(path.dirname(output), { recursive: true });
const temporary = `${output}.tmp`;
await writeFile(temporary, `${JSON.stringify(archive, null, 2)}\n`, "utf8");
await rename(temporary, output);
console.log(`Exported ${archive.postCount} complete post entries to ${output}`);
console.log(comments.status === "exported"
  ? `Exported ${comments.count} public comments`
  : `Public comments unavailable: ${comments.reason}`);
