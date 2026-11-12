export function searchTerms(query) {
  return [...new Set(query.trim().split(/\s+/u).filter(Boolean))]
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

export function findEntries(entries, terms) {
  const patterns = terms.map(term => new RegExp(term, "iu"));
  return entries.filter(entry => patterns.every(pattern => pattern.test(`${entry.title}\n${entry.summary}`)));
}

export function highlightText(element, text, terms) {
  const document = element.ownerDocument;
  if (!terms.length) { element.textContent = text; return; }
  // Longest terms first keep overlapping matches intact. Every source/query
  // character is inserted as text, never HTML, including punctuation and markup.
  const pattern = new RegExp([...terms].sort((a, b) => b.length - a.length).join("|"), "giu");
  element.replaceChildren();
  let offset = 0;
  for (const match of text.matchAll(pattern)) {
    element.append(document.createTextNode(text.slice(offset, match.index)));
    const mark = document.createElement("mark");
    mark.textContent = match[0];
    element.append(mark);
    offset = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(offset)));
}

function bindSearch(form, browser, render, invalidate = () => {}) {
  const input = form.querySelector("input");
  let timer;

  function search() {
    clearTimeout(timer);
    const query = input.value.trim();
    const url = new URL(browser.location.href);
    const hadQuery = url.searchParams.has("q");
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    // Keep typing out of history, but retain a Back destination for the initial
    // search and for clearing it. Keep the current page and any other parameters.
    const method = query && hadQuery ? "replaceState" : "pushState";
    if (url.href !== browser.location.href) browser.history[method](null, "", url.href);
    return render(query);
  }

  function restoreQuery() {
    clearTimeout(timer);
    input.value = new URL(browser.location.href).searchParams.get("q") || "";
    return render(input.value.trim());
  }

  input.addEventListener("input", () => {
    invalidate();
    clearTimeout(timer);
    if (!input.value.trim()) search();
    else timer = setTimeout(search, 150);
  });
  form.addEventListener("submit", event => { event.preventDefault(); search(); });
  form.addEventListener("reset", event => {
    event.preventDefault();
    input.value = "";
    search();
    input.focus();
  });
  browser.addEventListener("popstate", restoreQuery);
  form.hidden = false;
  return restoreQuery();
}

function showSearchStatus(status, query, count, noun) {
  status.hidden = !query;
  status.textContent = !query ? ""
    : count ? `${count} result${count === 1 ? "" : "s"} for “${query}”.`
      : `No ${noun} match “${query}”.`;
}

export function initBlogSearch(archive, browser = window) {
  const document = archive.ownerDocument;
  const results = archive.querySelector("#blog-results");
  const status = archive.querySelector("#blog-search-status");
  const paging = archive.querySelector(".archive-pagination");
  const staticResults = [...results.childNodes];
  const formatDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
  let indexPromise;
  let revision = 0;

  function restoreArchive() {
    results.replaceChildren(...staticResults);
    results.removeAttribute("aria-busy");
    paging.hidden = false;
    status.hidden = true;
    status.textContent = "";
  }

  // Paginated archives fetch the full index only when a query needs it.
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = browser.fetch(archive.dataset.searchIndex, { cache: "no-cache" })
        .then(response => {
          if (!response.ok) throw new Error("Search index unavailable");
          return response.json();
        }).then(posts => {
          if (!Array.isArray(posts) || !posts.every(post => ["title", "summary", "date", "url"].every(key => typeof post[key] === "string")
            && /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(post.url))) throw new Error("Invalid search index");
          return posts;
        }).catch(error => {
          indexPromise = undefined; // A later search can retry a failed download.
          throw error;
        });
    }
    return indexPromise;
  }

  async function renderSearch(query) {
    const current = ++revision;
    if (!query) { restoreArchive(); return; }
    results.setAttribute("aria-busy", "true");
    status.hidden = false;
    status.textContent = "Searching…";
    try {
      const posts = await loadIndex();
      if (current !== revision) return;
      const terms = searchTerms(query);
      const matches = findEntries(posts, terms);
      const list = document.createElement("ol");
      list.className = "post-list";
      for (const post of matches) {
        const item = document.createElement("li");
        const heading = document.createElement("h2");
        const link = document.createElement("a");
        link.href = post.url;
        highlightText(link, post.title, terms);
        heading.append(link);
        const meta = document.createElement("p");
        meta.className = "post-meta";
        const time = document.createElement("time");
        time.setAttribute("datetime", post.date);
        time.textContent = formatDate.format(new Date(post.date));
        meta.append(time);
        const summary = document.createElement("p");
        highlightText(summary, post.summary, terms);
        item.append(heading, meta, summary);
        list.append(item);
      }
      results.replaceChildren(list);
      results.removeAttribute("aria-busy");
      paging.hidden = true;
      showSearchStatus(status, query, matches.length, "posts");
    } catch {
      if (current !== revision) return;
      restoreArchive();
      status.hidden = false;
      status.textContent = "Search is unavailable right now. You can still browse posts below.";
    }
  }

  // Invalidate an in-flight query immediately, even during debounce.
  return bindSearch(archive.querySelector("form"), browser, renderSearch, () => { ++revision; });
}

export function initProjectSearch(catalog, browser = window) {
  const status = catalog.querySelector("#project-search-status");
  const entries = [...catalog.querySelectorAll("#project-results > li")].map(item => {
    const link = item.querySelector("h2 a");
    const description = item.querySelector(".project-summary");
    return { item, link, description, title: link.textContent, summary: description.textContent };
  });

  function renderSearch(query) {
    const terms = searchTerms(query);
    const matches = new Set(findEntries(entries, terms));
    // Keep the existing links, metadata and order by filtering the static list.
    for (const entry of entries) {
      entry.item.hidden = !matches.has(entry);
      if (entry.item.hidden) continue;
      highlightText(entry.link, entry.title, terms);
      highlightText(entry.description, entry.summary, terms);
    }
    showSearchStatus(status, query, matches.size, "projects");
  }

  return bindSearch(catalog.querySelector("form"), browser, renderSearch);
}

if (typeof document !== "undefined") {
  const archive = document.querySelector("[data-blog-archive]");
  if (archive) initBlogSearch(archive);
  const catalog = document.querySelector("[data-project-catalog]");
  if (catalog) initProjectSearch(catalog);
}
