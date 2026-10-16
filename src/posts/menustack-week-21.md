---
title: "menustack (week #21)"
date: "2013-05-21"
summary: "A nifty dynamically loaded menu, one menu item per file, useful for docking onto your taskbar for easy access to lots of applications/shortcuts. It also includes a search field at the top, so when the menu opens you can immediately…"
topics: ["Application of the Week 2013","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/05/menustack-week-21.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-7432357357868262481"
---

[![menustack](/assets/blog/menustack-week-21/menustack-255B3-255D.png)](/assets/blog/menustack-week-21/menustack-255B3-255D.png)A nifty dynamically loaded menu, one menu item per file, useful for docking onto your taskbar for easy access to lots of applications/shortcuts.  
  
It also includes a search field at the top, so when the menu opens you can immediately start typing to filter out menu items.  
**It is simple to use.**  
  
Just create a shortcut (link) to the menustack.exe file. Then edit the shortcut properties, specifically the target. This is the default syntax:  
    `menustack.exe --f filepattern filepath`  
  
The options are:  
    `--f filepattern`  
  
Specifies the files to show in the menu. This is generally a wildcard, such as `*.exe`, `*.lnk`, `*.sln`, etc.  
    `filepath`  
  
Specifies the directory to look for the files to include. This can be anywhere on your system. Be sure to include paths with spaces within double-quotes.  
  
Here is an example:  
    `"...\MenuStack.exe" --f *.lnk "%UserProfile%\Dropbox\Shortcuts"`  
  
This will create a menu item for each file (`*.lnk`) in the `Shortcuts` directory.  
**File system details:**  
  
The files in `filepath` are automatically sorted alphabetically. However, you can customize that also. You can basically separate the sort key from the displayed menu text (file name) using the \`\]\` symbol. For instance, in the screen shot above, the menu items are not alphabetical. This is because the files (the `.lnk` files) are named as follows:  

```text
    10] Chrome – Default.lnk
    10] Chrome (Profile 2).lnk
    10] Chrome (Profile 3).lnk
    20] Beyond Compare.lnk
    30] Sublime Text.lnk
    30] Visual Studio 2013.lnk
    50] Personal Projects.lnk
    60] Putty.lnk
    61] Winamp.lnk
```

It works pretty well. The search/filter is extremely inefficient and a bit wonky. But, it does the job!  
  
Check out the source code at [GitHub](https://github.com/kodybrown/menustack)!
