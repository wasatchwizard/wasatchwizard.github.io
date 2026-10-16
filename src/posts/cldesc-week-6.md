---
title: "cldesc (week #6)"
date: "2013-02-05"
summary: "Cleans and sorts a descript.ion file, removing entries that no longer exist with a couple of other options too.. Check out the source code on GitHub!"
topics: ["Application of the Week 2013","CLI","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/02/cldesc-week-6.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-4535164631299169867"
---

Cleans and sorts a descript.ion file, removing entries that no longer exist with a couple of other options too..

Check out the source code on [GitHub](https://github.com/kodybrown/cldesc)!

```text
USAGE:
  cldesc.exe [options] [file]

  --vf      Remove entries where the entry does not exist.*
  --sf      Save a backup copy of the `descript.ion` file.*
  --oc      Output to the console instead of to the source file. This only
            works when a <file> is specified.

  * These items can be set as environment variables using:
    > set cldescrip_<arg>=true|false

  [file]    Specify the file to clean up. If a file is not specified, assumes
            `descript.ion` in the current directory.
            A file (or content) can be piped to `cldesc` via stdin. In such
            cases the output will always be sent to stdout.

EXAMPLES:
  Sort the `descript.ion` file in the current directory, updating the file's
  contents.
  > cldesc.exe

  Sort `file.txt` and output the results to the console.
  > type file.txt |cldesc
```
