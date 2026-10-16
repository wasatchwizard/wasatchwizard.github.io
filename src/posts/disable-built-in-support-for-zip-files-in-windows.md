---
title: "Disable built-in support for zip files in Windows"
date: "2006-05-11"
summary: "I am tired of waiting for Windows Explorer to load and cache every zip file in the folder I am trying to display. So, John sent this to me:…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2006/05/disable-built-in-support-for-zip-files.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-114773137555348024"
---

I am tired of waiting for Windows Explorer to load and cache every zip file in the folder I am trying to display. So, John sent this to me:  
  
[http://www.windowsnetworking.com/kbase/WindowsTips/WindowsXP/RegistryTips/Disable-Hide/DisableWindowsXPsbuiltinzipsupport.html](http://www.windowsnetworking.com/kbase/WindowsTips/WindowsXP/RegistryTips/Disable-Hide/DisableWindowsXPsbuiltinzipsupport.html)  
  
In short, run the following command to disable it:  
  
`regsvr32 /u %windir%\system32\zipfldr.dll`  
  
But, you'll need to rename or delete the zipfldr.dll file to make it permanent, see Chris' comments at the end of the article.  
  
  
Maybe I'll go searching for a setting to disable checking if every network share is connected when I haven't clicked on them.. ?
