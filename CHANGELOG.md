# Changelog

## 2026-10-16

- Migrated the remaining 122 Blogger entries, bringing the published archive
  to all 124 posts from 2005–2016 with descriptive URLs and original dates.
  Preserved prose and code, restored HTML code line breaks, retained five data
  tables, and downloaded all 11 available original images. The unavailable
  decorative smiley keeps its original text alternative.
- Converted legacy interactive examples to readable static code, linked related
  posts locally, and routed four retired Wasatch Wizard links to archive lookups.
  Added resumable, non-overwriting bulk import and explicit provenance notes.
- Fixed plain-text code escaping so XML and angle-bracket placeholders render
  as text. Added a separate full migration audit to preserve future Markdown
  editing, and verified all 124 articles against the original archive.
- Verified 66 rendered code blocks, all article links and assets, RSS/sitemap
  coverage, repeat-import preservation, overwrite refusal, and later-edit
  behavior. Reviewed desktop/mobile output, local screenshots, and keyboard
  scrolling of wide tables without page overflow.
- Added Home / Blog / Projects navigation, Markdown-controlled pinned home
  posts, and up to three recent unpinned posts. Kept the complete blog archive
  chronological and pinned the Raspberry Pi article as the initial example.
- Added a static project index and individual Markdown project pages, ordered
  by latest code push. Seeded dotask, FixEOL, and gostatic manually; documented
  the separate GitHub metadata block for future dotask synchronization.
  Supports handwritten summaries, optional screenshots, archived labels, and
  hidden/draft exclusion without adding a repository sync utility or tracking.
- Verified the clean build and existing imported content, three-tab navigation,
  pinned/recent separation and limits, project sorting and sitemap coverage,
  draft/hidden exclusion, metadata escaping, screenshot rendering, and Markdown
  preservation. Reviewed desktop/mobile layouts and aligned the tab baselines.
- Replaced the legacy HTML/Sass/Bootstrap/jQuery site with an Eleventy build,
  shared HTML layouts, Markdown posts, and one small stylesheet. Retained the
  blue header, existing wordmark and profile assets, and the public site's
  Merriweather/Oxygen font families, served locally with their licenses.
- Exported 124 public Blogger posts and 14 public comments to JSON, retaining
  full original entries. Added repeatable export/import tools and a mapping
  from old Blogger URLs to new descriptive post paths.
- Migrated the Raspberry Pi image article and Visual Studio macro article,
  retaining their publication dates, prose, image, and exact code text.
  Added automatic home/archive listings, RSS, sitemap, and a static 404 page.
- Added a GitHub Pages build/deploy workflow, local gostatic instructions,
  and verification for archive counts, references, imported content, and
  static output. Publishing requires the documented Pages source switch.
- Removed 83 retired source/tooling files after confirming them in the stable
  baseline. Verified the clean build, exact imported code, local references,
  draft exclusion, escaped metadata/XML, literal template braces, and desktop
  and narrow mobile rendering of the image and code posts, including keyboard
  navigation and code scrolling.
