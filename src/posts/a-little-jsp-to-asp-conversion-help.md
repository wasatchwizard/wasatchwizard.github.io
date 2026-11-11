---
title: "A Little JSP-to-ASP Conversion Help"
date: "2001-05-31"
summary: "A project needs an ASP version of its JSP pages. I’m working on a small Java utility to reduce the repetitive editing, with a deliberately limited set of conversion rules."
topics: ["Development", "Java", "JSP", "ASP", "Utilities"]
---

We have a JSP project that needs an ASP website version, so I’ve started working on a little Java conversion utility.

The idea behind `Jsp2AspConverter` is to keep the HTML portions of a page and translate a limited set of server-side constructs into their ASP equivalents.

That includes recurring patterns such as request parameters, session values, redirects, and simple declarations and control flow. Making the same edits across a collection of pages is enough reason to see what we can automate.

It handles simple pages and a subset of JSP, not arbitrary Java programs. The generated pages still need review and testing, especially where they depend on application-specific behavior.

It’s a small conversion aid we’re working on, rather than a finished migration system. I want it to handle the routine editing so we can concentrate on the parts that require judgment.
