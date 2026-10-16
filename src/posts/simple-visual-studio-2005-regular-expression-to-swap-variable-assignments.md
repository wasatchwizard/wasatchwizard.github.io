---
title: "Simple Visual Studio 2005 regular expression to swap variable assignments"
date: "2009-07-21"
summary: "Here is a simple regular expression to use in Visual Studio 2005 to swap the variable/object and assignment."
topics: ["C#","Regular Expressions","Visual Studio"]
originalUrl: "https://elegantdevelopment.blogspot.com/2009/07/simple-visual-studio-2005-regular.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-2308350240700206610"
---

Here is a simple regular expression to use in Visual Studio 2005 to swap the variable/object and assignment.

<div class="table-scroll" role="region" aria-label="Article table" tabindex="0">
<table><tbody><tr><td>Find What:</td><td>mySettings.{.+} = {.+};</td></tr><tr><td>Replace With:</td><td>\2 = mySettings.\1;</td></tr></tbody></table>
</div>
