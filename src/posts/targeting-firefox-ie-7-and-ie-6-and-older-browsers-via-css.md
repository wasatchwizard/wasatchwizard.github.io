---
title: "Targeting Firefox, IE 7, and IE 6 (and older) browsers via CSS"
date: "2007-08-16"
summary: "The tip for today's post is applying different styles to IE 7, IE 6 and older, and all the other browsers out there without having custom script or changing out style sheets. It’s simple too! There you have it! Now you can target the…"
topics: ["css","Regular Expressions"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/08/targeting-firefox-ie-7-and-ie-6-and.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-6113928170507109505"
---

The tip for today's post is applying different styles to IE 7, IE 6 and older, and all the other browsers out there without having custom script or changing out style sheets. It’s simple too!

<div class="table-scroll" role="region" aria-label="Article table" tabindex="0">
<table><tbody><tr><td>1)</td><td>First, create your normal style, which of course applies to all browsers:</td></tr><tr><td>&#160;</td><td><span>padding</span>: 2<span>px</span> 6<span>px</span> 2<span>px</span> 6<span>px</span>;</td></tr><tr><td>2)</td><td>Then, create the style you’d like to apply only to Internet Explorer 7:</td></tr><tr><td>&#160;</td><td>#<span>padding</span>: 1<span>px</span> 6<span>px</span> 1<span>px</span> 6<span>px</span>;</td></tr><tr><td>3)</td><td>Now, create the style to apply only to Internet Explorer 6 and older:</td></tr><tr><td>&#160;</td><td><span>/* _padding: 3px 4px 3px 4px; */</span></td></tr></tbody></table>
</div>

There you have it! Now you can target the three main browsers: IE 6, IE 7, and everyone else.

Technically, step 2 doesn’t only apply to IE 7, but really applies to all Internet Explorer browsers. In other words, if you wanted to target _all_ IE browsers only steps 1 and 2 are needed.

I don’t remember where I found this. I believe parts came from a couple of different sources, but anyway, it’s a great hack – especially when used together.
