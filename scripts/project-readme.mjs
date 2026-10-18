import MarkdownIt from "markdown-it";
import GithubSlugger from "github-slugger";
import { parseHTML } from "linkedom";
import sanitizeHtml from "sanitize-html";

// Rendering adapts GitHub-relative URLs and anchors without rewriting the saved
// README. Ordinary handwritten project bodies keep Eleventy's existing renderer.
export function createProjectReadmeRenderer(highlight) {
  const markdown = new MarkdownIt({
    html: true,
    highlight(code, language) {
      if (language === "text") return "";
      try { return highlight(code, language); }
      catch (error) {
        // README authors can use fence labels Prism does not know. Let Markdown
        // escape those samples as plain text; keep other rendering errors visible.
        if (error.message.includes("is not a valid Prism.js language")) return "";
        throw error;
      }
    },
  });
  return (source, github) => {
    // Retain ordinary README formatting, never executable HTML. Code classes
    // carry the build-time Prism tokens; images remain ordinary external assets.
    const html = sanitizeHtml(markdown.render(source), {
      allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "details", "summary", "kbd", "samp"],
      allowedAttributes: {
        "*": ["id"],
        a: ["href", "name", "title"],
        img: ["src", "alt", "title", "width", "height"],
        code: ["class"], pre: ["class", "tabindex"], span: ["class"],
        th: ["colspan", "rowspan", "scope", "align"], td: ["colspan", "rowspan", "align"],
        ol: ["start"], details: ["open"],
      },
    });
    const { document } = parseHTML(`<div id="readme">${html}</div>`);
    const body = document.getElementById("readme");
    const slugger = new GithubSlugger();
    for (let heading of body.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
      if (heading.localName === "h1") {
        // The shared project layout owns the page H1. Preserve any later README
        // H1 text as a section heading without changing its Markdown source.
        const section = document.createElement("h2");
        for (const attribute of [...heading.attributes]) section.setAttribute(attribute.name, attribute.value);
        while (heading.firstChild) section.appendChild(heading.firstChild);
        heading.replaceWith(section);
        heading = section;
      }
      const slug = slugger.slug(heading.textContent);
      if (!heading.id) heading.id = slug;
    }
    const anchors = new Set([...body.querySelectorAll("[id], a[name]")].flatMap(element => [element.id, element.getAttribute("name")]).filter(Boolean));
    for (const element of body.querySelectorAll("[href], [src]")) {
      for (const attribute of ["href", "src"]) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        if (/^\s*(?:javascript|vbscript):/i.test(value)) { element.removeAttribute(attribute); continue; }
        if (attribute === "href" && value.startsWith("#")) {
          let fragment;
          try { fragment = decodeURIComponent(value.slice(1)); } catch { fragment = value.slice(1); }
          if (anchors.has(fragment)) continue;
          // Some READMEs link to their removed title or GitHub-generated anchors.
          element.setAttribute(attribute, new URL(value, github.readmeUrl).href);
        } else if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) {
          element.setAttribute(attribute, new URL(value, attribute === "src" ? github.readmeDownloadUrl : github.readmeUrl).href);
        }
      }
    }
    // README tables can be much wider than the article. Match the blog's static,
    // keyboard-accessible scrolling container instead of widening the whole page.
    for (const table of body.querySelectorAll("table")) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "Project README table");
      table.replaceWith(wrapper);
      wrapper.appendChild(table);
    }
    return body.innerHTML;
  };
}
