---
title: "editlinks.vbs (week #25)"
date: "2013-06-19"
summary: "This utility modifies specified shortcut (.lnk) file's paths, including the target, directory, icon, and sometimes description. There is no usage information provided by the script itself, so here it is: This will update all paths:…"
topics: ["Application of the Week 2013","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/06/editlinksvbs-week-25.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-2417074495352115745"
---

This utility modifies specified shortcut (.lnk) file's paths, including the target, directory, icon, and sometimes description.

There is no usage information provided by the script itself, so here it is:


```text
USAGE:
  editlinks.vbs [/s] [--path C:\path] "replace" "with" ["replace" "with"] ...
```


This will update all paths:

- Target: the application linked to
- Start in: the starting directory
- Icon: the location of the icon

It will also empty the description property/field if it matches (exactly) the Target.

Here is an example:


```text
$ editlinks.vbs --path "C:\new-bin" "C:\old-bin" "C:\new-bin"
```


This will change all shortcuts that point to 'C:\\old-bin' to point instead to 'C:\\new-bin'.

NOTE: When retrieving the TargetPath from a shortcut, it will (sometimes?) expand any environment variables already in it. This will cause the number of changed files to seem quite large (and never go down).

Check out the source code at [GitHub](https://github.com/kodybrown/dos/blob/master/editlinks.vbs)!
