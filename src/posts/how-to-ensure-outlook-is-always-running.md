---
title: "How to ensure Outlook is always running.."
date: "2010-10-07"
summary: "When I am working, I like to close applications that I am not currently using. This conserves memory (not important) and eliminates desktop clutter (very important). Too often however, Outlook gets closed down in the process. This…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2010/10/how-to-ensure-outlook-is-already.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-965020620403040366"
---

  
When I am working, I like to close applications that I am not currently using. This conserves memory (not important) and eliminates desktop clutter (very important). Too often however, Outlook gets closed down in the process. This generally only happens when I need to be reminded of a meeting or whenever I receive important/timely emails.  
  
Here is a simple AutoHotKey (AHK) script that will ensure that Outlook is always open and running.  
  
**OutlookStayAlive.ahk**  

```autohotkey
; 

; Ensure Microsoft Outlook is running

; Author: Kody Brown (kody.brown@venafi.com)

; Created: Sept 2, 2010

; Copyright: Free

; 

 

#Persistent

   SetTimer, OutlookStayAlive, 5000

Return

 

OutlookStayAlive:

   If WinExist("ahk_class rctrl_renwnd32")

   {

      ;WinActivate

   }

   Else

   {

      IfExist, C:\Program Files\Microsoft Office\Office12\Outlook.exe

         Run, "C:\Program Files\Microsoft Office\Office12\Outlook.exe"

      Else IfExist, C:\Program Files (x86)\Microsoft Office\Office12\Outlook.exe

         Run, "C:\Program Files (x86)\Microsoft Office\Office12\Outlook.exe"

      Else IfExist, C:\Program Files\Microsoft Office\Office11\Outlook.exe

         Run, "C:\Program Files\Microsoft Office\Office11\Outlook.exe"

      Else IfExist, C:\Program Files (x86)\Microsoft Office\Office11\Outlook.exe

         Run, "C:\Program Files (x86)\Microsoft Office\Office11\Outlook.exe"

      Return

   }

Return
```
