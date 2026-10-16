---
title: "SublimeCycleWhiteSpace (week #19)"
date: "2013-05-07"
summary: "Cycle's through Sublime Text's three options for displaying white space: none, selection, and all. Many thanks to skuroda for his extremely helpful comment on Stack Overflow. Check out the MIT-licensed source code on GitHub. Features…"
topics: ["Application of the Week 2013","sublimeText"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/05/sublimecyclewhitespace-week-19.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-6800084294117483783"
---

Cycle's through Sublime Text's three options for displaying white space: none, selection, and all.

Many thanks to [skuroda](http://stackoverflow.com/users/1852931/skuroda) for his extremely helpful comment on [Stack Overflow](http://stackoverflow.com/questions/18496991/i-cant-get-this-to-work-in-sublime-text-3-i-am-trying-to-alternate-a-settin).

Check out the MIT-licensed source code on [GitHub](https://github.com/kodybrown/SublimeCycleWhiteSpace).

### Features

-   Configure which options to cycle through in the settings.

### Installation

Clone into your sublime packages directory.

Sorry, I haven't even looked at using [Package Control](https://github.com/wbond/sublime_package_control/) yet.

### Configuration

##### CycleThroughWhitespace.sublime-settings

Turn each option on or off here. If you want to alternate all three view options from your shortcut key, then set each to true. If you only want to alternate between selection and all, set only those two properties to true.

```json
{
    "cycle_whitespace_none": true,
    "cycle_whitespace_selection": true,
    "cycle_whitespace_all": true
}
```

  

##### Default (Windows).sublime-keymap

  

My default key bindings mirror that of Visual Studio. Feel free to change it to whatever you want.

```text
[
    { "keys": ["ctrl+r", "ctrl+w"], "command": "cycle_through_whitespace" }
]
```
