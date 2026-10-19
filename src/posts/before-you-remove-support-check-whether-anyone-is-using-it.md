---
title: "Before You Remove Support, Check Whether Anyone Is Using It"
date: "2021-04-14"
summary: "Older devices were treated as unused even though readings were still arriving. Retirement decisions need usage evidence and a transition plan."
topics: ["Development", "IoT", "Maintenance"]
---

“Nobody uses those anymore” is a claim we can check.

When the devices are still sending data every day, it’s also a claim we can disprove.

That is the frustrating part of a recent problem with older sensor hardware. Support was removed on the assumption that those devices were no longer in use. Meanwhile, readings were still arriving from them.

The hardware was old. Its job wasn’t finished.

I want to be precise about what breaks in a situation like this. Receiving sensor readings, listing the devices, and making their data available through an API or dashboard are separate parts of the system. Data can continue arriving while a customer loses the supported way to find or retrieve it.

So “the devices still send data” doesn’t mean the customer’s workflow still works. It means we have another piece of evidence that should have informed the decision before we removed support.

The work around this issue included migration instructions and a compatibility path for existing API usage. That is where I would have preferred the discussion to begin: which customers and devices are affected, what they use today, and how we intend to get them to the next supported arrangement.

Retiring hardware can be a reasonable decision. Keeping every generation working forever has a cost, and there may be good reasons to move on.

But we need to make that decision with information about the installed devices. Look at recent readings. Check active customer usage. Ask the people supporting those customers. Find out which integrations depend on the behavior we are about to change.

If we don’t have that information, we have an unanswered question. We don’t have evidence that nobody is using the feature.

A transition also needs to account for the customer’s work. A device may be physically installed somewhere inconvenient. An integration may run unattended. Changing the database record or publishing a new endpoint doesn’t automatically update either one.

That is why I want an explicit plan: what is changing, who is affected, what they need to do, when the old behavior ends, and how we will know the transition worked.

The people using the product deserve accurate notice. The people maintaining it deserve a decision they can explain and carry out without discovering the active installations through support incidents.

What bothers me here is the avoidable assumption. The system already had evidence that these devices were still doing something useful.

Before we decide a piece of hardware is obsolete, let’s at least check whether someone is relying on it today.
