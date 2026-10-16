import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

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
  eleventyConfig.addPlugin(syntaxHighlight);
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
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Publish only active assets; source files and the complete export stay out of the site output.
  for (const asset of ["img/header.png", "img/octo.png", "img/stackoverflow_white.png",
    "img/apple-touch-icon.png", "favicon.ico", "favicon.png", "CNAME"]) {
    eleventyConfig.addPassthroughCopy(asset);
  }
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
