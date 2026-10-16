---
title: "fcopy (week #17)"
date: "2013-04-23"
summary: "fcopy is a simple utility that will copy newer and/or missing files from the source folder to the destination folder. The nice thing about this little utility is that you can customize how it determines whether to copy an existing file…"
topics: ["Application of the Week 2013"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/11/app-of-week-17-fcopyexe.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-5608625884590247521"
---

**`fcopy`** is a simple utility that will copy newer and/or missing files from the source folder to the destination folder.

The nice thing about this little utility is that you can customize how it determines whether to copy an existing file or not.

Check out the source code on **[GitHub](https://github.com/kodybrown/fcopy)**!

```text
USAGE:
fcopy [options] -source folder[\file|\wildcard] -dest folder

GENERAL OPTIONS:
  /verbose show detailed output
  /force force any changed file to be copied
  /pause pause when finished
  /test do everything but actually copying the file
  /reason explains why the file was copied
  /silent does not produce any output, overrides all others

FILTER OPTIONS:
  -xd don't compare file date/time stamps
  -d compare only file date/time stamps (excludes other filters and applies /f)
  -xs don't compare file size
  -s compare only file size (excludes other filters and applies /f)
  -xv don't compare file version
  -v compare only file version (excludes other filters and applies /f)
```
