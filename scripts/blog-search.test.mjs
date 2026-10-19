import assert from "node:assert/strict";
import test from "node:test";
import { parseHTML } from "linkedom";
import { findPosts, highlightText, initBlogSearch, searchTerms } from "../src/assets/blog-search.js";

const tick = () => new Promise(resolve => setImmediate(resolve));
const entry = (title, index = 0, summary = "Example description") => ({
  title, summary, date: "2026-10-19", url: `/blog/post-${index}/`,
});

function fixture(fetch, href = "https://example.com/blog/page/2/") {
  const { document, window } = parseHTML(`<div data-blog-archive data-search-index="/blog/search-index.json">
    <form hidden><input name="q"><button type="reset">Clear</button></form>
    <p id="blog-search-status" hidden></p>
    <div id="blog-results"><ol class="post-list">${Array.from({length: 25}, (_, i) => `<li>Static entry ${i}</li>`).join("")}</ol></div>
    <nav class="archive-pagination">Static Older/Newer links</nav>
  </div>`);
  const listeners = new Map();
  const browser = { location: { href }, fetch, addEventListener: (name, listener) => listeners.set(name, listener) };
  browser.history = Object.fromEntries(["pushState", "replaceState"].map(name => [name, (_state, _title, url) => { browser.location.href = url; }]));
  const archive = document.querySelector("[data-blog-archive]");
  const input = archive.querySelector("input");
  const form = archive.querySelector("form");
  const submit = async query => {
    input.value = query;
    form.dispatchEvent(new window.Event("submit", { cancelable: true }));
    await tick();
  };
  const reset = async () => {
    form.dispatchEvent(new window.Event("reset", { cancelable: true }));
    await tick();
  };
  return { archive, document, input, form, browser, listeners, submit, reset };
}

test("search is literal and case-insensitive, requiring every word across title and description", () => {
  const posts = [entry("C# and .NET", 1, "Windows tools"), entry("C++", 2, "Linux tools"), entry("Café [notes]", 3)];
  assert.deepEqual(findPosts(posts, searchTerms("c# .net WINDOWS")), [posts[0]]);
  assert.deepEqual(findPosts(posts, searchTerms("C++")), [posts[1]]);
  assert.deepEqual(findPosts(posts, searchTerms("CAFÉ [notes]")), [posts[2]]);
  assert.deepEqual(findPosts(posts, searchTerms(".*")), []);
  const large = Array.from({ length: 10000 }, (_, i) => entry(i % 100 === 0 ? "Rare match" : "Unrelated", i));
  assert.equal(findPosts(large, searchTerms("rare match")).length, 100);
});

test("highlighting preserves text/case and never interprets HTML or regex input", () => {
  const { document } = parseHTML("<div></div>");
  const element = document.querySelector("div");
  const text = 'C++ and .NET; <script>alert("X")</script> & Café CAFÉ';
  highlightText(element, text, searchTerms("c++ .net <script> café"));
  assert.equal(element.textContent, text);
  assert.deepEqual([...element.querySelectorAll("mark")].map(mark => mark.textContent), ["C++", ".NET", "<script>", "Café", "CAFÉ"]);
  assert.equal(element.querySelectorAll("script, img, [onclick]").length, 0);
});

test("index is lazy/cached; all matches render without paging; clear restores original 25 and URL", async () => {
  let requests = 0;
  const posts = [...Array.from({ length: 42 }, (_, i) => entry(`Rust ${i}`, i, "Rust examples")), entry("Other", 99)];
  const view = fixture(async () => { requests++; return { ok: true, json: async () => posts }; });
  await initBlogSearch(view.archive, view.browser);
  assert.equal(requests, 0);
  assert.equal(view.form.hidden, false);
  const original = view.document.querySelector("#blog-results ol");
  await view.submit("Rust");
  assert.equal(requests, 1);
  assert.equal(view.document.querySelectorAll(".post-list li").length, 42);
  assert.equal(view.document.querySelectorAll("mark").length, 84);
  assert.equal(view.document.querySelector(".archive-pagination").hidden, true);
  assert.match(view.browser.location.href, /\/blog\/page\/2\/\?q=Rust$/);
  await view.submit("No matches");
  assert.equal(requests, 1);
  assert.equal(view.document.querySelectorAll(".post-list li").length, 0);
  assert.match(view.document.querySelector("#blog-search-status").textContent, /No posts match/);
  await view.reset();
  assert.equal(view.document.querySelector("#blog-results ol"), original);
  assert.equal(view.document.querySelectorAll(".post-list li").length, 25);
  assert.equal(view.document.querySelector(".archive-pagination").hidden, false);
  assert.equal(view.browser.location.href, "https://example.com/blog/page/2/");
});

test("shared queries and Back/Forward restore search or the originating static page", async () => {
  let requests = 0;
  const view = fixture(async () => { requests++; return { ok: true, json: async () => [entry("Rust")] }; }, "https://example.com/blog/?q=Rust");
  await initBlogSearch(view.archive, view.browser);
  assert.equal(view.input.value, "Rust");
  assert.equal(view.document.querySelectorAll(".post-list li").length, 1);
  view.browser.location.href = "https://example.com/blog/";
  view.listeners.get("popstate")();
  await tick();
  assert.equal(view.input.value, "");
  assert.equal(view.document.querySelectorAll(".post-list li").length, 25);
  view.browser.location.href = "https://example.com/blog/?q=Rust";
  view.listeners.get("popstate")();
  await tick();
  assert.equal(view.document.querySelectorAll(".post-list li").length, 1);
  assert.equal(requests, 1);
});

test("clearing during an outstanding download prevents stale results from replacing the archive", async () => {
  let finish;
  const view = fixture(() => new Promise(resolve => { finish = resolve; }));
  await initBlogSearch(view.archive, view.browser);
  await view.submit("Rust");
  await view.reset();
  finish({ ok: true, json: async () => [entry("Rust")] });
  await tick();
  assert.equal(view.document.querySelectorAll(".post-list li").length, 25);
  assert.equal(view.document.querySelector(".archive-pagination").hidden, false);
  assert.equal(view.document.querySelector("#blog-results").hasAttribute("aria-busy"), false);
});

test("failed downloads preserve static browsing and can be retried", async () => {
  let requests = 0;
  const view = fixture(async () => { requests++; return { ok: requests > 1, json: async () => [entry("Rust")] }; });
  await initBlogSearch(view.archive, view.browser);
  await view.submit("Rust");
  assert.equal(view.document.querySelectorAll(".post-list li").length, 25);
  assert.equal(view.document.querySelector(".archive-pagination").hidden, false);
  assert.match(view.document.querySelector("#blog-search-status").textContent, /unavailable/);
  await view.submit("Rust");
  assert.equal(requests, 2);
  assert.equal(view.document.querySelectorAll(".post-list li").length, 1);
});
