---
title: "tcmd-plugins"
summary: ""
screenshot: ""
hidden: false
github:
  id: 17306015
  repository: "kodybrown/tcmd-plugins"
  url: "https://github.com/kodybrown/tcmd-plugins"
  description: "Total Commander plugins and scripts, including a Lister viewer for Windows shortcut (.lnk) properties."
  pushedAt: "2026-10-16T20:43:39Z"
  language: "Visual Basic .NET"
  archived: false
  readmeUrl: "https://github.com/kodybrown/tcmd-plugins/blob/master/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/tcmd-plugins/master/README.md"
---


Total Commander plugins and scripts, currently featuring a Lister viewer for
Windows shortcut (.lnk) properties.

## Contents

| Path | Purpose |
| --- | --- |
| [`shortcuts_vbs/shortcuts.vb`](shortcuts_vbs/shortcuts.vb) | VBScript that reads a Windows shortcut and formats its properties for display. |
| [`shortcuts_vbs/shortcuts.wlx`](shortcuts_vbs/shortcuts.wlx) | Bundled 32-bit Lister plugin that hosts the script; a renamed copy of Ivan / Atlanoff's `wlx_vbscript` loader, version `0.5.1.0`. |
| [`LICENSE`](LICENSE) | MIT license for Kody Brown's work in this repository. |

`shortcuts_vbs` is the only plugin directory currently included. There is no
installer, build project, automated test suite, or source code for the bundled
third-party loader.

## What is `shortcuts_vbs`?

It lets you inspect a Windows `.lnk` shortcut's settings in Total Commander's
Lister viewer. This is useful when you want to see what a shortcut points to,
including command-line arguments and its starting directory.

The script displays these properties:

- Target path
- Arguments
- Working directory
- Hotkey
- Window style, labeled Normal, Minimized, or Maximized
- Icon location
- Description

Illustrative output, with values depending on the selected shortcut:

```text
 Target Path       = C:\Tools\Example\example.exe
 Arguments         = --verbose

 Working Directory = C:\Tools\Example

 Hotkey            = Ctrl+Alt+E
 Window Style      = Normal

 Icon Location     = C:\Tools\Example\example.exe,0

 Description:
 Launch Example with verbose output
```

The script uses `WScript.Shell.CreateShortcut(file_name)` to read the shortcut
and returns the formatted text through `result_text`. It does not call `Save`,
launch the target, or write an export file. Despite its `.vb` extension, this is
VBScript hosted by the plugin, rather than a Visual Basic .NET project or a
standalone command-line script.

## Requirements and manual setup

- Windows and **32-bit Total Commander**. The bundled `.wlx` binary is x86
  (PE machine type `0x014C`); no `.wlx64` binary is included.
- VBScript and the loader's Microsoft Script Control COM dependency must be
  available. These runtime components are not bundled in this repository.

Manual setup guidance below has not been verified in a running Total Commander
installation as part of this documentation update. Compatibility with current
Windows and Total Commander versions has not been established.

1. Copy the `shortcuts_vbs` directory to a permanent plugin location.
2. Keep `shortcuts.vb` beside `shortcuts.wlx`, preserving both filenames.
3. Register `shortcuts.wlx` as a **Lister (WLX)** plugin in Total Commander.
   See the [official Lister plugin installation instructions](https://www.ghisler.com/plugins.htm)
   under "How to install a lister plugin".
4. Restrict the plugin's detection rule to Windows shortcut files with
   `EXT="LNK"`. The script itself does not check the file extension.
5. Select a `.lnk` file and press **F3** to open Lister with plugins enabled.

There is no compilation step for the supplied script. Its display settings are
at the top of `shortcuts.vb`: Consolas, size 9, wrapping enabled, and both
scrollbars. Edit those values to customize the text view.

## Attribution and license

- `shortcuts.vb`: Copyright (C) 2013-2014 Kody Brown, released under the
  [MIT License](LICENSE).
- `shortcuts.wlx`: credited in the script header to Ivan aka Atlanoff
  (`atlanoff@yandex.ru`), originally named `wlx_vbscript.wlx` from
  `wlx_vbscript_0_5_1.zip`. No separate license documentation for this loader
  is included in the repository.
