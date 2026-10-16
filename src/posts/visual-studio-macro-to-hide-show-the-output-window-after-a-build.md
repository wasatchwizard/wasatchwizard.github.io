---
title: "Visual Studio macro to hide/show the Output window after a build…"
date: "2011-06-24"
summary: "A Visual Studio macro that shows build failures and hides the Output window after a successful build."
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2011/06/visual-studio-macro-to-hideshow-output.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-5612619033480411083"
---

I do not like the behaviors allowed in Visual Studio regarding showing the Errors List and Output window during a build. So, I finally created a macro to get the exact behavior I want.. And, I love it!

First off, you need to turn off two options in Visual Studio settings, under `Projects and Solutions` | `General`.

Un-check the following:

-   Always show Error List if build finishes with errors
-   Show Output window when build starts

The script does the following:

1.  When a build starts it (optionally) shows the Output window (line #9).
2.  When an individual project is finished compiling, notify the user (line #22) and (optionally) stop building any further projects (line #25).
3.  When the entire build has finished and one or more projects failed, display the Output window (line #35). If there were no failures, show and then hide the Output window (line #38) and notify the user.

Note: When the build finishes successfully, the reason I show and then hide the Output window, is because it may already be open and I want to be sure I close it. So far, I haven’t found an easy way to close the Output window, when it may or may not have focus in the Visual Studio IDE. As it is, I only rarely see it flicker open then closed. If you have any ideas, please let me know at [kody@bricksoft.com](mailto:kody@bricksoft.com)!

Read the comments in the code below for details on how its done!

```vbnet
Private BuildFailed As Boolean = False

' The build has started.
' Could be one or more projects or the whole solution.
Private Sub BuildEvents_OnBuildBegin() 
        Handles BuildEvents.OnBuildBegin
    ' Reset the global flag.
    BuildFailed = False

    ' Optionally, show the Output window.
    'DTE.ExecuteCommand("View.Output")
End Sub

' The current project has finished building.
Private Sub BuildEvents_OnBuildProjConfigDone(
        ByVal Project As String, ByVal ProjectConfig As String, _
        ByVal Platform As String, ByVal SolutionConfig As String, _
        ByVal Success As Boolean) _
        Handles BuildEvents.OnBuildProjConfigDone
    If (Not Success) Then
        ' Set the global flag.
        BuildFailed = True

        ' Notify the user the build failed.
        NotifySuccess(False)

        ' Optionally, you can cancel any further project builds.
        'DTE.ExecuteCommand("Build.Cancel")
    End If
End Sub

' The build is finished. Show or hide the Output window based on 
' whether it was successful or not.
Private Sub BuildEvents_OnBuildDone(
        ByVal Scope As EnvDTE.vsBuildScope, _
        ByVal Action As EnvDTE.vsBuildAction) _
        Handles BuildEvents.OnBuildDone
    If BuildFailed Then
        ' Show the output window.
        DTE.ExecuteCommand("View.Output")
    Else
        ' The build succeeded, so hide the Output window.
        DTE.ExecuteCommand("View.Output")
        DTE.ExecuteCommand("Window.CloseToolWindow")

        ' Notify the user the build finished successfully.
        NotifySuccess(True)
    End If
End Sub

Private Sub NotifySuccess(ByVal Success As Boolean)
    If Success Then
        Beep()
        Threading.Thread.Sleep(250)
        Beep()
    Else
        Beep()
        Threading.Thread.Sleep(250)
        Beep()
        Threading.Thread.Sleep(250)
        Beep()
        Threading.Thread.Sleep(250)
        Beep()
    End If
End Sub
```
