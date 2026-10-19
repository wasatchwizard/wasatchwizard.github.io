---
title: "The Measurement Happened Before the Packet Arrived"
date: "2021-03-11"
summary: "A packet can contain an older sensor reading and information about its reception. Giving both the same timestamp can quietly change what the data means."
topics: ["Development", "Testing", "IoT"]
---

A timestamp can be perfectly valid and still describe the wrong event.

While working through sensor timestamp issues, I kept coming back to a distinction that is easy to lose in parsing code: when a measurement happened and when its packet was received are different questions.

Here is a deliberately invented example. These are not production values or our packet format.

| Event | Time |
| --- | --- |
| Receiver receives the packet | 12:00:00 |
| Measurement reported as 120 seconds old | 11:58:00 |
| Signal-strength observation for that reception | 12:00:00 |

The measurement belongs two minutes earlier. The signal-strength observation describes the reception event. Moving both to 11:58 would make the timestamps agree while making their meaning less accurate.

That is why a variable called something like `time` can conceal more than it explains.

If code adjusts that value while processing one field, what uses it next? Another measurement? The reception metadata? A record that was already created? Does the result depend on which field the parser happens to encounter first?

These are questions worth asking even when every resulting value looks like an ordinary date and time.

The lesson I took from this debugging work is to give each time an explicit meaning. Preserve the reception timestamp. Derive a measurement timestamp from the appropriate reference and the reported age. Keep those values attached to the events they describe.

In a real protocol, the reference for an age field needs to be established, too. Backend processing time, gateway reception time, and device transmission time are not automatically interchangeable. The arithmetic is only as good as the meaning of the value we subtract from.

I would want tests that make the distinction difficult to accidentally erase:

1. A delayed measurement keeps its historical timestamp.
2. Reception metadata keeps the timestamp for its own event.
3. Changing the order of independent fields doesn’t change their timestamps.
4. Multiple measurements with different ages don’t inherit one another’s adjusted time.

The screenshot in my private debugging notes is useful to me, but it contains implementation details that don’t belong in a public post. This invented example carries the lesson without reproducing that code or claiming to document the entire failure.

When a chart looks wrong, it is tempting to start with the chart or the query. Sometimes the more useful question is much earlier in the pipeline:

What, exactly, does this timestamp say happened?
