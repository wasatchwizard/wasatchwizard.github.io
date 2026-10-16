---
title: "ebook_compiler (week #5)"
date: "2013-01-29"
summary: "This is a simple utility that converts .md (markdown) files to html. It then combines them into one .html file. The real benefit of this is that I can separate my book into separate files. As many or as few as I want. I currently have…"
topics: ["Application of the Week 2013","CLI","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/03/app-of-week-5-ebookcompiler-this-is.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-3857343313998548492"
---

This is a simple utility that converts `.md` (markdown) files to html. It then combines them into one `.html` file.

The real benefit of this is that I can separate my book into separate files. As many or as few as I want. I currently have split up my little book into chapters and sub-sections; one file each.

This little utility will _only_ convert md files that have changed, into html. Once all html files are up to date, they are combined into a single file and wrapped inside the template.

It supports a settings file (`_ebook_config.txt`) and a html template file (`_ebook_template.txt`).

```text
_ebook_config.txt
   title=My book title
   ext=*.md
```

  

The template file is really just an html file. Use `@SPLIT@` to indicate in the template where the book contents will be. See the examples folder in the code for details.  

**This is not a markdown to html compiler:** It relies upon [markdown.pl](http://daringfireball.net/projects/markdown/) (a Perl script) available from daring fireball for the actual conversion.

  

Check out the source code on [GitHub](https://github.com/kodybrown/ebook_compiler)!

  

It is definitely a work in progress, but it does what I need for the book I'm working on. And, it is 100 times faster than editing a single md file and converting the whole thing every time.
