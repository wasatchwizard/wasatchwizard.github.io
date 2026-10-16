import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  // Code samples are content, not Liquid templates. Leave their braces alone.
  eleventyConfig.setTemplateFormats(["njk", "md"]);
  eleventyConfig.ignores.add("src/assets/**");
  eleventyConfig.addCollection("posts", api => api.getFilteredByGlob("./src/posts/*.md")
    .filter(post => !post.data.draft)
    .sort((a, b) => b.date - a.date));
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
