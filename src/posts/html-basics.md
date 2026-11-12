---
title: "HTML Basics"
date: "2000-11-01"
summary: "My original teaching outline from 2000, from opening an HTML file in Notepad to tables, DHTML, and browser quirks."
topics: ["Development", "HTML", "JavaScript"]
---

I put together this outline in November 2000 to teach the basics of HTML. It starts with what the browser and server each do, then moves from tags and tables to DHTML and JavaScript. The list of editors takes me right back to that era.

I’ve kept the outline, including a mistake in the Perl entry. A Perl CGI script runs on the server.

## Welcome to HTML Basics

### Introduction

- HTML vs. JSP vs. ASP vs. CGI vs. Servlett vs. PL vs. PHP vs. XML
- Any editor will work for writing HTML, including Notepad, Word, or WordPerfect, as long as you save the file as plain text.
- Common editors: Notepad, Visual InterDev, Adobe GoLive!, HomeSite, Macromedia Dreamweaver
- When a web server is and is not needed
- Common terminilogy
  - The "**client**" is the requesting browser.
  - Server-side means that the server processes the file or executable being requested before sending it to the client. It can connect to a database or file-system and build the output page dynamically, then send it to the client.
- Definitions:
  - HTML ([HyperText Markup Language](https://www.w3.org/MarkUp/)) is plain text that provides the document and its formatting.
  - CGI (Common Gateway Interface) a server-side solution, provides the specifications to access a script or a compiled executable from the web. These can be created using C/C++, Visual Basic, Java, Perl, Python, etc. (Every language that I can think of provides a way to create a CGI application.)
  - PL (Perl) a CGI file, that is written in the Perl language. This type of file is not compiled, but interpretted on request by the browser.
  - ISAPI (Internet Information Server API) a server-side solution, is Microsoft's version of CGI. It provides the framework to attach a web application directly to IIS, that creates an extremely fast (running) solution. It is designed only to run on Windows NT. You can create an ISAPI "filter" in most any Windows programming languages, Visual C++ being the most common.
  - ASP (Active Server Pages) a server-side solution, is interpretted on the server by request. It was originally designed by and for Microsoft's IIS, but there ports that run on Apache.
  - Servlets (Java Servlets) a server-side solution, is compiled into an actual Java class file that is called from the HTML request.
  - JSP (JavaServer Pages) a server-side solution, is compiled by a JSP engine, into a Java Servlet.
  - PHP (Pre HyperText Processor)

### HTML

- program structure (compared to Java or VB)
- required tags
  - HTML
  - HEAD
  - BODY
  - Sample "Hello, World!" (`helloWorld.html`, original file missing)
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

- horizontal rules (displayed to seperate sections)
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
  - sample (`htmlTable.html`, original file missing)
- text controls
- forms
- headers and form data
- frames

### DHTML

- the style attribute
- style sheets
- script
- browser events

### Javascript

- the DOM!
- browser (in)compatibilities

### Conclusion

- Good books for learning HTML
  - HTML for the World Wide Web: Visual QuickStart Guide
  - JavaScript for the World Wide Web: Visual QuickStart Guide
- Online references
  - [www.w3c.org](https://www.w3.org/)
  - [Dynamic Drive](http://www.dynamicdrive.com/): for DHTML scripts
  - [Experts Exchange](http://www.experts-exchange.com/): a good place to find answers.
