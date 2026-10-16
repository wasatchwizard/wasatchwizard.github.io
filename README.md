# wasatchwizard.com

Technical notes, experiments, and tinkering, published at
[www.wasatchwizard.com](https://www.wasatchwizard.com/).

Eleventy builds Markdown and small Nunjucks layouts into static HTML. There is
no browser JavaScript, Bootstrap, jQuery, Sass, or external font request in the
published site. The original blue header, wordmark, and profile-link layout are
retained. Headings use Merriweather and body text uses Oxygen, matching the
existing public site; licensed WOFF2 files are served locally.

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
the title or GitHub repository name does not change that URL.

Three initial entries (dotask, FixEOL, and gostatic) were created manually from
their public GitHub metadata. No repository synchronization script, GitHub API
request, or scheduled refresh runs during builds or in the browser. Future
repository synchronization belongs to dotask's `.task` functionality.

Use this front-matter contract when adding entries or implementing that sync:

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

Only the `github` block is intended for automated updates. Preserve all other
front matter, comments, formatting, filenames, and Markdown body text. Match
repositories by their stable numeric `github.id`, including after a rename.
This ownership contract is documented here; an updater is not implemented in
this repository.

The Projects index sorts by `github.pushedAt`, newest first. Undated projects
follow dated ones; filenames break ties. Dates must be valid date strings.
Archived projects remain listed and are labeled Archived. Add `hidden: true`
or `draft: true` to exclude an entry from its page, the index, and the sitemap.
If a future sync cannot confirm that a repository remains public, it should
hide the entry for review while preserving the file.

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

The first two posts are the Raspberry Pi article from December 2012 and the
Visual Studio Output window macro from June 2011. Their dates, original prose,
and code comments are retained. The Raspberry Pi image is downloaded locally;
the macro's code is extracted from its old line-number table without changing
the code text. Only these two entries are published initially; the remaining
posts and comments stay in the archive for later migration.

To import another post from the saved snapshot:

```powershell
npm run import:blogger -- https://elegantdevelopment.blogspot.com/YEAR/MONTH/original-slug.html
npm run verify
```

The importer creates editable Markdown, downloads linked images, and records
the original URL and new descriptive path in `content-export/import-map.json`.
It refuses to overwrite existing Markdown or images; edit imported posts
directly. Embedded scripts/media, data tables, and ambiguous code tables require
manual conversion. Review conversions before committing.
Original Blogger URL paths are not retained as new routes. The mapping is for
the future redirect work on Blogger; publishing this site does not modify the
old blog. Comments are archived but are not rendered as a new comments system.

## Verify

`npm run verify` performs a clean build and checks local page/asset references,
descriptive URLs, exported counts, original imported dates, image references,
exact code text (including comments and whitespace), RSS/sitemap output, and
the absence of browser scripts or accidentally published source directories.
It also checks shared navigation, home-list separation, project ordering,
project-page links, and sitemap coverage.
Also check desktop/mobile layout, header appearance, keyboard focus, images,
and horizontally scrolling code blocks in the browser.

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

