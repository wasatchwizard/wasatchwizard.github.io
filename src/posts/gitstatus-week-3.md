---
title: "gitstatus (week #3)"
date: "2013-01-15"
summary: "» Displays an interactive Git status on the command-line. Check out the source code and downloads on GitHub! This is a simple application that allows you to get the status of your Git directory interactively. What I mean by…"
topics: ["Application of the Week 2013","CLI","Git","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/01/application-of-week-2013-week-3.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-671188775717942895"
---

**» Displays an interactive Git status on the command-line.**

Check out the source code and downloads on [**GitHub**](https://github.com/kodybrown/gitstatus)!

This is a simple application that allows you to get the status of your Git directory interactively. What I mean by interactively is you can diff files\* and mark files for adding right from the command-line.

\*In order to diff files you must create a Git alias named 'difftool' that opens/launches an external application to perform the diff. **If the alias does not open a different tool (something other than the built in 'diff' command, it will be ignored and lock-up the gitstatus application.**

Currently, it only works on modified files. It won't let you add files that are not already part of the repository. I only felt that this utility was needed when modifying files, etc. Let me know, if you would like it extended or fork it yourself!

Yes, it is very quick and dirty. However, it works nicely for what it was made for!

**`gitstatus`** is released using the MIT License, see LICENSE.txt for details.
