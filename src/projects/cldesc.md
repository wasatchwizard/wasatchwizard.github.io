---
title: "cldesc"
summary: ""
screenshot: ""
hidden: false
github:
  id: 14056986
  repository: "kodybrown/cldesc"
  url: "https://github.com/kodybrown/cldesc"
  description: "Cleans and sorts a `descript.ion` file, removing entries that no longer exist with a couple more options.."
  pushedAt: "2013-12-12T21:17:09Z"
  language: "C#"
  archived: false
  readmeUrl: "https://github.com/kodybrown/cldesc/blob/master/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/cldesc/master/README.md"
---


Cleans and sorts a descript.ion file, removing entries that no longer exist.

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
