---
title: "Visual Studio File Comparison Settings"
date: "2007-03-07"
summary: ".. In other words, how to set Beyond Compare as your file comparison tool in VSTS. I finally got tired of the default comparison tool in Visual Studio 2005 Team Edition and went poking around to find out how to set Beyond Compare to the…"
topics: ["Beyond Compare","Hack","tips","Visual Studio"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/03/visual-studio-file-comparison-settings.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-7306438696327049896"
---

.. In other words, how to set Beyond Compare as your file comparison tool in VSTS.  
  
I finally got tired of the default comparison tool in Visual Studio 2005 Team Edition and went poking around to find out how to set [Beyond Compare](http://www.scootersoftware.com/) to the default instead. The default utility (WinDiff, I think?) is extremely irritating after having used BC for so many years now.  
  
So, on the Tools | Options dialog, click on Source Control, then Visual Studio Team Foundation Server. Now, click on the "Configure User Tools..." button. Take a look at this screen shot:  
  
[![Visual Studio File Comparison Settings](/assets/blog/visual-studio-file-comparison-settings/config-user-tools.jpg)](/assets/blog/visual-studio-file-comparison-settings/config-user-tools.jpg)  
  
The important things to notice are the Extension and Arguments settings. The Extension specifies which files this viewer configuration will be applied to. While the Arguments are specific to the viewer application itself, in this case Beyond Compare. You can change the extension (for instance, to .cs) to apply that configuration to only those file types.  
  
Compare settings:  
  
Extension: .\*  
Operation: Compare  
Command: C:\\Program Files\\Beyond Compare 2\\BC2.exe  
Arguments: %1 %2 /title1=%6 /title2=%7  
  
Merge settings:  
  
Extension: .\*  
Operation: Merge  
Command: C:\\Program Files\\Beyond Compare 2\\BC2.exe  
Arguments: %1 %2 /savetarget=%4 /title1=%6 /title2=%7  
  
  
(Disclaimer: I have no ties whatsoever to Scooter Software, the makers of Beyond Compare.)
