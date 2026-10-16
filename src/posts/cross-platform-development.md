---
title: "Cross-platform development"
date: "2005-11-08"
summary: "A friend and I are creating a new software application. It has some new ideas, not revolutionary, but good solid features. What it does have, however, is a fantastic development paradigm. In creating and using my own developer toolkit…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/11/cross-platform-development.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113143856401199991"
---

A friend and I are creating a new software application. It has some new ideas, not revolutionary, but good solid features. What it does have, however, is a fantastic development paradigm. In creating and using my own developer toolkit for this application, I can now code for the web and desktop applications using exactly the same code for both. No conversion or runtime or parsing of the source or binaries is required.  
  
It’s a truly wonderful thing, let me tell you. The only visible difference is that when it is run from the web it has the “Application title – Browser Name” in it. Other than that, we’ve got it working so good in both environments that you can’t tell the difference by looking at it (unless you’re fastidious like me). It’s even cross-browser, too! Steve is currently implementing functionality in the back-end to automatically synchronize the local content with a web server for secure, off-site storage of the user’s data. I’m busy adding support for new controls, user-defined controls, and additional themes.  
  
  
So, what’s the benefit? What’s the big deal? Well, take the company I work for, for instance. We have dozens of developers creating a Windows-based “core-console” that provides the majority of our core products’ functionality. We also have several developers providing a sub-set of that functionality for the “web-console.” The benefit of this toolkit and paradigm in general, is in focusing everyone’s time and effort into “one-console” that will look and behave exactly the same whether it’s launched from the local machine or a web address. Forms, screens, and functionality wouldn’t be created twice. More code is re-usable. We haven’t even touched the value of testers re-grouping to test only one product instead of having two teams testing (by all rights) different products; one desktop application and one web application.  
  
On the other side of things, now we could say we have a client for every major operating system, where before we had a Windows desktop console and an IE-only web console. Using this toolkit, we’d have a full-featured console that behaved the same whether it’s run on Windows, Linux, MacOS, or an operating system that has a Firefox browser.  
  
The user can install it and it will run faster than via a web address. Or, you can run it from the web. All of the user’s settings are shared and available between both versions of the application. The product is better designed, built better, more fully tested, and has more features. The user is happier. Heck, even management would be happy! Now, that’s value!
