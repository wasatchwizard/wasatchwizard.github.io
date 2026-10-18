import assert from "node:assert/strict";
import test from "node:test";
import { parseHTML } from "linkedom";
import { createProjectReadmeRenderer } from "./project-readme.mjs";

const github = {
  readmeUrl: "https://github.com/example/tool/blob/main/docs/README.md",
  readmeDownloadUrl: "https://raw.githubusercontent.com/example/tool/main/docs/README.md",
};
const render = createProjectReadmeRenderer(() => "");
const documentFor = source => parseHTML(`<main>${render(source, github)}</main>`).document;

test("README-relative links, images and GitHub-style heading anchors resolve", () => {
  const document = documentFor(`
[Guide](../guide.md) ![Preview](images/preview.png)
[Section](#café) [Removed title](#tool)

## Café
## Café
# Later heading
`);
  assert.equal(document.querySelector("a").href, "https://github.com/example/tool/blob/main/guide.md");
  assert.equal(document.querySelector("img").src, "https://raw.githubusercontent.com/example/tool/main/docs/images/preview.png");
  assert.deepEqual([...document.querySelectorAll("h2")].map(heading => heading.id), ["café", "café-1", "later-heading"]);
  assert.equal(decodeURIComponent(document.querySelectorAll("a")[1].getAttribute("href")), "#café");
  assert.equal(document.querySelectorAll("a")[2].href, `${github.readmeUrl}#tool`);
  assert.equal(document.querySelectorAll("h1").length, 0);
});

test("README code, details and images remain static, with executable HTML stripped", () => {
  const document = documentFor(`
<details open><summary>More</summary><kbd>Ctrl</kbd></details>
<script>alert(1)</script><iframe src="https://example.com"></iframe>
<img src="image.png" onerror="alert(1)" style="display:none" alt="Image">
<a href="javascript:alert(1)">Unsafe</a>

    indented <sample>

~~~text
<script>code sample</script>
~~~
`);
  assert.equal(document.querySelector("details summary").textContent, "More");
  assert.equal(document.querySelector("kbd").textContent, "Ctrl");
  assert.equal(document.querySelectorAll("script, iframe, [onerror], [style], a[href]").length, 0);
  assert.equal(document.querySelectorAll("pre").length, 2);
  assert.match(document.querySelectorAll("pre")[1].textContent, /<script>code sample<\/script>/);
});

test("unknown fence languages fall back to escaped code without hiding other errors", () => {
  const unknown = createProjectReadmeRenderer(() => { throw new Error("custom is not a valid Prism.js language"); });
  assert.match(unknown("```custom\n<example>\n```", github), /&lt;example&gt;/);
  const broken = createProjectReadmeRenderer(() => { throw new Error("unexpected failure"); });
  assert.throws(() => broken("```js\nexample\n```", github), /unexpected failure/);
});

test("wide README tables get the shared keyboard-accessible scrolling container", () => {
  const document = documentFor("| Column | Other |\n| --- | --- |\n| Value | Other value |\n");
  const wrapper = document.querySelector(".table-scroll");
  assert.equal(wrapper.getAttribute("tabindex"), "0");
  assert.equal(wrapper.getAttribute("role"), "region");
  assert.equal(wrapper.querySelector("td").textContent, "Value");
});
