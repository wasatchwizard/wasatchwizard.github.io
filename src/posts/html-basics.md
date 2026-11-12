---
title: "HTML Basics"
date: "2000-11-01"
summary: "An introduction to writing HTML, from making your first page in Notepad to tables, forms, DHTML, and JavaScript."
topics: ["Development", "HTML", "JavaScript"]
---

You can write your first HTML page in Notepad and open it right in your browser. We’ll start there, then get into tags, tables, and forms. At the end we’ll look at what DHTML and JavaScript can do and why the browser matters.

## Welcome to HTML Basics

### Introduction

- HTML vs. JSP vs. ASP vs. CGI vs. servlets vs. Perl vs. PHP vs. XML
- Any editor will work for writing HTML, including Notepad, Word, or WordPerfect, as long as you save the file as plain text.
- Common editors: Notepad, Visual InterDev, Adobe GoLive!, HomeSite, Macromedia Dreamweaver
- When a web server is and is not needed
- Common terminology
  - The "**client**" is the requesting browser.
  - Server-side means that the server processes the file or executable being requested before sending it to the client. It can connect to a database or file-system and build the output page dynamically, then send it to the client.
- Definitions:
  - HTML ([HyperText Markup Language](https://www.w3.org/MarkUp/)) is plain text that provides the document and its formatting.
  - CGI (Common Gateway Interface) lets a web server run a script or program to handle a request. You can write a CGI program in C, C++, Visual Basic, Java, Perl, or Python.
  - Perl is a language you can use to write CGI scripts. The Perl interpreter runs the script on the web server when a request comes in.
  - ISAPI lets you extend IIS with a DLL. Visual C++ is a common choice for writing an ISAPI filter.
  - ASP (Active Server Pages) lets you put scripts in a web page. When the browser requests an `.asp` page, IIS runs the script and sends the resulting HTML back to the browser.
  - Java servlets are classes that run on the server and handle web requests.
  - JSP (JavaServer Pages) lets you build pages that a JSP engine turns into Java servlets.
  - PHP is another way to run scripts on the server and generate HTML.

### HTML

- program structure (compared to Java or VB)
- required tags
  - HTML
  - HEAD
  - BODY
  - Sample "Hello, World!" (`helloWorld.html`)
- tags vs. attributes vs. properties
  - <span style="color: #880000">Dk Red = Tag</span> - <span style="color: #FF3333">Lt Red = Attribute</span> - <span style="color: #33AA33">Green = Property</span>
  - <code>&lt;<span style="color: #880000">body</span> <span style="color: #FF3333">bgcolor</span>="#FFFFFF"&gt;</code>
  - <code>&lt;<span style="color: #880000">td</span> <span style="color: #FF3333">align</span>="left" <span style="color: #FF3333">valign</span>="middle"&gt;</code>
  - <code>&lt;<span style="color: #880000">img</span> <span style="color: #FF3333">src</span>="mypic.gif" <span style="color: #FF3333">style</span>="<span style="color: #33AA33">visibility</span>:hidden"&gt;</code>
- nesting tags
  - `<p><b>Introduction</b></p>` compared to `<p><b>Introduction</p></b>`
- head tag
  - title
  - meta tags `<meta http-equiv="[name]" content="[value]">`
    - author
    - copyright
    - keywords
  - scripts
  - styles
- body tag
  - bgcolor
  - background [image]
  - borders
  - padding
  - spacing
- comments `<!-- this is a comment -->`
- headings (`<h1>`, `<h2>`, etc.)
- paragraphs and line breaks (`<p>`, `<br>`)
- text effect tags (`<b>`, `<i>`, etc.)
- special character tags (`&nbsp;` = [space], `&lt;` = &lt;, `&amp;` = &amp;, `&copy;` = &copy;, etc.)
- pre-formatted text

  ```text
  this is pre-formatted text.
                  it includes     spaces, tabs, and carriage returns,
           whereas normal HTML ignores them
  ```

- horizontal rules (displayed to separate sections)
- lists, combos, and radio/check boxes
- anchors (hyperlinks, email, and named anchors)
- images
  - align
  - alt [alternate message]
  - hyperlinked images
- tables
  - bgcolor
  - background [image]
  - borders
  - padding
  - spacing
  - rows `<tr>`
    - row header
  - columns `<td>`
    - column header
    - column groupings
  - sample (`htmlTable.html`)
- text controls
- forms
- headers and form data
- frames

### DHTML

- the style attribute
- style sheets
- script
- browser events

### JavaScript

- the DOM!
- browser (in)compatibilities

### Conclusion

- Good books for learning HTML and JavaScript
  - HTML for the World Wide Web: Visual QuickStart Guide
  - JavaScript for the World Wide Web: Visual QuickStart Guide
- Online references
  - [www.w3c.org](https://www.w3.org/)
  - [Dynamic Drive](http://www.dynamicdrive.com/): for DHTML scripts
  - [Experts Exchange](http://www.experts-exchange.com/): a good place to find answers.
