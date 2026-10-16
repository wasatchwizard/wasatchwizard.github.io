---
title: "CSBatch, a C#-based Windows Batch file preprocessor"
date: "2006-06-27"
summary: "It seems that I use batch files for everything these days. Whether I'm copying executables and dll's to a test server or creating efficient builds, batch files are a main stable that won’t go away anytime soon. Yes, even after spending…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2006/06/csbatch-c-based-windows-batch-file.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-115460688419204397"
migrationNote: "Links to retired Wasatch Wizard pages open the Internet Archive."
---

It seems that I use batch files for everything these days. Whether I'm copying executables and dll's to a test server or creating efficient builds, batch files are a main stable that won’t go away anytime soon. Yes, even after spending over a year creating new and updating existing NAnt scripts I still prefer using batch files for anything other than very large build scripts. And to be honest it still probably isn’t worth it. Especially since I created csbatch.  
  
CSBatch is a batch file preprocessor of sorts. It allows me to create a .csbat file, associate it with my csbatch.exe, and add new commands to the standard set of batch file commands. For instance, I can create functions and if else statements that include more than one line of code.  
  
Probably one of the best things is that the .csbat file is parsed (on the fly) into a standard .bat file that will run on any Windows machine, without the need for the csbatch.exe executable. That’s cool!  
  
Anyway, for more information check out my website at: [http://www.wasatchwizard.com/downloads/CSBatch.aspx](https://web.archive.org/web/*/http://www.wasatchwizard.com/downloads/CSBatch.aspx).
