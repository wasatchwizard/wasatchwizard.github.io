---
title: "Collapse folders and projects in Visual Studio"
date: "2009-07-16"
summary: "I consider the PowerCommands for Visual Studio 2008 invaluable. And, the collapse all feature is certainly one of my most used features. However, if a solution folder is already collapsed, the projects underneath are skipped. So, I…"
topics: ["Development","Visual Studio"]
originalUrl: "https://elegantdevelopment.blogspot.com/2009/07/collapse-folders-and-projects-in-visual.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-1530961070604295072"
---

I consider the [PowerCommands for Visual Studio 2008](http://code.msdn.microsoft.com/PowerCommands) invaluable. And, the collapse all feature is certainly one of my most used features. However, if a solution folder is already collapsed, the projects underneath are skipped.

So, I found a great macro for collapsing all solution folders and their projects, regardless of whether or not the parent solution folder(s) are open or closed.

[Visual Studio 2005 Collapse All Macro](http://geekswithblogs.net/scottkuhl/archive/2007/04/09/111195.aspx)

_(yes, it works for Visual Studio 2008, what I primarily use)_

For convenience, here is the macro source code:

```vbnet
    Sub CollapseAll()

        ' Get the the Solution Explorer tree
        Dim solutionExplorer As UIHierarchy
        solutionExplorer = DTE.Windows.Item(Constants.vsext_wk_SProjectWindow).Object()

        ' Check if there is any open solution
        If (solutionExplorer.UIHierarchyItems.Count = 0) Then
            Return
        End If

        ' Get the top node (the name of the solution)
        Dim rootNode As UIHierarchyItem = solutionExplorer.UIHierarchyItems.Item(1)
        rootNode.DTE.SuppressUI = True

        ' Collapse each project node
        Collapse(rootNode, solutionExplorer)

        ' Select the solution node, or else when you click 
        ' on the solution window
        ' scrollbar, it will synchronize the open document 
        ' with the tree and pop
        ' out the corresponding node which is probably not what you want.

        rootNode.Select(vsUISelectionType.vsUISelectionTypeSelect)
        rootNode.DTE.SuppressUI = False

    End Sub

    Private Sub Collapse(ByVal item As UIHierarchyItem, ByRef solutionExplorer As UIHierarchy)

        For Each innerItem As UIHierarchyItem In item.UIHierarchyItems
            If innerItem.UIHierarchyItems.Count > 0 Then

                ' Re-cursive call
                Collapse(innerItem, solutionExplorer)

                ' Collapse
                If innerItem.UIHierarchyItems.Expanded Then
                    innerItem.UIHierarchyItems.Expanded = False
                    If innerItem.UIHierarchyItems.Expanded = True Then
                        ' Bug in VS 2005
                        innerItem.Select(vsUISelectionType.vsUISelectionTypeSelect)
                        solutionExplorer.DoDefaultAction()
                    End If
                End If

            End If
        Next

    End Sub
```
