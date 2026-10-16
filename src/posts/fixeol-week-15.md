---
title: "fixeol (week #15)"
date: "2013-04-09"
summary: "Fixes the line-endings of the specified file(s). The line-ending used can be specified via the command-line. You can fix a file at a time or use wildcards; even multiple file patterns. For instance: will fix the line endings of all .css…"
topics: ["Application of the Week 2013"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/11/app-of-week-15-fixeolexe.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-176770119672482521"
---

Fixes the line-endings of the specified file(s). The line-ending used can be specified via the command-line. You can fix a file at a time or use wildcards; even multiple file patterns. For instance:

```text
 $ fixeol /r *.css *.js
```

  

will fix the line endings of all .css and .js files in the current and all sub-directories.

  

Check out the source code on [GitHub!](https://github.com/kodybrown/fixeol)

```text
Usage:

  feol.exe [options] [commands] [-file] "filename"

     file      the full filename of the file to manipulate.
               file or feol_file (below) is required.

  commands:

     /eol[=rn|n]        override the default eol settings of the operating system.

  options:

     /v /verbose        output additional details (default:false)
     /b /backup         backup (default:false)
     /r /recurse        apply the file pattern(s) to the current
                        and all sub-directories (default:false)
     /p /pause          pause when finished (default:false)

     /set               displays the current environment variables
                        then exits. All other options are ignored.

     *use ! to set any option to opposite value. overrides environment variables.
      for example use /!v to not use verbose.

  environment variables:

     feol_file=filename           sets -file "filename"
     feol_verbose=true|false      sets /v or /!v
     feol_pause=true|false        sets /pause or /!pause

     *command-line arguments override environment variables
```
