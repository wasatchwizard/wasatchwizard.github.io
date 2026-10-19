# Changelog

## 2026-10-19

- Added "When the Fix Brings Back the Problem," dated January 4, 2020, following
  the source note's heading and filename. Generalized the incident and removed
  names, organization context, system details, and distinctive event references.
  Discussed possible reasons for uninformed reversals, unfinished handoffs, and
  recurring maintenance exhaustion without assigning motives to individuals.
  Verified with `npm run verify` and focused anonymization, rendered-date,
  blog-listing, RSS, and sitemap checks.
- Added "One Flag, Three Prefixes. I'm Done Guessing." with the publication date
  September 16, 2025, matching the first appearance of Resty's flag-prefix note
  in README commit `842cc09`. Explained interchangeable prefixes and the deliberate
  absence of bundled flags, included the parser example, and linked to Resty.
  Verified the full site, rendered date, syntax highlighting, blog listing,
  RSS, and sitemap with `npm run verify` and focused generated-output checks.

## 2026-10-18

- Recorded the agreed responsibilities of WasatchWizard, WeekendTech, personal,
  and dedicated product sites, current app placements, and the shared publishing
  and basic-analytics direction in the README. Separated undecided homepage ideas
  from implemented behavior. Verified documentation diff and whitespace; no site
  code, generated output, deployment, or existing project edits were changed.
- Extended the declarative refresh-projects task to seed an entire GitHub README
  into whitespace-only project bodies, omitting the first Markdown H1. No README
  requests are made for authored text, comments, or code. Missing READMEs are
  skipped; other errors stop the task. Identity and SHA-256 guards protect edits
  made during a download, and disabled filenames remain disabled.
- Seeded 51 project bodies, including two disabled projects. Preserved the exact
  existing bodies of dotask, FixEOL, and gostatic. Three repositories lack a README
  and one has a title-only README; their bodies remain empty. Source README URLs
  are recorded for build-time link/image resolution. Older Windows-1252 text is
  decoded through an explicit fallback without altering valid UTF-8.
- Rendered README heading anchors, relative links/images, indented code, and
  unknown code-fence languages as static HTML. Later H1s display as H2s under the
  page title; executable raw HTML is stripped. Wide tables use the existing
  keyboard-focusable scrolling container. README source text stays literal.
- Added four focused rendering tests to normal verification and dotask rebuild.
  Verified the full refresh/rebuild fixture, repeat preservation, 404/503 behavior,
  and concurrent-edit refusal; the live rebuild and migration audit passed
  (183 pages, 56 published projects, 123 published/1 disabled blog posts).
  A default repeat rebuild retained exact bytes and mtimes for all 58 project
  Markdown files.
  Reviewed desktop and 320-pixel layouts, code overflow, table focus, and loaded
  README images. npm audit reported no vulnerabilities. The newer source-built
  dotask runner was used; its PATH installation and the live site are unchanged.

## 2026-10-17

- Added `dotask rebuild`: refresh GitHub project Markdown, then clean, build,
  and verify the complete Eleventy site using Node directly. It does not access
  Blogger, commit, push, or deploy, and stops at the first failing step.
- Added `.md.unpublished` as a blog publication alias alongside `.md.disabled`.
  Shared source-variant handling between verification and the archival importer,
  preserving unpublished files and rejecting conflicting copies or missing sources.
- Verified metadata-only task help, rebuilds from a source subdirectory, failure
  before build on HTTP 503, authored-content preservation, fork exclusion,
  unpublished-page exclusion, guarded historical imports, and re-enabling.
  A real GitHub rebuild and migration audit passed (183 pages, 123 published
  posts, 1 disabled); refreshed metadata for tcmd-plugins and the still-disabled
  kodybrown project. Used the existing newer source-built dotask runner.
- Allowed `.md.disabled` imported blog posts during verification while retaining
  every archive/mapping record. Disabled posts must be absent from rendered
  pages, listings, RSS, and the sitemap; missing sources and active/disabled
  duplicates still fail. Disabled the Los Cucos entry by filename only.
  Verified 183 pages with 123 published/1 disabled imported posts, the full
  published-post migration audit, re-enabling, stale-output refusal, missing
  and duplicate source refusals, and unchanged disabled-source bytes.
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
