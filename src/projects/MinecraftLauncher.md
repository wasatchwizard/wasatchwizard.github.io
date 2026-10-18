---
title: "MinecraftLauncher"
summary: ""
screenshot: ""
hidden: false
github:
  id: 7453128
  repository: "kodybrown/MinecraftLauncher"
  url: "https://github.com/kodybrown/MinecraftLauncher"
  description: "Provides a simple interface to launch multiple Minecraft installations"
  pushedAt: "2013-01-06T04:40:37Z"
  language: "C#"
  archived: false
  readmeUrl: "https://github.com/kodybrown/MinecraftLauncher/blob/master/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/MinecraftLauncher/master/README.md"
---


Provides a simple interface to launch multiple Minecraft installations. It also allows the user to Rename, Copy, Delete, and Hide client installations.

The launcher reads client directories from its current directory and lists them for the user to choose. Once chosen a junction point is created in the %AppData%\.minecraft directory pointing to the chosen client version and Minecraft is executed from its normal location.

Setup
-----
The process is pretty simple and straight-forward.

* Create a new directory to hold all of the minecraft client versions. I use 'C:\Minecraft' but you (should be able to) use whatever you like.
* Move your %AppData%\.minecraft directory into 'C:\Minecraft'
* Rename the .minecraft directory to '\x.y.z-default' replacing the x, y, and z with your minecraft's version info. You can also change 'default' to whatever you want, for instance 'cc,gravgun,ic2,etc.' to indicate the mods that are applied.
* Place the MinecraftLauncher.exe and/or mcli.exe in the 'C:\Minecraft' directory.

The MinecraftLauncher.exe is a Windows Forms application that looks a little nicer than the mcli.exe, which is a command-line equivalent for those who prefer the CLI. They both behave the same way.

In order to Rename, Copy, or Remove clients in the WinForms version, right click the button. In the CLI version, type the command in, instead of the number. For instance, 'rename', 'copy', 'delete', and 'hide'.

You can create as many client versions and mod configurations you want. There are no limits. (Technically, you can create up to 65000 give or take...)

