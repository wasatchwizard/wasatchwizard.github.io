---
title: "facs (week #16)"
date: "2013-04-16"
summary: "This simple utility displays the file averages, counts, and sizes - provides a nice summary of the files sizes in the current directory (and sub-directories). Check out the source code on GitHub! Creates output like the following:"
topics: ["Application of the Week 2013","CLI"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/11/app-of-week-16-facsexe.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-7362034892880702259"
---

This simple utility displays the file averages, counts, and sizes - provides a nice summary of the files sizes in the current directory (and sub-directories).

Check out the source code on [**GitHub**](https://github.com/kodybrown/facs)!

Creates output like the following:

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ facs.exe - displays file averages, counts, and sizes for the current       │
│            directory and all sub-directories.                              │
│                                                                            │
│ Directory: C:\ExamplePath                                                  │
├────────────┬────────────┬────────────┬──────────────────┬──────────────────┤
│    from kb │      to kb │  num files │         total kb │       average kb │
├────────────┼────────────┼────────────┼──────────────────┼──────────────────┤
│          0 │          1 │      1,599 │           612.52 │             0.38 │
│          1 │          2 │        815 │         1,180.66 │             1.45 │
│          2 │          4 │        952 │         2,700.11 │             2.84 │
│          4 │          8 │        917 │         5,200.96 │             5.67 │
│          8 │         16 │        926 │        10,748.68 │            11.61 │
│         16 │         32 │        929 │        21,000.26 │            22.60 │
│         32 │         64 │        534 │        23,428.11 │            43.87 │
│         64 │        128 │        409 │        37,028.81 │            90.53 │
│        128 │        256 │        290 │        51,613.45 │           177.98 │
│        256 │        512 │        191 │        69,727.30 │           365.06 │
│        512 │      1,024 │        116 │        82,273.15 │           709.25 │
│      1,024 │      4,096 │         70 │       129,267.68 │         1,846.68 │
│      4,096 │      8,192 │          7 │        41,408.85 │         5,915.55 │
│      8,192 │     16,384 │          2 │        22,227.86 │        11,113.93 │
│     16,384 │     32,768 │            │                  │                  │
│     32,768 │     65,536 │            │                  │                  │
│     65,536 │    131,072 │            │                  │                  │
│    131,072 │    262,144 │            │                  │                  │
│    262,144 │    524,288 │            │                  │                  │
│    524,288 │  1,048,576 │            │                  │                  │
│  1,048,576 │     and up │            │                  │                  │
├────────────┴────────────┼────────────┼──────────────────┼──────────────────┤
│                  totals │      7,757 │       498,418.40 │            64.25 │
└─────────────────────────┴────────────┴──────────────────┴──────────────────┘
```
