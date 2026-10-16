---
title: "The Windows Vista UAC"
date: "2007-03-19"
summary: "Everyone has probably already turned off the UAC, but I hadn't until today. I left those annoying popup dialogs, because I actually like the features it provides; not for me, but for when my kids are using my computer. And, let's be…"
topics: ["Hack","tips","Vista"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/03/windows-vista-uac.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-4835997505173012762"
---

Everyone has probably already turned off the UAC, but I hadn't until today. I left those annoying popup dialogs, because I actually like the features it provides; not for me, but for when my kids are using my computer. And, let's be honest, once you had everything installed that you normally use, the popup dialog isn't really that annoying anymore.  
  
Today I found a way to disable the UAC dialogs for only Administrators. That is cool! I haven't seen that done yet, so I tried it out and it works good! You can [look here](http://www.howtogeek.com/howto/windows-vista/disable-user-account-controluac-for-administrators-only/) for the instructions to perform this tip, courtesy of [HowToGeek.com](http://www.howtogeek.com/).  
  
  
Alternatively, you can create a plain-text file on your computer, name it with a .REG extension and put the following into it.  
  

```text
   Windows Registry Editor Version 5.00
    [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"ConsentPromptBehaviorAdmin"=dword:00000000
```

  
  
Then, run that file. This registry key location was also courtesy of HowToGeek.com.
