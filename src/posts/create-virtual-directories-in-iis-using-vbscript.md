---
title: "Create virtual directories in IIS using VBScript"
date: "2005-12-20"
summary: "I created a cool little utility recently that creates or removes a virtual directory in IIS by passing in the folder and name. It has saved me a lot of time already, just in the last few days by allowing me to drag a folder onto it.…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/12/create-virtual-directories-in-iis.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113514571105346361"
---

I created a cool little utility recently that creates or removes a virtual directory in IIS by passing in the folder and name. It has saved me a lot of time already, just in the last few days by allowing me to drag a folder onto it. When I drop a folder onto the script it will ask for the name of the virtual directory to create.  
  
What I thought was kind of cool is the LaunchItInCScript() method. You see, when you run a script file from within WScript.exe (which is default for Windows XP) you don’t have access to the WScript.StdOut, WScript.StdIn, and WScript.StdErr objects. Since, this is a build utility and I don’t want any message boxes during a build I only want to output the status to the console.  
  
The LaunchItInCScript() method will run the same script file via cscript.exe then close itself. This way I can double-click the script in Windows Explorer and it will automatically run it within cscript.exe, instead of WScript. (I know that I can change the Windows script host default from WScript.exe to cscript.exe, but for most utilities I prefer them to run in WScript.exe with a user-interface.)  
  

```vbnet

Sub CreateVDir(folderPath, virtualDirName)
  On Error Resume Next
  Dim objIIS
  Set objIIS = GetObject("IIS://localhost/W3SVC/1/Root")

  If Err.Number <> 0 Then
     WScript.StdOut.WriteLine "Could not connect to IIS. Is IIS installed?"
     Exit Sub
  End If
  On Error Goto 0

  On Error Resume Next
  Set oVirDir = objIIS.Create("IIsWebVirtualDir", virtualDirName)
  If Err.Number <> 0 Then
     ' most likely the vdir already exists.
     WScript.StdOut.WriteLine "Could not create the '" & virtualDirName & "' virtual directory. Does it already exist?"
     Exit Sub
  End If
  On Error Goto 0

  oVirDir.Path = folderPath
  oVirDir.SetInfo
  oVirDir.AuthAnonymous = True
  oVirDir.AccessWrite = False
  oVirDir.AccessRead = True
  oVirDir.AccessExecute = True
  oVirDir.AccessScript = True
  oVirDir.AppCreate True
  oVirDir.SetInfo

  WScript.StdOut.WriteLine "The '" & virtualDirName & "' virtual directory was created at '" & folderPath & "'."

  Set oVirDir = Nothing
  Set objIIS = Nothing
End Sub
```

  
  
I actually had one script file, but decided to simplify the code by making two separate files; `CreateVDir.vbs` and `DeleteVDir.vbs`. This script creates a virtual directory from the folder and name passed into it.  
  
Sub CreateVDir(folderPath, virtualDirName)  
On Error Resume Next  
Dim objIIS  
Set objIIS = GetObject("IIS://localhost/W3SVC/1/Root")  
  
If Err.Number \<\> 0 Then  
WScript.StdOut.WriteLine "Could not connect to IIS. Is IIS installed?"  
Exit Sub  
End If  
On Error Goto 0  
  
On Error Resume Next  
Set oVirDir = objIIS.Create("IIsWebVirtualDir", virtualDirName)  
If Err.Number \<\> 0 Then  
' most likely the vdir already exists.  
WScript.StdOut.WriteLine "Could not create the '" & virtualDirName & "' virtual directory. Does it already exist?"  
Exit Sub  
End If  
On Error Goto 0  
  
oVirDir.Path = folderPath  
oVirDir.SetInfo  
oVirDir.AuthAnonymous = True  
oVirDir.AccessWrite = False  
oVirDir.AccessRead = True  
oVirDir.AccessExecute = True  
oVirDir.AccessScript = True  
oVirDir.AppCreate True  
oVirDir.SetInfo  
  
WScript.StdOut.WriteLine "The '" & virtualDirName & "' virtual directory was created at '" & folderPath & "'."  
  
Set oVirDir = Nothing  
Set objIIS = Nothing  
End Sub  
  
The `DeleteVDir.vbs` calls either of the two following methods based on whether or not the argument passed in is recognized as a folder. If it is recognized as a folder it calls `DeleteVDirPath()`, otherwise it calls `DeleteVDir()`.  
  
Function DeleteVDirPath(parent, virtualDirPath)  
Dim bRet : bRet = False  
Dim ChildObject  
Dim ChildObjectName  
Dim subName  
Dim obj  
  
On Error Resume Next  
Dim objIIS  
Set objIIS = GetObject(parent) ' "IIS://localhost/W3SVC/1/Root"  
  
If Err.Number \<\> 0 Then  
WScript.StdOut.WriteLine parent & vbCrLf & "Could not connect to IIS. Is IIS installed?"  
WScript.Quit  
End If  
On Error Goto 0  
  
For Each ChildObject In objIIS  
If Err.number \<\> 0 Then  
Err.Clear  
End If  
  
If ChildObject.Class = "IIsWebVirtualDir" Then ' Or ChildObject.Class = "IIsWebDirectory"  
ChildObjectName = Right(ChildObject.AdsPath, Len(ChildObject.AdsPath) - InStrRev(ChildObject.AdsPath, "Root") - 4)  
subName = Right(ChildObjectName, Len(ChildObjectName) - InStrRev(ChildObjectName, "/"))  
  
If CStr(ChildObject.Path) = virtualDirPath Then  
On Error Resume Next  
objIIS.Delete "IIsWebVirtualDir", subName  
If Err.Number \<\> 0 Then  
WScript.StdOut.WriteLine "Could not delete '" & virtualDirName & "'"  
bRet = False  
Exit For  
Else  
WScript.StdOut.WriteLine "The '" & virtualDirPath & "' virtual directory has been removed."  
bRet = True  
Exit For  
End If  
On Error Goto 0  
End If  
  
If DeleteVDirPath(parent & "/" & subName, virtualDirPath) Then  
bRet = True  
Exit For  
End If  
End If  
Next  
  
DeleteVDirPath = bRet  
  
Set objIIS = Nothing  
End Function
