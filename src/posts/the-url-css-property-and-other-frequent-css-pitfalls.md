---
title: "The url CSS property and other frequent CSS pitfalls"
date: "2007-01-22"
summary: "I noticed that I have been using the url CSS property incorrectly in a lot of our pages. The correct syntax includes single quotes around the image path. For instance: <td style=\"background:url(/Controls/images/rel_calc_chooser_b.gif)…"
topics: ["css","tips"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/01/url-css-property-and-other-frequent.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-116951717151729610"
---

I noticed that I have been using the url CSS property incorrectly in a lot of our pages. The correct syntax includes single quotes around the image path. For instance:  
  
`<td style="background:url(/Controls/images/rel_calc_chooser_b.gif) repeat-x;"></td>`  
  
should be:  
  
`<td style="background:url('/Controls/images/rel_calc_chooser_b.gif') repeat-x;"></td>`  
  
Although, it usually doesn’t cause a problem with Internet Explorer and Firefox 2.0, it can cause some real mischief in older versions of Firefox and current versions of Opera and Safari. I am probably the worst at this, because I simply forget to type them or am usually copying and pasting paths and images into the editor.  
  
I’ve also noticed several other common mistakes as well.  

-   Url paths in CSS files are relative to the stylesheet, not the calling document
-   Missing pound sign before hex colors
-   Hex colors that aren’t 3 or 6 characters long
-   Not including a generic font in font-family attributes (i.e.: font-family: Tahoma, Arial, sans-serif)

I'm horrible about putting in a generic font in my styles.  
  
Tracking down CSS-caused issues is usually a head-ache and quite often a nightmare. The Firefox console provides detailed CSS errors along with the JavaScript errors. It is a good habit to review the console watching for these errors when making changes.  
  
By the way, I found a great utility to clean up and streamline CSS code at [http://www.cleancss.com/](http://www.cleancss.com/).
