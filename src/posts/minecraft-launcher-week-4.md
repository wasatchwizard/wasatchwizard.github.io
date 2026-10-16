---
title: "Minecraft Launcher (week #4)"
date: "2013-01-22"
summary: "Provides a simple interface to launch multiple Minecraft installations. It also allows the user to Rename, Copy, Delete, and Hide client installations. The launcher reads client directories from its current directory and lists them for…"
topics: ["Application of the Week 2013","Minecraft"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/01/app-of-week-2013-week-4-minecraft.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-2239041486454999664"
---

Provides a simple interface to launch multiple Minecraft installations. It also allows the user to Rename, Copy, Delete, and Hide client installations.

The launcher reads client directories from its current directory and lists them for the user to choose. Once chosen a junction point is created in the %AppData%\\.minecraft directory pointing to the chosen client version and Minecraft is executed from its normal location. NO changes are made, nor needed, in Minecraft itself.

Check out the [**Minecraft Launcher home page**](http://minecraft.wasatchwizard.com/minecraft-launcher.php) for downloads and screenshots!  
Check out the source code on [**GitHub**](https://github.com/kodybrown/MinecraftLauncher)!

#### Setup

The process is pretty straight forward.

-   Create a new directory to hold all of the Minecraft client versions. I use 'C:\\Minecraft' but you (should be able to) use whatever you like.The process is pretty simple and straight-forward.
-   Move your %AppData%\\.minecraft directory into 'C:\\Minecraft'
-   Rename the .minecraft directory to '\\x.y.z-default' replacing the x, y, and z with your minecraft's version info. You can also change 'default' to whatever you want, for instance 'cc,gravgun,ic2,etc.' to indicate the mods that are applied. Basically name it to anything you want that would distinguish it from other versions.
-   Place the MinecraftLauncher.exe and/or mcli.exe in the 'C:\\Minecraft' directory.

The `MinecraftLauncher.exe` is a Windows Forms application that looks a little nicer than `mcli.exe`, which is a command-line equivalent for those who prefer the CLI. They both behave the same way.

In order to Rename, Copy, or Remove clients in the WinForms version, right click the button. In the CLI version, type the command in, instead of the number. For instance, 'rename', 'copy', 'delete', and 'hide'.

You can create as many client versions and mod configurations you want. There are no limits other than disk space. (Technically, you can create up to 65534 give or take...)

Minecraft Launcher and associated files are released under the MIT License, see LICENSE.txt for details.
