# Changelog

## 2026-10-17

- Unified blog entries and project details under one shared layout and styles
  for the upper return link, title, summary, metadata, and body spacing. Moved
  "All posts" above blog titles and retained the approved project source icon.
  Updated the historical-prose audit to exclude the shared navigation.
- Added content-versioned stylesheet links to prevent stale browser CSS from
  separating the project title and icon. Verified version changes during an
  actual watch rebuild, the shared shell and CSS URL on all 180 detail pages,
  desktop/320-pixel layouts and return navigation, and the complete migration
  audit (184 pages, 124 posts, 56 projects; original prose/code/images retained).

## 2026-10-16

- Matched the approved project layouts: compact title/summary/metadata entries
  in the catalog, and an upper "All projects" link, title-adjacent GitHub icon,
  summary, and single metadata line on individual pages. Shared the optional
  language/date/archive markup and retained the approved SVG, fonts, header,
  readable width, and handwritten project content. Verified 184 static pages
  and 56 projects, desktop/320-pixel layouts, navigation, keyboard focus, and
  browser errors; recorded the visual comparison in `design-qa.md`.
- Replaced the Projects catalog's separate "Source on GitHub" text links with
  a compact 20-pixel Octocat SVG beside each project title. Overlaid the
  external-link arrow on the upper-right corner with a thick white outline.
  Kept project-specific accessible labels, tooltips, visible keyboard focus, and
  44-pixel link targets. Verified the desktop preview without horizontal
  overflow and passed `npm run verify` (184 pages, 56 published projects).
- Added `.md.disabled` project support to the local refresh task: metadata
  updates target the disabled filename without recreating a published Markdown
  page. Documented disabling/re-enabling by renaming and verified ignored pages,
  catalog entries, and sitemap entries with an Eleventy fixture.
- Allowed GitHub repository names with uppercase letters, dots, and underscores
  in project URL verification. The full working site now passes verification
  with 186 pages, including all 58 project pages. Native task fixtures verified
  creation, disabled/enabled updates, handwritten content and encoding/line-end
  preservation, identity refusal, fork exclusion, and unchanged-refresh timestamps.
- Matched kodybrown.com's header icons and order: Email, Stack Overflow, GitHub,
  LinkedIn, then X. Duplicated the five SVGs and their upstream MIT license/source
  notes, matched white icon sizing and spacing, and retained this site's email.
  Verified byte-identical assets, matching headers on all 186 rendered pages,
  desktop/320-pixel mobile layout, keyboard focus, and 44-pixel link targets.
  `npm run verify` passed on a temporary copy of committed content plus this
  change (131 pages). Working-checkout verification is blocked by the existing
  project URL rule rejecting `/projects/kodybrown.github.io/`; all 59 existing
  project source files were verified unchanged. Git whitespace checks passed.
- Added dotask's GitHub project refresh task unchanged, using the initialized
  project configuration. Documented repository-name filenames, front-matter
  ownership, and manual refresh commands. Verified the copy, task help with the
  current source-built runner, and the site build; the older installed runner
  needs updating.
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
