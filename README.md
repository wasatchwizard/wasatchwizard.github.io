# wasatchwizard.com

Technical notes, experiments, and tinkering, published at
[www.wasatchwizard.com](https://www.wasatchwizard.com/).

Eleventy builds Markdown and small Nunjucks layouts into static HTML. There is
no browser JavaScript, Bootstrap, jQuery, Sass, or external font request in the
published site. The original blue header, wordmark, and profile-link layout are
retained. Headings use Merriweather and body text uses Oxygen, matching the
existing public site; licensed WOFF2 files are served locally.

The header contact/profile icons match kodybrown.com: Email, Stack Overflow,
GitHub, LinkedIn, then X. Identical local SVGs, their source notes, and the upstream
MIT license are in `src/assets/social/`. Email uses this site's configured address.

Blog entries and individual project pages extend `src/_includes/detail.njk`.
It owns the return link above the title and the shared heading, summary,
metadata, and body spacing; child layouts supply their specific content.
Stylesheet links include a content-based version so CSS edits request a fresh
browser copy, including during watch rebuilds. The site still serves static
files and does not need browser JavaScript for this.

## Site roles and planning

Agreed direction as of October 18, 2026. This section records site responsibilities
and future work; it does not describe changes already made to the published sites.

### Responsibilities

- **WasatchWizard (WW):** technical writing, experiments, tinkering, and the broader
  collection of personal projects, apps, and developer utilities. Keep the Projects
  section here. Projects do not move to WeekendTech simply because they are free.
- **WeekendTech (WT):** curated tools and practical guidance for the weekend
  warrior: the person friends and family call for help with computers and everyday
  technology. Audience and usefulness determine inclusion, rather than price,
  repository visibility, or source availability. It is not a catalog of every
  free tool or every private-source project.
- **Dedicated product websites:** products with paid editions or distinct hosted
  services have their own product home. They can still be mentioned or recommended
  on WW or WT when relevant; their product documentation and services live there.
- **kodybrown.com:** personal introduction, professional background, resume, and
  links to the other sites.

### Current app placement

- GroundZero 7, WeekendExplorer, and Timekeeper Assistant belong on WeekendTech.
- Image Viewer goes with WeekendExplorer. A new version of Bricksoft Viewer is
  planned as a simple, very fast, read-only CSV/TAB viewer. "Weekend Image Viewer"
  and "Weekend Data Viewer" are tentative names, not settled product names.
- Dashtrics, klocs, and MergeStyles belong with the broader WasatchWizard projects.
  Making their repositories public is intended, not completed by this plan.
- PCSentinel will have its own domain for its planned Pro/cloud-synced version.
- Plain-Text Suite already has its dedicated home at plaintextsuite.com.
- KIT is currently hosted at memreca.com; keep-in-touch.org is the intended new
  app/domain home. This note does not imply that the domain move has happened.
- Placement of gitx and FormFiller remains undecided.

### WeekendTech publishing and hosting direction

Preserve the existing WeekendTech layout and structure while moving toward
Eleventy-generated static HTML/CSS with minimal browser JavaScript. Host the
static website on GitHub Pages, following WW and kodybrown.com. No purchases are
planned on WeekendTech itself.

Add a Markdown blog using WW's publishing conventions. It should cover practical
tech-help workflows and useful third-party tools as well as original WeekendTech
apps. A recommendation does not require the tool to have been created here.

### Shared basic analytics direction

Use one small browser script for page views and download-link activations across
WW, WT, and kodybrown.com. Only aggregate event totals are needed, not unique
visitors, sessions, download completion, or installation tracking. The collector
should neither create nor use tracking cookies or persistent visitor identifiers.

The existing ProShop droplet can receive events through a proposed minimal
endpoint, with exact allowed-origin checks and site-specific counts. A separate
endpoint is preferred over invoking the current consent/visitor-cookie helper.
Downloads and navigation must continue independently of event delivery. Endpoint,
storage, privacy-notice, and reporting details still need implementation review;
this plan does not establish a blanket consent exemption or deploy analytics.

### WasatchWizard homepage ideas to revisit

- Remove the visible label from the pinned-post area.
- Reconsider the pin indicator/treatment; its replacement is not selected yet.
- Consider removing the Recent posts section entirely; this is not yet a decision.
- Make it possible to highlight selected apps on the WW homepage while preserving
  the site's broader technical/project role. The content model and layout for
  those highlights remain to be designed.

## Develop and preview

Use Node.js 24 LTS (Node 22 or newer is supported) and npm:

```powershell
cd C:\Users\kodyb\Projects\WasatchWizard.com\www.wasatchwizard.com
npm ci
npm run verify
gostatic.exe -path .\_site -port 8080
```

Stop the previous server serving the repository root before reusing port 8080,
or choose a free port such as 8090. Serve `_site`, not the source checkout.
`npm run watch` rebuilds as content changes; run gostatic in a second terminal.
The watcher does not inject live-reload JavaScript into the site.

## Rebuild everything

Run `dotask rebuild` from the website root. It calls `refresh-projects`, then
runs the same tests/clean/Eleventy-build/verification sequence as `npm run verify`.
All local blog Markdown is compiled during that build; no separate blog refresh
or Blogger access is needed. The first failing step stops the workflow.

The task updates project source files and generates verified `_site` output.
Review and commit those source changes yourself; pushing master triggers the
existing GitHub Pages deployment. The task does not commit, push, or deploy.
For an offline rebuild without refreshing GitHub metadata, use `npm run verify`.
Dependencies must already be installed with `npm ci`.

This needs the same recent dotask runner as `refresh-projects` below. If PATH
still resolves to the older installed runner, use the existing source build:

```powershell
cd C:\Users\kodyb\Projects\WasatchWizard.com\www.wasatchwizard.com
& C:\tmp\_rust\dotask\target\release\dotask.exe rebuild
```

## Write a post

Create `src/posts/a-descriptive-title.md`:

```markdown
---
title: "A descriptive title"
date: "2026-10-16"
summary: "A short introduction for the home page, archive, and RSS feed."
topics: ["Electronics"]
---

Write the post in Markdown here.
```

The filename gives it the stable URL `/blog/a-descriptive-title/`. There are no
numeric query-string IDs, dates in the URL, or manually maintained post lists.
Changing the title keeps the URL; renaming the file changes it. Home, Blog,
RSS, and the sitemap discover published posts automatically. Add `draft: true`
to exclude a post from the generated site and lists. Markdown is not processed
as a template, so code samples can contain literal template braces.

Use fenced code blocks with a language such as `vbnet`, `csharp`, or `javascript`.
Highlighting happens during the build. Put images under `src/assets/blog/` and
reference them with `/assets/blog/...` paths.

### Disable a post

Rename `src/posts/example.md` to either `src/posts/example.md.disabled` or
`src/posts/example.md.unpublished` to stop publishing it. Both suffixes have the
same effect. Remove the suffix to publish it again at its original URL.
Eleventy excludes it from its page, Home, Blog, RSS, and the sitemap. Keep only
one source variant; verification rejects conflicting variants of imported posts.
These suffixes control website publication, not access to committed source files
in the public GitHub repository.

Imported posts keep their original archive and mapping records. Verification
accepts an explicitly disabled source, checks that it is not published, and
still rejects a missing source file. The optional migration audit compares
published imported posts with the archive; disabled posts have no rendered page
to compare. Re-importing the full archive skips mapped posts, so it does not
recreate an unpublished entry. Explicit historical imports also refuse to create
a publishing `.md` file when either unpublished variant already exists.

### Navigate between posts

Each blog article ends with Older and Newer links, with the neighboring post
title below each label. They use the published Blog archive's chronological
order, including its ordering of posts with the same date. Pinning does not
change that sequence; drafts and `.disabled`/`.unpublished` sources are skipped.
At either end, the unavailable direction is omitted. A lone published post has
no adjacent-post navigation. The links sit side by side on wider screens and
stack on narrow screens, with Older first. They are ordinary static HTML links
generated by Eleventy; no extra front matter or browser JavaScript is needed.

### Pin posts on Home

Add `pinned: true` to a post's front matter to feature it on Home. Pinned posts
appear newest first, followed by up to three recent unpinned posts. Posts are
not repeated between those two lists. The Blog tab always lists all published
posts chronologically, regardless of pinning. The Raspberry Pi article is
pinned as the initial example.

## Project notes

The Home, Blog, and Projects tabs share the same layout. Projects are ordinary
Markdown files under `src/projects/`, with descriptive URLs derived from their
filenames: `src/projects/gostatic.md` becomes `/projects/gostatic/`. Changing
the title keeps the URL. Filenames match repository names, such as `fixeol.md`;
renaming a Markdown file changes its URL. Automatic repository-rename handling
is not needed for this project.

Three initial entries (dotask, FixEOL, and gostatic) were created manually from
their public GitHub metadata. Refresh project metadata explicitly with the
native dotask task copied from dotask's `examples/github-projects/` example:

```powershell
dotask help refresh-projects
dotask refresh-projects
npm run verify
```

Run these commands from the website root. The existing `.dotasks.yaml` anchors
the project; `.tasks/refresh-projects.task` defaults to public repositories owned
by `kodybrown`, excludes forks, follows pagination, and writes `src/projects/`.
The local task additionally recognizes disabled project filenames as described
below; the upstream example remains unchanged.
No GitHub API request or scheduled refresh runs during Eleventy builds or in
the browser. The refresh changes local Markdown only; commit and publish the
reviewed changes separately.

Use a dotask build supporting native HTTP/JSON workflows and front-matter file
edits. Older builds can reject the task with an unknown `id` key error. Target
help checks discovery and metadata without making requests or changing pages.

Use this front-matter contract when adding or editing entries:

```markdown
---
title: "Project name"
summary: "Optional handwritten blurb; overrides the GitHub description."
hidden: false
# Optional: screenshot: "/assets/projects/project-name.png"
# Optional: screenshotAlt: "Describe what the screenshot shows."
github:
  id: 123456
  repository: "kodybrown/project-name"
  url: "https://github.com/kodybrown/project-name"
  description: "The repository's description, used when summary is omitted."
  pushedAt: "2026-10-16T12:00:00Z"
  language: "Go"
  archived: false
---

Handwritten notes, examples, and additional images go here.
```

The task refreshes the eight declared GitHub metadata fields. It initializes title,
blank summary/screenshot, and `hidden: false` only when creating a file. Existing
front matter, comments, formatting, and Markdown body text remain intact. The
numeric `github.id` stays in front matter as an identity guard: a different ID
at the same filename stops that update. It does not determine the filename.

If the body outside front matter contains only whitespace, the task also copies
the repository's entire README, removing its first Markdown H1 (ATX or Setext).
Everything else stays in the Markdown source, including badges, examples, later
headings, and images. A comment, code sample, or any other non-whitespace body
prevents the download and replacement; once seeded, that body belongs to you.
Delete the complete body to opt into a fresh copy on a later refresh. A missing
README (404) is skipped normally; other download failures stop the task. Blank
or title-only READMEs leave the body empty and can be checked again next time.
UTF-8 is preferred, with an explicit Windows-1252 fallback for older READMEs.

Seeded entries record `github.readmeUrl` and `github.readmeDownloadUrl` so the
build can resolve relative links and images against their GitHub source. Keep
those fields when editing imported content; use full absolute URLs for
your own additions. Heading anchors work locally when present; links to removed
or GitHub-only anchors point to the original README. Later H1s display as H2s
under the project's page title. Rendering preserves static formatting and
escapes unknown code-fence languages, stripping executable raw HTML. This is
all build-time processing; there is still no browser JavaScript. README images
are loaded from their original hosts and may change or become unavailable.

This workflow requires a dotask runner supporting text HTTP responses, optional
404s, and `body-if-empty` front-matter updates. The source-built runner shown
above includes these actions; the older PATH installation has not been changed.

### Disable a project

Rename `GitVersion.md` to `GitVersion.md.disabled` to exclude it from the site.
The refresh task first checks for `<repo-name>.md.disabled` and updates its
GitHub metadata in place instead of creating `<repo-name>.md` again. Empty bodies
can receive the README too. The title, summary, screenshots, comments, and any
nonempty Markdown body remain preserved. Disabled
files are ignored by Eleventy's configured template formats and project glob,
so they have no page, index entry, or sitemap entry.

To re-enable a project, rename it back to `<repo-name>.md`. Run `npm run build`
or `npm run verify` after renaming so the clean build removes any old page.
Keep only one of the two filenames for each repository; a disabled file does
not suppress a separate `.md` file if both exist.

The Projects index sorts by `github.pushedAt`, newest first. Undated projects
follow dated ones; filenames break ties. Dates must be valid date strings.
Archived projects remain listed and are labeled Archived. Add `hidden: true`
or `draft: true` to exclude an entry from its page, the index, and the sitemap.
The current task leaves files untouched when their repositories are absent
from the public API response. Missing/deleted-repository reconciliation is
future work; preserving a page as `fixeol.md.notfound` is one option. That
extension is ignored by the current Eleventy template formats and project
collection, so the file would not be published.

Project pages support an optional local `screenshot` and descriptive
`screenshotAlt`; put images under `src/assets/projects/`. Missing screenshots
do not produce empty image placeholders. Wasatch Wizard holds development
notes and experiments; link to WeekendTech for a project's usable releases.

## Privacy

The site currently includes no analytics, optional tracking, third-party
embeds, or cookie-setting scripts. No consent banner is included. Reassess
consent needs before introducing those features. If consent controls become
necessary, use the bottom-centered Dude Stickers notice as the visual
reference, with accurate wording and functioning tracking controls.

## Source layout

- `src/_includes/`: shared HTML layout, post layout, and post list.
- `src/_data/site.json`: site name, canonical domain, and author details.
- `.dotasks.yaml` and `.tasks/`: native dotask configuration and project refresh task.
- `src/posts/`: Markdown articles.
- `src/projects/`: Markdown project notes and separately owned GitHub metadata.
- `src/assets/site.css`: the single hand-authored stylesheet.
- `src/assets/fonts/`: local fonts, upstream licenses, and source URLs.
- `content-export/`: the Blogger archive and imported-post URL mapping. This
  directory is not copied into the published site.
- `scripts/`: export, import, output cleanup, and verification tools.
- `_site/`: generated output, ignored by Git and recreated for each full build.

The original header images and favicon artwork remain in `img/` and the root.
Only explicitly selected active assets are published. Retired templates,
frameworks, font demos, and build tooling are recoverable from Git history;
the committed baseline before this migration is `7cb709a`.

## Blogger export and migration

`content-export/blogger.json` is a JSON snapshot of all **124 publicly published
posts** and **14 public comments** available during the initial export. It keeps
the original Blogger entry objects, including full HTML, IDs, timestamps,
labels, author information, links, and image URLs.

This is a public-feed archive, not Blogger's authenticated account backup:
drafts and private content are unavailable through this feed. Image bytes are
not embedded in the JSON. For a full account backup including nonpublic
content, also retain an authenticated Blogger/Google Takeout export.

Refresh the public JSON export explicitly with:

```powershell
npm run export:blogger
```

The exporter follows pagination, checks totals and duplicate IDs, and writes
the completed snapshot before replacing the old one. If comments cannot be
retrieved, their status is recorded as unavailable rather than zero comments.
Exports are not fetched during normal builds or GitHub publishing.

All **124 posts**, published between July 2005 and February 2016, are migrated
to editable Markdown with descriptive URLs, original dates, labels, prose, and
code. The original Raspberry Pi and Visual Studio macro entries retain their
handwritten summaries and pin setting. The archive includes personal posts as
well as technical articles; no entries have been silently filtered out.

Eleven original images are stored locally. The small smiley in “Online
phonebooks” returns 404 and has no available Internet Archive capture; its
original `8^)` alternative is preserved instead of a broken image. The original
HTML and image URL remain in the JSON archive and import mapping.

Legacy code line numbers and font styles are replaced by fenced code blocks,
restoring HTML line breaks and using ordinary spaces for nonbreaking-space
indentation. Code comments and internal whitespace are retained. Five data
tables use cleaned HTML within their Markdown files to preserve cells, links,
and column spans; wide tables scroll within the article.

The JavaScript null/undefined article's demo scripts are displayed as code;
the original buttons are removed. The Sitecore bookmarklet source is retained
as code with a note about its retired draggable links. Links between migrated
Blogger posts point to the new local URLs. Four retired Wasatch Wizard download
or application links open Internet Archive lookups, with a note in each article;
this does not guarantee that those old downloads have been captured. Other
external links remain as originally published and may have aged or disappeared.

To import another post from the saved snapshot:

```powershell
npm run import:blogger -- https://elegantdevelopment.blogspot.com/YEAR/MONTH/original-slug.html
npm run verify
```

To import all unmapped entries from a refreshed snapshot:

```powershell
npm run import:blogger -- --all
```

The importer creates editable Markdown, downloads linked images, and records
the original URL and new descriptive path in `content-export/import-map.json`.
It refuses to overwrite existing Markdown or images. Bulk mode skips entries
already in the mapping, preserving later edits; running it again is a no-op.
The mapping also records image provenance, converted code hashes, link changes,
and migration notes. External scripts, embedded media, ambiguous code tables,
and substantive images that cannot be downloaded still require manual review.
Review conversions before committing. Normal builds need neither Blogger nor
access to the original image hosts.
Original Blogger URL paths are not retained as new routes. The mapping is for
the future redirect work on Blogger; publishing this site does not modify the
old blog. Comments are archived but are not rendered as a new comments system.

## Verify

`npm run verify` performs a clean build and checks local page/asset references,
descriptive URLs, archive/mapping completeness, image references, RSS/sitemap output, and
the absence of browser scripts or accidentally published source directories.
It also checks shared navigation, home-list separation, project ordering,
project-page links, and sitemap coverage.
Also check desktop/mobile layout, header appearance, keyboard focus, images,
and horizontally scrolling code blocks in the browser.

`npm run verify:migration` additionally compares each imported article's date,
title, complete visible prose, data-table cells, original code with restored
line breaks, converted code hashes, and image counts against the saved archive.
This stricter audit passed for the completed migration. It is deliberately
separate from normal build verification so subsequent handwritten content edits
do not require changing the historical archive. Existing later edits can make
the historical-parity audit fail even when the site itself is valid.

## Publish

The integration branch is `master`. `.github/workflows/pages.yml` installs the
locked dependencies, verifies the site, and publishes **only `_site`** on a push
to master. Pull requests build and verify without deploying. Content can be
written and committed directly through GitHub's web editor.

Before the first deployment, change this repository's **Settings → Pages →
Build and deployment → Source** from **Deploy from a branch** to **GitHub
Actions**. Keep the custom domain `www.wasatchwizard.com`. The existing Pages
setting still serves the master branch root until that one-time switch; it
cannot serve this Eleventy source tree directly. Do not publish the rebuilt
source until Pages is ready to use the workflow.

After that switch, push the reviewed commits or run the workflow manually.
The blog export is already committed, so builds need no access to Blogger.

