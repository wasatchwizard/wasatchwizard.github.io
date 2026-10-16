---
title: "Visual Studio 2008 Macro Fun"
date: "2009-09-18"
summary: "Here are a few macros that I use, that I thought might be of use to others. They should be fairly easy to set up in your environment. I’m always excited to hear about new macros and plugins and other time-saving functionality for Visual…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2009/09/visual-studio-2008-macro-fun.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-4523674407276598818"
---

Here are a few macros that I use, that I thought might be of use to others. They should be fairly easy to set up in your environment. I’m always excited to hear about new macros and plugins and other time-saving functionality for Visual Studio, so if you have any – please let me know!!

**Misc Built-in Macros**

Here are some basic macros that came with Visual Studio 2008 (and VS 2005) that are very useful and easily map to your favorite keyboard shortcut(s).

```text
Macros.Samples.Accessibility.IncreaseTextEditorFontSize
Macros.Samples.Accessibility.DecreaseTextEditorFontSize 
Macros.Samples.Accessibility.UpdateTextEditorFontSizeToMatchDisplayProperties 
Macros.Samples.Utilities.TurnOnLineNumbers 
Macros.Samples.Utilities.TurnOffLineNumbers 
Macros.Samples.VSEditor.BeginningOfFunction 
Macros.Samples.VSEditor.LineEmUp (Good for aligning variable assignments) 
Macros.Samples.DevStudio6Editor.AutoCompleteFromFile
```

  
  

**Format Source Code**

  
  

I map F2 to the standard Edit.FormatDocument command and Ctrl+F2 to the FormatCSharp macro method.

  
  

```vbnet
Public Sub FormatCSharp()

   Try
      ' Remove and sort using statements if PowerCommands is installed.
      DTE.ExecuteCommand("Edit.RemoveAndSort")
   Catch ex As Exception
      
   End Try

   Try
      DTE.ExecuteCommand("Macros.Samples.VSEditor.FixLineEnds")
   Catch ex As Exception
      Exit Sub
   End Try

   DTE.ExecuteCommand("Edit.FormatDocument")

End Sub
```

  
  

  
  

  
  

**Attach to IIS Worker Processes**

  
  

I map Ctrl+P to this macro, replacing the default Print Current Document shortcut.

  
  

```vbnet
Sub MacroAttachToAllWebProcesses() 
   Try 
      Dim dbg2 As EnvDTE80.Debugger2 = DTE.Debugger 
      Dim trans As EnvDTE80.Transport = dbg2.Transports.Item("Default") 
      Dim dbgeng(3) As EnvDTE80.Engine 

      dbgeng(0) = trans.Engines.Item("T-SQL") 
      dbgeng(1) = trans.Engines.Item("T-SQL") 
      dbgeng(2) = trans.Engines.Item("Managed") 

      ' Use . for local machine or type machine name 
      For Each theProcess As EnvDTE80.Process2 In dbg2.GetProcesses(trans, ".") 
         If theProcess.Name.Contains("aspnet_wp.exe") Or theProcess.Name.Contains("w3wp.exe") Then 
            theProcess.Attach2(dbgeng) 
         End If
      Next

   Catch ex As System.Exception 
      MsgBox(ex.Message) 
   End Try 

End Sub
```

  
  

**Solution Events**

  
  

```vbnet
' Automatically close all documents when the solution is closed.
Private Sub SolutionEvents_BeforeClosing() Handles SolutionEvents.BeforeClosing
   DTE.ExecuteCommand("Window.CloseAllDocuments")
End Sub
```

  
  

**Build Events**

  
  

```vbnet
' A project failed to compile, so cancel remaining and beep
Private Sub BuildEvents_OnBuildProjConfigDone(ByVal Project As String, ByVal ProjectConfig As String, ByVal Platform As String, ByVal SolutionConfig As String, ByVal Success As Boolean) Handles BuildEvents.OnBuildProjConfigDone
   If Success = False Then
      DTE.ExecuteCommand("Build.Cancel")
      ' System.Windows.Forms.MessageBox.Show("Build failed!")
      Beep()
      Threading.Thread.Sleep(500)
      Beep()
      Threading.Thread.Sleep(500)
      Beep()
      Threading.Thread.Sleep(500)
      Beep()
   End If
End Sub

' The build finished successfully
Private Sub BuildEvents_OnBuildDone(ByVal Scope As EnvDTE.vsBuildScope, ByVal Action As EnvDTE.vsBuildAction) Handles BuildEvents.OnBuildDone
   If (Not failed) Then
      ' System.Windows.Forms.MessageBox.Show("Build is complete!")
      Beep()
      Threading.Thread.Sleep(250)
      Beep()
   End If
End Sub
```
