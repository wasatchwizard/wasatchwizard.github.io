---
title: "When the Fix Brings Back the Problem"
date: "2020-01-04"
summary: "Reverting a change can feel safer than understanding it. But familiar code can bring an old problem back, and leave someone else doing the cleanup again."
topics: ["Development", "Maintenance", "Teamwork"]
---

There is a particular kind of frustration that comes from watching a fix undo the work that made something correct.

Something breaks. Someone finds a recent change, replaces it with the older code, and calls the issue fixed. The immediate symptom goes away. Unfortunately, the reason for the newer code still exists.

Now the old problem is back, and there is another round of cleanup to do.

I ran into this recently. As I understood it, the newer behavior needed a supporting data update. That update had not been completed. Instead of completing it, the response was to restore the previous behavior.

From where I sat, we had moved backward. We had already discussed the missing prerequisite, which made the decision especially frustrating.

Why do people do that?

I can’t tell you what anyone else was thinking. But I can see why this kind of decision is tempting. Old code is familiar. A rollback is concrete. Investigating why a change was made takes time, and sometimes it means asking someone for context while everyone is waiting for the problem to go away.

Under pressure, “this worked before” can become a substitute for “this is still correct.”

Those are different claims. Requirements change. Data changes. The conditions that made the old implementation work may no longer exist.

A rollback can still be the right immediate response. If something important is broken, restoring service may need to come first. But that leaves a question to answer: what did we just bring back, and who is going to follow through?

What wears me down is when that question disappears as soon as the immediate symptom does.

Before removing a change you don’t understand, find out why it exists. Read the explanation. Ask the person who made it. Check whether something it depends on was left unfinished. You can disagree with the implementation after understanding the constraint it was trying to satisfy.

That conversation is usually cheaper than another cycle of rediscovering the same problem.

There is a part of this I need to own, too. I knew the supporting update was needed. I had communicated it, but I hadn’t completed it or made sure someone else had taken responsibility for it. I was exhausted, and I let the handoff remain unfinished.

Communicating a dependency doesn’t make it happen. Someone needs to own it, and the work needs to remain visibly incomplete until it is done.

That doesn’t make an uninformed reversal a good fix. It does mean there was more than one opportunity to prevent the situation.

The deeper frustration is the repetition. When you spend your time repairing decisions you warned about, while more decisions arrive for you to repair later, it gets harder to approach the next incident with patience. Eventually, even a small problem carries the weight of all the previous ones.

That is a sign the way the work is being handled needs attention. One person’s memory, availability, and willingness to keep cleaning things up are a fragile foundation for a team.

I want room for people to try ideas and make mistakes. I also want us to understand the work we undo, finish the prerequisites we agree on, and share responsibility for the consequences.

Before calling something fixed, please check whether we have brought back the reason it was changed in the first place.
