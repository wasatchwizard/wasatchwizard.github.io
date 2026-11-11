---
title: "A Small Utility for an Annoying HTML Chore"
date: "2001-06-14"
summary: "I finished htmlCaseConverter, a little Java utility for changing the case of HTML tag and attribute names. A repetitive editing job was enough reason to build a tool."
topics: ["Development", "Java", "HTML", "Utilities"]
---

I finished a little utility called `htmlCaseConverter` today. It changes the case of tag names and attributes in HTML files, and it is working well for the job I wanted it to do.

This is the kind of tool I enjoy making. The task is small, repetitive, and easy to describe. Doing it by hand is still enough of a nuisance that I’d rather give it to a program.

The distinction is between changing the markup names and changing the content. For example, here is an invented piece of HTML:

```html
<DIV CLASS="Panel" TITLE="Keep My Case">Hello</DIV>
```

The sort of result I want when choosing lowercase names is:

```html
<div class="Panel" title="Keep My Case">Hello</div>
```

The tag and attribute names change. The text and quoted values keep their case.

The Java tool has separate choices for tag names and attributes, so I can choose their casing independently. It also accepts a file or a directory, which makes it useful for more than a single editing session.

I don’t need this to become a complete editor. I already have editors. I want to describe this one transformation and apply it consistently to the files I’m working on.

There is satisfaction in getting a small utility to that point. A chore that keeps interrupting other work becomes something I can ask the computer to handle.
