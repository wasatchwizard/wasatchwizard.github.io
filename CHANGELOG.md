# Changelog

## 2026-10-16

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
