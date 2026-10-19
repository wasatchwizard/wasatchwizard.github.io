# Changelog

## 2026-10-19

- Paginated the Blog archive into static 25-post pages with Older/Newer links,
  page counts, distinct canonical URLs, and complete sitemap coverage. Ordinary
  browsing works without scripts and does not render the complete archive DOM.
- Added optional title/description search that downloads a metadata-only JSON
  index on the first nonblank query and reuses it in memory. It renders all
  matches without pagination, highlights literal case-insensitive terms safely,
  and supports query URLs, Back/Forward, clearing, no matches, and retryable
  failures. Static entries remain available if search cannot load. Article and
  project pages still have no browser scripts; no framework or backend was added.
- Added six search tests to npm verification and dotask rebuild, and extended
  output checks across every archive page and search-index field. Ten tests and
  the full migration audit passed (201 pages, 136 published posts, six archive
  pages). Disposable fixtures verified publication exclusions and archives of
  0, 1, 25, 26, and 50 posts. Reviewed desktop/320-pixel layouts, archive links,
  highlights, all 116 matches for a broad query, history restoration, clearing,
  and no-match feedback. Existing project edits were preserved.
- Added "Certified in Neo4j, Still Questioning the Fit," dated March 30, 2021,
  with the original certification screenshot and its 92% result. Distinguished
  commitment to implementing the decision from agreement with the migration,
  framed leadership pressure as personal experience, and linked the earlier
  workload critique. Verified with `npm run verify` and focused title/date,
  certificate-byte/dimension, alt-text, full-size-link, previous-post-link,
  blog-listing, RSS, and sitemap checks.
- Added "Grafana: Beautiful Charts, Better When They Line Up," dated March 9,
  2021, using the approved post and both original PNGs. Distinguished the original
  dashboard from the alignment markup, with descriptive alt text, captions, and
  links to full-resolution images. Verified with `npm run verify` and focused
  title/date, caption, alt-text, full-size-link, exact image-byte/dimension,
  generated-asset, blog-listing, RSS, and sitemap checks.
- Added two posts dated February 23, 2021: "Your Testers Need a Reset Button,"
  grounded in recurring test-account cleanup and test-data preparation, and
  "When Good People Leave, Ask What They Were Carrying," an anonymized reflection
  on losing a valued employee. Used the confirmed account-cleanup date for the
  latter's publication date without asserting it was the departure date.
  Omitted private identifiers and internal links; distinguished personal
  assessments from the employee's own reasons. Verified with `npm run verify`
  and focused rendered-date/title, anonymization, blog-listing, RSS, and sitemap
  checks, including publication of both posts.
- Added Older/Newer navigation below each blog post, with neighboring titles
  beneath the labels, a thin divider, desktop left/right alignment, and stacked
  mobile links. Eleventy's published collection supplies chronological neighbors,
  independent of pinning, without browser JavaScript or new metadata. Unavailable
  directions are omitted; a single published post has no links.
- Extended verification across published post neighbors, titles, archive
  boundaries, placement, and project-page exclusion. Kept navigation text out of
  the historical Blogger prose audit. The full migration audit and temporary-copy
  checks passed, including drafts, disabled/unpublished sources, a disabled pinned
  post, and a single-post archive. Reviewed desktop/320-pixel layouts, keyboard
  focus, and both directions using a fresh gostatic preview. Preserved existing
  project edits and separately committed posts.
- Added "New Icons for Vutility Link," dated January 19, 2021, using the approved
  post and all five supplied PNGs. Displayed original-size icons with captions
  and descriptive alt text in a wrapping gallery without changing shared styles.
  Verified with `npm run verify` and focused checks for the date/title, labels,
  alt text, exact source-image bytes and dimensions, generated asset copies,
  blog listing, RSS, and sitemap.
- Added "Microsoft, I Want to Love Your Phone," dated January 7, 2021, as a
  humorous personal account of disconnects and stalled notifications. Retained
  the period product name and focused the complaint on trust and reliability
  without asserting an unverified technical cause or present-day behavior.
  Verified with `npm run verify` and focused rendered-title/date, blog-listing,
  RSS, and sitemap checks.
- Added "Before You Replace PostgreSQL, Show Me the Workload," dated January 7,
  2021, as an anonymized objection to an unevaluated IoT measurement-store
  migration. Distinguished graph use cases from raw telemetry, cited period
  sources for PostgreSQL, TimescaleDB, Citus, and Neo4j, and called for workload
  evidence and accountable decisions. Omitted personal allegations and identifying
  ownership details. Verified with `npm run verify` and focused anonymization,
  rendered-title/date, source-link, blog-listing, RSS, and sitemap checks.
- Added "A High-Level Plan Is Not a Blank Check," dated January 11, 2021, as a
  follow-up on incomplete architecture proposals, decision authority, and
  evaluating alternatives. Linked the earlier industry-standards post and
  removed identities, private business plans, and unverified performance claims.
  Verified with `npm run verify` and focused anonymization, rendered-title/date,
  previous-post-link, blog-listing, RSS, and sitemap checks.
- Added "Permission to Disagree Has to Mean Something," dated January 6, 2021,
  using the approved anonymized draft about responding to objections and
  supporting colleagues who speak up. Omitted identities and employer details.
  Verified with `npm run verify` and focused anonymization, rendered-title/date,
  blog-listing, RSS, and sitemap checks.
- Added an image-source note to "This Is My Life Right Now..." linking to Swizec
  Teller's "Why senior engineers get nothing done." Confirmed the matching meme
  on page 4 of the saved PDF and verified the author's current article URL.
  Verified the site with `npm run verify` and checked the rendered source link
  and unchanged January 6, 2021 publication date.
- Added "Industry Standard Is Not a Blank Check," dated January 5, 2021, as an
  anonymized critique of architectural decisions without product-specific
  justification or accountability. Discussed microservice tradeoffs and vendor
  incentives with source links, omitting unsupported adoption percentages and
  personal allegations. Verified with `npm run verify` and focused anonymization,
  rendered-date, source-link, blog-listing, RSS, and sitemap checks.
- Added "This Is My Life Right Now...", dated January 6, 2021, with the supplied
  Grumpy Cat bug-count meme and a short caption. Converted the image to PNG,
  preserving all decoded pixels at 639 by 320, and provided descriptive alt text.
  Verified with `npm run verify`, an exact pixel comparison, and focused checks
  for the rendered date, image asset, blog listing, RSS, and sitemap.
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
