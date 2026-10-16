export default {
  layout: "post.njk",
  section: "blog",
  isPost: true,
  // Filenames are stable, descriptive slugs; changing a title does not change its URL.
  permalink: data => data.draft ? false : `/blog/${data.page.fileSlug}/`,
};
