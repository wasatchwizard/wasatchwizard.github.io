---
title: "A Shortcut to Comparing These Two Directories"
date: "2001-06-18"
summary: "I want a small directory-comparison tool with saved pairs: click a shortcut, see the files and timestamps on both sides, and choose what needs copying."
topics: ["Development", "Utilities", "File Management"]
---

I have an idea for a small tool: show two directories next to each other, let me compare the file dates and times, and give me a way to copy newer files over older ones.

Windows Commander already has a directory comparison. What I want is a narrower tool with a particularly convenient way to return to a comparison I use repeatedly.

Let me save the pair.

One shortcut could open the comparison for compiled class files. Another could open the JSP directories. I shouldn’t have to navigate both sides into place every time I want to check the same locations.

That detail feels especially useful after [finding that previously fixed code hadn’t reached the test server](/blog/the-fix-was-correct-the-deployed-files-werent/). Knowing which files differ should be easy enough that I actually check before making assumptions about what is deployed.

The workflow I have in mind is simple:

1. Open a saved pair of directories.
2. See the filenames and timestamps on both sides.
3. Choose which newer files to copy.

I’m describing an idea here, not announcing that I’ve finished the program. The part I particularly want is the saved comparison: a direct route back to a small, recurring job.

I like utilities that remove the setup around a task as well as the task itself. Selecting the same folders over and over isn’t difficult, but it is another sequence of actions I could avoid.

Sometimes I only want one feature, ready to use where I left it.
