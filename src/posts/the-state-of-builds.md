---
title: "The State of Builds"
date: "2005-09-08"
summary: "I don’t care for NAnt. In this modern world of object oriented development, it feels like I’m being forced back into the Stone Age, editing Batch files. No, actually, I would prefer editing Batch files than NAnt XML files. At least with…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/09/state-of-builds.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113114567208420519"
---

I don’t care for NAnt. In this modern world of object oriented development, it feels like I’m being forced back into the Stone Age, editing Batch files. No, actually, I would prefer editing Batch files than NAnt XML files. At least with Batch files I can clearly see what is going on and what will happen next. Batch files look like a lot less typing, too. NAnt seems to be using XML just because it can, without any of its benefits. I could be wrong; I’m not that familiar with it yet.  
  
Aside from that, why can’t I create a simple application per project that uses specific interfaces that will perform the build? What unwritten law is it that prevents some teams from doing it themselves? The build script could be in the language of my project. Make it a part of my unit-tests class. Make both into an executable that can build the project and run test-units (usually part of my dev projects) and execute additional run-time unit-tests once it’s done.  
  
I could use a library that provides build functionality to open files, move, delete, rename, update, etc., (not that much would be needed over the development language I’m using to create it). In a C# project I can’t think of anything that wouldn’t be easier to do in C# than NAnt or a Batch file or … Hmm. What else is there?
