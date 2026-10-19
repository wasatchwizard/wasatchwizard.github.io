---
title: "Your Testers Need a Reset Button"
date: "2021-02-23"
summary: "If a tester needs a developer to clear database state before the next test, that waiting time belongs on the engineering bill. Repeatable setup deserves deliberate tooling."
topics: ["Development", "Testing", "Databases"]
---

If your tester needs a developer to delete accounts before they can run the next test, that waiting time belongs on the engineering bill.

It’s easy to overlook. The request sounds small: clear these users, remove those records, put the environment back into a state where the test can run again.

Someone who knows the database writes a script. The tester gets unblocked. Everyone moves on.

Until the next time.

My notes this month include requests to clear test accounts, investigate incomplete deletion, expand lifecycle tests, and improve a tool for mirroring data into a test environment. Those are different tasks, but together they keep bringing me back to the same question: how much effort does it take to get ready to test our software?

That preparation is part of the work. We should design it that way.

Creating an account once is a different test from creating one, using it, deleting it, and trying again. If the second attempt encounters state the first attempt left behind, we need to understand why. Perhaps the cleanup is incomplete. Perhaps some information is intentionally retained. Perhaps the test assumes a clean slate the product never promised.

Whatever the answer, “ask the person who knows the database” is a fragile way to make the next run possible.

A reset button doesn’t have to be a literal button. It could be a script, a command, or an environment we can recreate. What I want is a defined way to return a test scenario to a known starting point without requiring someone to reconstruct the procedure from memory.

That means deciding what the starting point actually is. Which users exist? Which records belong to the scenario? What should be preserved? What result confirms that the reset finished?

It also means keeping the operation bounded. A test reset should know which test environment and data it owns. A command that deletes whatever happens to match a vague query is another incident waiting for its turn.

There are two separate problems here. A product’s delete operation needs to honor its contract. A test environment needs repeatable setup and cleanup. A reset tool shouldn’t hide a broken delete operation, and a working delete operation won’t necessarily recreate every fixture a test needs.

Both deserve attention.

Realistic data matters too. The data-mirroring work in my notes reflects a need to exercise more complete scenarios. But copying data and preparing a useful test case are different jobs. I want deliberate, appropriately sanitized datasets with enough structure to exercise the behavior under test, and a way to restore them when we need to repeat an experiment.

None of this requires a grand new testing platform. Start with the cleanup request that keeps coming back. Make its scope explicit. Make the procedure repeatable. Document how to run it and how to tell whether it worked.

Then let the people doing the testing use it without waiting for the one developer who remembers the necessary steps.

I’m not claiming we’ve solved that entire workflow. These recurring requests are a reason to make it a priority.

We count the time spent fixing a bug. We should also count the time spent arranging the conditions to find it, verify the fix, and test it again tomorrow.

Our testers already have a job. Waiting for us to clear the runway shouldn’t have to be part of it.
