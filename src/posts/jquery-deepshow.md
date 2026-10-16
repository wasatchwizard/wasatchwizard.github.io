---
title: "jQuery.deepShow()"
date: "2013-05-22"
summary: "I wrote this little snippet earlier today that ensures an object is shown even if one of its parent objects is currently being hidden. It does this, of course, by going through its parents and checking for the 'display:none' property.."
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2013/05/jquerydeepshow.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-1962343777232917904"
---

I wrote this little snippet earlier today that ensures an object is shown even if one of its parent objects is currently being hidden. It does this, of course, by going through its parents and checking for the '`display:none`' property..

```javascript
/// <summary>
/// Shows the object and clears any style="display:none;" /// styles on all of its parents.
/// </summary>
jQuery.fn.deepShow = function() {
    $(this).parents().each(function() {
        if ($(this).css("display") === "none") {
            $(this).css("display", "");
        }
    });
    $(this).show();
}
```
