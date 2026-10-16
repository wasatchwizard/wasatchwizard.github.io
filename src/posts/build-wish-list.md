---
title: "Build wish list"
date: "2005-09-08"
summary: "After my little rant I went to Google to find alternative build tools. The first page brings up the usual stuff. I redid my search as .net build tools. That was much better (Hippo.net looks cool) but there are still things that I can’t…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/09/build-wish-list.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113114584081774511"
---

After my little rant I went to Google to find alternative [build tools](http://www.google.com/search?sourceid=navclient&ie=UTF-8&q=build+tools). The first page brings up the usual stuff. I redid my search as [.net build tools](http://www.google.com/search?sourceid=navclient&ie=UTF-8&rls=GGLD,GGLD:2005-16,GGLD:en&q=%2Enet+build+tool). That was much better ([Hippo.net](http://weblogs.asp.net/jan/archive/2003/11/27/40038.aspx) looks cool) but there are still things that I can’t find.  
  
Here’s my wish-list for a good build tool.  
  
**Stop and Continue**. When an error occurs it should display the error and ask what it should do; Ignore, Pause, Restart entire build, Restart section that failed, Skip project, and Cancel. I want to be able to update my code and start the build process from where it failed. I know that wouldn’t be acceptable to make changes on the fly to the build process of a release, but is perfect for a development, testing build.  
  
**Windows GUI**. Provide a freaking Windows user interface! Why is almost everything out there run in a DOS box? Do I develop in a DOS box or create DOS applications? No! I want to see every thing as it runs. Don’t worry, a Windows GUI will run fine automated, even if nobody is looking at it or it’s run under the SYSTEM account.  
  
The UI could be as simple as a full size form displaying a tree view. Each parent node in the tree represents a section and each leaf under those nodes would represent individual tasks. For instance, I would have a node labeled “Update source code.” Under that node would be several items similar to: “get source from cvs branch X” and “get source from cvs branch Y.”  
  
**Beowulf build**. The build process should include multiple additional machines setup similarly or mirrored from the main machine. When the build is started on the main machine it should spawn build processes on slave machines, based on build order and project/solution dependencies.  
  
**Smart file copy**. When the build is moving and copying files around I would like to be able to copy to the same folder and only copy newer or different files. This is done easily now using a simple WScript file.  
  
What do you think? What else would be cool to have for builds?
