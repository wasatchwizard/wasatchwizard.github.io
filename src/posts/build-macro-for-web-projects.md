---
title: "Build macro for web projects"
date: "2009-09-18"
summary: "Using this macro and batch file you can map a keyboard shortcut and/or a toolbar button in Visual Studio to restart IIS and build the selected project asynchronously. 1. Create a batch file that includes the following: For projects that…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2009/09/build-macro-for-web-projects.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-4211038107678591060"
---

Using this macro and batch file you can map a keyboard shortcut and/or a toolbar button in Visual Studio to restart IIS and build the selected project asynchronously.

1\. Create a batch file that includes the following:

```batch
@echo off 
net stop w3svc 
net start w3svc
```

  
  

For projects that tend to get hung up more frequently in IIS, you can replace the 'net stop' line above with net 'stop **iisadmin**' instead. (Don’t change the ‘net start’ line.)

  
  

2\. Create a new macro project that includes events (or add a new module in existing macro project).

  
  

3\. Paste the following code into the module, inserting the path to the new batch file:

  
  

```vbnet
Sub BuildSelectedWebProject() 
   ' restart iis 
   Shell("<your batch file path>", AppWinStyle.MinimizedNoFocus, False) 
   ' start the build 
   DTE.ExecuteCommand("Build.BuildSelection") 
End Sub
```

  
  

4\. Map a keyboard shortcut or toolbar button to the new macro: Macros.\<Macro Project Name\>.BuildSelectedWebProject

  
  

  
  

**Build Solution**

  
  

Optionally, you can also re-map Ctrl+Shift+B (Build Solution) to the following if desired:

  
  

```vbnet
Sub BuildSolution() 
   ' restart iis 
   Shell("<your batch file path>\iisrestart.bat", AppWinStyle.MinimizedNoFocus, False) 
   ' start the build 
   DTE.ExecuteCommand("Build.BuildSolution") 
End Sub
```
