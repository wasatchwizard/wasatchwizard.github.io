import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

function publishedPosts(api) {
  return api.getFilteredByGlob("./src/posts/*.md")
    .filter(post => !post.data.draft)
    .sort((a, b) => b.date - a.date);
}

function projectTimestamp(project) {
  if (!project.data.github?.pushedAt) return 0;
  const timestamp = Date.parse(project.data.github.pushedAt);
  if (!Number.isFinite(timestamp)) throw new Error(`Invalid github.pushedAt in ${project.inputPath}`);
  return timestamp;
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, { errorOnInvalidLanguage: true });
  eleventyConfig.amendLibrary("md", markdown => {
    const highlight = markdown.options.highlight;
    // The plugin's explicit `text` branch returns unescaped HTML. Let Markdown
    // escape plain-text fences, including XML examples and <file> placeholders.
    markdown.set({ highlight: (code, language) => language === "text" ? "" : highlight(code, language) });
  });
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  // Code samples are content, not Liquid templates. Leave their braces alone.
  eleventyConfig.setTemplateFormats(["njk", "md"]);
  eleventyConfig.ignores.add("src/assets/**");
  eleventyConfig.addCollection("posts", publishedPosts);
  eleventyConfig.addCollection("pinnedPosts", api => publishedPosts(api)
    .filter(post => post.data.pinned));
  // Pinned articles already appear above this list on the home page.
  eleventyConfig.addCollection("recentPosts", api => publishedPosts(api)
    .filter(post => !post.data.pinned).slice(0, 3));
  eleventyConfig.addCollection("projects", api => api.getFilteredByGlob("./src/projects/*.md")
    .filter(project => !project.data.draft && !project.data.hidden)
    .sort((a, b) => {
      // Undated projects follow dated ones; filenames break equal-date ties predictably.
      return projectTimestamp(b) - projectTimestamp(a) || a.fileSlug.localeCompare(b.fileSlug, "en");
    }));
  eleventyConfig.addFilter("readableDate", value => new Intl.DateTimeFormat("en-US", {
    dateStyle: "long", timeZone: "UTC",
  }).format(new Date(value)));
  eleventyConfig.addFilter("isoDate", value => new Date(value).toISOString().slice(0, 10));
  eleventyConfig.addFilter("rssDate", value => new Date(value).toUTCString());
  // Version asset requests by their contents so new markup does not reuse stale browser CSS.
  // Read during rendering rather than config initialization so watch rebuilds see CSS edits.
  eleventyConfig.addFilter("assetVersion", asset => {
    const bytes = readFileSync(new URL(`./src${asset}`, import.meta.url));
    const version = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    return `${asset}?v=${version}`;
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Publish only active assets; source files and the complete export stay out of the site output.
  for (const asset of ["img/header.png",
    "img/apple-touch-icon.png", "favicon.ico", "favicon.png", "CNAME"]) {
    eleventyConfig.addPassthroughCopy(asset);
  }
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
