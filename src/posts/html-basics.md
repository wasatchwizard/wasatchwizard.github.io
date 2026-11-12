---
title: "HTML Basics"
date: "2000-11-01"
summary: "An introduction to writing HTML, from making your first page in Notepad to tables, forms, DHTML, and JavaScript."
topics: ["Development", "HTML", "JavaScript"]
---

You can write your first HTML page in Notepad and open it right in your browser. We’ll start there, then get into tags, tables, and forms. At the end we’ll look at what DHTML and JavaScript can do and why the browser matters.

## Welcome to HTML Basics

### Introduction

- **HTML, JSP, ASP, CGI, servlets, Perl, PHP, and XML.** When you ask for a page, your browser usually gets HTML. That HTML can come straight from a file or be built by a program on the server. XML lets you name the pieces of data you want to describe, such as `<price>`, while HTML gives you tags the browser already knows, such as `<p>`.
- **Any editor will work** as long as you save the file as plain text. In Word or WordPerfect, choose a plain-text format in Save As. In Notepad, choose All Files if it tries to add `.txt` after `.html`.
- **Common editors.** Notepad is enough for the examples here. Visual InterDev and HomeSite are handy when you want to work in the source. Adobe GoLive! and Macromedia Dreamweaver also let you lay out a page visually.
- **When you need a web server.** Open an `.html` file from your hard drive to see how it looks. You need a server to let other people request it over the web or to run something like ASP or a CGI program.
- **Common terminology.** Follow a request from the browser to the server and back.
  - The **client** is the browser. It asks for the page and displays the HTML it receives.
  - **Server-side** means the work happens before the reply goes back. A server can look up a name in a database, for example, and put it in the HTML it sends to the browser.
- **Definitions.** If you’re deciding what to use, start with what the server needs to do before it sends the page.
  - **HTML** ([HyperText Markup Language](https://www.w3.org/MarkUp/)) is plain text with tags that tell the browser which pieces are headings, paragraphs, links, and so on. Use View Source to see the HTML that arrives in your browser.
  - **CGI** (Common Gateway Interface) lets a web server run a script or program to handle a request. The program can read form input and print a response. You can write it in C, C++, Visual Basic, Java, Perl, or Python.
  - **Perl** is a language you can use to write CGI scripts. The Perl interpreter runs the script on the web server. For example, it can take the fields from a guestbook form and write them to a file.
  - **ISAPI** lets you extend IIS with a DLL. A filter can inspect requests as they come in. Visual C++ is a common choice for writing one.
  - **ASP** (Active Server Pages) lets you put scripts in a web page. When the browser requests an `.asp` page, IIS runs the script and sends back the resulting HTML. For example, the script can put today’s date into the page before it goes out.
  - **Java servlets** are classes that run on the server. A servlet can read the fields from a form and build the response in Java.
  - **JSP** (JavaServer Pages) lets you start with a page that looks mostly like HTML. The JSP engine turns the page into a servlet that generates the response.
  - **PHP** also lets you mix HTML with code that runs on the server. You can use it to look up a record and fill in just the part of the page that needs to change.

### HTML

- **Page structure.** If you’re used to Java or VB, think of HTML as a description of the page. You mark a line as a heading and let the browser decide how to draw it.
- **Basic tags.** Start with an HTML 4.01 document type declaration and put these three parts in every ordinary page.
  - `<html>` wraps the whole document, including the head and body.
  - `<head>` holds information about the page, including its title.
  - `<body>` holds what you see in the browser window.
  - **Hello, World!** Save this as `helloWorld.html` and open it in your browser. Change the title and heading to different things so you can see where each one shows up.

    ```html
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
      "http://www.w3.org/TR/html4/strict.dtd">
    <html lang="en">
    <head>
      <title>My first page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>I made this page in Notepad.</p>
    </body>
    </html>
    ```

- **Tags, attributes, and properties.** The tag tells the browser what you’re adding. Attributes supply details in the opening tag. A style property controls one part of the appearance.
  - <span style="color: #880000">Dark red marks the tag name</span>, <span style="color: #FF3333">light red marks the attribute</span>, and <span style="color: #33AA33">green marks the style property</span>.
  - <code>&lt;<span style="color: #880000">body</span> <span style="color: #FF3333">bgcolor</span>="#FFFFFF"&gt;</code> gives the page a white background.
  - <code>&lt;<span style="color: #880000">td</span> <span style="color: #FF3333">align</span>="left" <span style="color: #FF3333">valign</span>="middle"&gt;</code> puts the contents at the left of a table cell and centers them vertically.
  - <code>&lt;<span style="color: #880000">img</span> <span style="color: #FF3333">src</span>="mypic.gif" <span style="color: #FF3333">style</span>="<span style="color: #33AA33">visibility</span>:hidden"&gt;</code> names the picture and hides it with a style. The picture still takes up space on the page.
- **Nesting tags.** When one element is inside another, close the inside one first.
  - In `<p><b>Introduction</b></p>`, the bold text ends before the paragraph does. With `<p><b>Introduction</p></b>`, the two elements overlap and you’re leaving the browser to sort it out.
- **The head.** Put information about the whole page here.
  - `<title>` supplies the text in the browser’s title bar and gives a bookmark its starting name.
  - `<meta>` describes the page. `http-equiv` is for information such as `Content-Type`. Use `name` and `content` for details like these.
    - **Author.** `<meta name="author" content="Your Name">` records who wrote the page.
    - **Copyright.** `<meta name="copyright" content="2000 Your Name">` records a notice in the source. Put a notice in the body too if you want readers to see it.
    - **Keywords.** `<meta name="keywords" content="HTML, web pages">` gives search engines that read this field a few words about the page.
  - **Scripts.** Use `<script type="text/javascript">` for functions the page can call later, or add `src` to load them from a separate file.
  - **Styles.** Use `<style type="text/css">` for this page’s rules or `<link rel="stylesheet" type="text/css" href="site.css">` to share them across pages.
- **The body.** This is where the headings, text, links, and pictures go. You can set the appearance of the page here too.
  - `bgcolor` sets the background color. In a style sheet, use `background-color`.
  - `background="paper.gif"` tiles an image behind the page. Pick a background color that keeps the text readable while the picture loads.
  - A CSS `border` draws a line around an element. Try it on a paragraph to see the edge of the box.
  - CSS `padding` adds room between the content and the edge of its box.
  - CSS `margin` adds room outside the box. A margin on the body keeps the page away from the edges of the window.
- **Comments.** Put a note to yourself between `<!--` and `-->`. It stays out of the page display and anyone can still read it in View Source.
- **Headings.** Use `<h1>` for the main heading and `<h2>` for the next level down. The number says where the heading fits in the outline.
- **Paragraphs and line breaks.** Wrap each paragraph in `<p>` and `</p>`. Use `<br>` when you need a break inside the same paragraph, such as between lines of an address.
- **Text effects.** `<b>` makes a word bold and `<i>` makes it italic. Use `<strong>` or `<em>` when you want the markup to say that the words carry extra emphasis.
- **Special characters.** Use `&lt;` to show a literal `<`, `&amp;` for `&`, and `&copy;` for ©. Use `&nbsp;` to keep words together on one line, as in `10&nbsp;MB`.
- **Preformatted text.** `<pre>` keeps spaces and line breaks, which is handy for a code sample or a small text diagram. The browser usually collapses that extra space in a paragraph.

  ```text
  this is pre-formatted text.
                  it includes     spaces, tabs, and carriage returns,
           whereas normal HTML ignores them
  ```

- **Horizontal rules.** `<hr>` draws a line between sections. Try it between the main text and a short note at the bottom of a page.
- **Lists, combo boxes, radio buttons, and checkboxes.** Put `<li>` items inside `<ul>` for bullets or `<ol>` for numbered steps. A `<select>` with `<option>` entries gives a list of choices in a form. Radio buttons with the same name let you pick one choice. Use checkboxes for choices that can be made independently.
- **Anchors.** `<a href="page2.html">Next page</a>` links to a file next to the current page. `mailto:` links open the reader’s mail program if one is set up. To jump within the page, point `href="#examples"` at a named anchor such as `<a name="examples"></a>`.
- **Images.** Use `<img src="mypic.gif" alt="My cat on the porch">`. If the GIF sits beside the HTML file, the filename is enough for `src`.
  - `align="left"` lets text wrap to the right of the picture. Try a full paragraph next to it to see the effect.
  - `alt` gives the reader a description if the picture can’t be seen. If the picture is a button, say what the button does.
  - **Hyperlinked images.** Put the `<img>` inside an `<a>` to make the picture clickable. For a picture that links home, `alt="Home"` describes where it goes.
- **Tables.** Put information that belongs in rows and columns inside `<table>`. A schedule or price list is a good place to try one.
  - `bgcolor` sets a background color for the table or a cell. A light color on the header row can help separate it from the data.
  - For a **background image**, use the CSS `background-image` property on the table or cell. Check that you can still read the text over it.
  - `border="1"` makes the edges visible while you’re figuring out which cells go where.
  - `cellpadding` adds room **inside** each cell so the text doesn’t sit right against the border.
  - `cellspacing` changes the gap **between** cells. Compare `cellspacing="0"` with `cellspacing="4"`.
  - **Rows.** Each `<tr>` starts a new row. Put that row’s cells between `<tr>` and `</tr>`.
    - Use `<th scope="row">` for a heading that describes its row, such as the name of an item in a price list.
  - **Columns.** Each `<td>` holds one piece of data. Cells in the same position in each row line up to make a column.
    - Use `<th scope="col">` for a heading such as “Price” that describes the cells below it.
    - `<colgroup>` lets you treat several columns as a group. For example, you can give two price columns the same width.
  - **Table sample.** Put this inside the body of a copy of the Hello World page and save it as `htmlTable.html`. Add another item by copying the last row.

    ```html
    <table border="1" cellpadding="4" cellspacing="0">
      <caption>Snack prices</caption>
      <tr><th scope="col">Item</th><th scope="col">Price</th></tr>
      <tr><th scope="row">Apple</th><td>50 cents</td></tr>
      <tr><th scope="row">Pretzel</th><td>75 cents</td></tr>
    </table>
    ```

- **Text controls.** Use `<input type="text" name="visitor">` for one line and `<textarea name="message" rows="4" cols="30"></textarea>` for a longer message. Give each field a name so you can tell the values apart when they’re submitted.
- **Forms.** Wrap the controls in `<form>`, set `action` to the page or program that will handle the submission, and add a submit button. You can open the HTML file to see the controls, but the address in `action` needs to go to a working handler to do anything with the input.

  ```html
  <form action="guestbook.asp" method="post">
    <p><label for="visitor">Your name:</label>
      <input type="text" id="visitor" name="visitor"></p>
    <p><input type="submit" value="Sign the guestbook"></p>
  </form>
  ```

- **Headers and form data.** Request headers describe the request. For example, `Content-Type` can tell the server how to read the data in the request body. The form fields go in the URL with `GET`, as in `?visitor=Kody`, or in the request body with `POST`. On an ASP page you can read that posted name with `Request.Form("visitor")`.
- **Frames.** A `<frameset>` splits the window into panes, each with its own HTML page. For example, a menu on the left can open links in a frame on the right. Try bookmarking one of those pages and see which part of the window the bookmark brings back.

### DHTML

- **The `style` attribute.** Try `<p style="color: blue">A blue paragraph</p>` to change one paragraph. The property goes on the left of the colon and its value goes on the right.
- **Style sheets.** Write `p { color: blue; }` in a style sheet to give every paragraph the same color. Change that one rule and all the paragraphs that use it change together.
- **Script.** JavaScript can change a style after the page loads. For example, a menu can set a paragraph’s `display` to `none` to hide it and change it back to show it again.
- **Browser events.** An event gives the script a reason to run. `onclick` runs when you click something, `onmouseover` runs when the mouse moves over it, and `onload` runs when the page finishes loading.

### JavaScript

- **The DOM.** The Document Object Model is how a script gets at the page’s elements. Give a paragraph `id="intro"`. In a browser that supports `getElementById`, try putting `document.getElementById("intro").style.color = "blue";` inside a `<script type="text/javascript">` block just after the paragraph.
- **Browser compatibility.** A script that works in Internet Explorer can behave differently in Netscape Navigator. Try the page in both. Keep the regular links visible so readers can still get around if a script can’t run.

### Conclusion

- **Good books for learning HTML and JavaScript.** Try the examples as you go so you can see what changing one line does.
  - *HTML for the World Wide Web: Visual QuickStart Guide* is the one I’d start with for page structure, links, and tables.
  - *JavaScript for the World Wide Web: Visual QuickStart Guide* is a good next step when you want a page to respond to the reader.
- **Online references.** Look up a tag when you get stuck, then try a small example before changing the whole page.
  - [www.w3c.org](https://www.w3.org/) has the HTML and CSS specifications. The [HTML 4.01 reference](https://www.w3.org/TR/1999/REC-html401-19991224/) tells you which attributes go with each tag.
  - [Dynamic Drive](http://www.dynamicdrive.com/) has DHTML scripts. Look at the example and its browser requirements before trying it on your page.
  - [Experts Exchange](http://www.experts-exchange.com/) is a good place to look for answers. If you ask about a browser problem, give the browser version and a short example that shows what goes wrong.
