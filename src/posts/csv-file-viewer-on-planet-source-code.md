---
title: "CSV File Viewer on Planet Source Code"
date: "2002-05-30"
summary: "A small Visual Basic utility for the hundreds of CSV files we work with every day, now shared on Planet Source Code."
topics: ["Development", "Visual Basic", "CSV", "Utilities"]
---

We work with hundreds of small CSV files every day. Opening them quickly, checking their contents, and moving on is a surprisingly large part of the job.

I wrote a little read-only application called **CSV File Viewer**, (with “Bricksoft Viewer” in the title). It loads quickly and leaves the dates as they appear in the file. Excel’s automatic date formatting can be frustrating when all I want to do is see what a file actually contains.

The viewer has its own CSV parser to handle commas and double quotes inside fields and keep track of where each record ends. I also spent time on the small conveniences, including remembering the window’s position and handling a window that was closed while maximized.

There’s a configurable maximum number of lines to load, too. That helps keep larger files manageable on the slower machines at work.

<figure style="margin: 1.5rem 0;">
  <a href="/assets/blog/csv-file-viewer/bricksoft-viewer.png"><img src="/assets/blog/csv-file-viewer/bricksoft-viewer.png" alt="Bricksoft Viewer displaying a CSV file, with its File menu open." width="490" height="307" loading="lazy"></a>
  <figcaption>The screenshot from my Planet Source Code submission.</figcaption>
</figure>

I’ve shared the Visual Basic 6 source on Planet Source Code. If you spend much of your day opening CSV files, give it a try and let me know what you think.

[CSV File Viewer: original Planet Source Code submission](http://www.planetsourcecode.com/vb/scripts/ShowCode.asp?txtCodeId=35268&lngWId=1)

## Update — November 11, 2026

This little viewer became an everyday tool for our whole team at Knightsbridge. We used it constantly, all day, every day. I also received quite a few emails from people who found it online and started using it themselves. It’s fun to remember how much use came out of such a small utility.

Planet Source Code is now gone, but the Planet Source Code archive on GitHub preserves the submission, screenshot, and source.

[CSV File Viewer in the Planet Source Code GitHub archive](https://github.com/Planet-Source-Code/kody-brown-csv-file-viewer__1-35268)
