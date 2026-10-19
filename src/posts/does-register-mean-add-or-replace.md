---
title: "Does ‘Register’ Mean Add—or Replace?"
date: "2021-04-21"
summary: "Customers were told they could add devices with successive registration calls. The implementation replaced the previous set. That difference belongs in the instructions and the tests."
topics: ["Development", "APIs", "Testing", "Documentation"]
---

The customer followed the instructions. The instructions described a different program.

That is what made a recent investigation into a small SignalR client so frustrating. We had told the customer they could make additional registration calls to add devices without changing the devices they had already registered.

The behavior I found was different. A registration replaced the existing set with the devices supplied in that call. Devices left out of the new request were no longer registered.

That is a substantial difference to hide behind the word “register.”

Here is an invented example. These letters are stand-ins, not customer device identifiers:

| Request | Expected active devices | Actual active devices |
| --- | --- | --- |
| Register A and B | A, B | A, B |
| Register C | A, B, C | C |
| Register A, B, and C together | A, B, C | A, B, C |

For this implementation, the working procedure was to submit the complete desired device set together. Sending only the additional devices replaced the earlier registrations.

This was behavior of our particular client/backend arrangement. It is not a general rule that SignalR registration calls replace one another.

It took time to separate what the software actually did from what we had been saying it did. That time could have been spent much more usefully if the contract had been clear from the beginning.

There is nothing inherently wrong with an operation that replaces the whole set. Sometimes that is exactly the interface you want. An operation that adds devices can also be useful.

They need different instructions.

If a request means “make this the complete active set,” say so. State what happens to omitted devices. Explain whether an empty set clears the registrations, what survives a reconnect, and how the caller can verify the current state. Where those details haven’t been established, investigate them before making promises.

I also want tests that exercise more than the first successful request. The first row in that table looks correct under either interpretation. The second row is where the contract becomes visible.

Register a set, make another call, and check what remains active. Test both retained and omitted devices. Check the resulting behavior, not just whether the registration method returned without an error.

And when we give a customer a sample client or a set of commands, run the documented sequence against the actual implementation. A sample is only useful if it demonstrates the behavior we are telling them to rely on.

I’m leaving the original commands, account details, and logs out of this post. The example above is enough to explain the problem.

Clear instructions are part of making an integration work. Accurate instructions start with checking that the software behaves the way we think it does.
