export default {
  layout: "project.njk",
  section: "projects",
  // Keep URLs tied to local filenames, even when a repository or title changes.
  permalink: data => data.draft || data.hidden ? false : `/projects/${data.page.fileSlug}/`,
  eleventyComputed: {
    projectSummary: data => data.summary || data.github?.description || "",
  },
};
