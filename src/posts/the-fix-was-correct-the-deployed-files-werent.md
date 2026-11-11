---
title: "The Fix Was Correct. The Deployed Files Weren’t."
date: "2001-06-18"
summary: "Several fixed bugs appeared to be back. Before changing the code again, I checked which JSP and compiled class files were actually on the test server."
topics: ["Development", "Java", "Deployment"]
---

Before fixing the same bug twice, check whether the first fix ever reached the machine being tested.

That was the lesson this morning. A tester reported that several things I had already fixed were no longer working. It sounded like the changes had somehow stopped doing their job.

I checked the files on WebSphere. The compiled classes hadn’t been updated with the previous round of fixes.

I updated the class files along with the JSP. Before treating the report as a new code problem, we needed to test the code I had actually changed.

It is an easy distinction to lose when a page and the classes behind it are separate files. Updating the visible page doesn’t necessarily update everything it calls. Having the right source on my machine doesn’t establish what is running on another one.

The tester sees the application’s behavior. I see the fix in the editor. Both observations can be accurate while referring to different versions of the software.

That is why I want the deployed files to be part of the investigation from the beginning. Which version is on the server? Did all the related files get copied? Are we testing the same environment?

Those questions can save a lot of time spent explaining a result the new code never produced.

It also got me thinking about [a smaller tool for repeatedly comparing the same two directories](/blog/a-shortcut-to-comparing-these-two-directories/). Something that makes the differences visible before I assume a copy operation included everything it needed to.

The first thing to verify in a bug report isn’t always the algorithm. Sometimes it’s whether the algorithm you’re looking at is the one being tested.
