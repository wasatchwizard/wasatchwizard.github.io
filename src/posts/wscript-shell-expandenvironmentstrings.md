---
title: "WScript.Shell ExpandEnvironmentStrings"
date: "2005-08-18"
summary: "Many of you out there who’ve been developing for more than a few years might appreciate the value of Batch files. I still use them. I feel the same way about VBScript files (or JScript files if you prefer). More so, actually, because I…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/08/wscriptshell-expandenvironmentstrings.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113114434814718432"
---

Many of you out there who’ve been developing for more than a few years might appreciate the value of Batch files. I still use them. I feel the same way about VBScript files (or JScript files if you prefer). More so, actually, because I can do so much more right out of the box.  
  
Anyway, I was using the WScript.Shell object to automate some tasks and found an interesting thing I haven’t run into or perhaps just never noticed. When I get an environment variable using the ExpandEnvironmentStrings method, if the variable doesn’t exist it will return what you passed in to it.  
  

```text
Dim objShell : Set objShell = CreateObject("WScript.Shell")
MsgBox objShell.ExpandEnvironmentStrings("%MyPath%")
Set objShell = Nothing
```

If the `%MyPath%` environment variable exists on your machine it will show the value stored in the variable. (I ran into this running the same script on all versions of Windows.) If it doesn’t exist it will show `%MyPath%`. That was wreaking havoc on my little script.  
  
So, I just perform a simple check afterwards to verify the value exists.  
  

```text
Dim objShell : Set objShell = CreateObject("WScript.Shell")
Dim sValue
Dim sVarName

sVarName = "%MyPath%"
sValue = objShell.ExpandEnvironmentStrings(sVarName)

If sValue <> sVarName Then
   MsgBox sVarName & " = " & sValue
Else
   MsgBox sVarName & " does not exist"
End If

Set objShell = Nothing
```
