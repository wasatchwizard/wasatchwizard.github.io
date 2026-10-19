---
title: "A Time Tree for Sensor Readings"
date: "2021-03-08"
summary: "A short conversation about grouping sensor readings by year, month, and day helped unblock a graph-design problem. The useful part was finding a structure that fit the access pattern."
topics: ["Development", "Databases", "Neo4j", "IoT"]
---

Sometimes a design problem gets much easier once you change the shape of it.

We were discussing how to store a growing history of sensor readings in Neo4j. The concern was that attaching all that history directly to one node would leave it with an ever-growing number of relationships.

That is the sort of situation people describe as a super-node problem. A node has so many relationships that the queries or updates passing through it can become expensive. There isn’t a universal number where a node suddenly becomes bad; the workload matters. Neo4j’s [discussion of super-nodes](https://community.neo4j.com/t/graph-modeling-all-about-super-nodes/27464) explains that distinction.

My suggestion was to organize the readings through a calendar hierarchy: year, then month, then day.

Here is an illustrative branch for one sensor, using invented names:

```text
Sensor A
└── 2021
    └── March
        ├── 7
        │   └── Readings for that day
        └── 8
            └── Readings for that day
```

The idea is to stop one node from collecting a direct relationship to every reading across the entire history. Give the data some structure that matches how we want to find it.

Looking for readings in a particular period? Follow the relevant calendar branches. Another day’s readings get another bucket. The history keeps growing without all of that growth landing directly on the same node.

This is a time-tree pattern, not a new invention. Timeline trees are described in the [Graph Databases book, in its section on modeling time](https://go.neo4j.com/rs/710-RRC-335/images/Graph_Databases_2e_Neo4j.pdf). The useful contribution was recognizing how the pattern could help with the problem in front of us.

There is an important limit to the idea: a day bucket can still be large. In a made-up example, one reading per minute produces 1,440 readings per day. One per second produces 86,400. Sharing a day bucket across many sensors would increase that further.

So a calendar hierarchy doesn’t promise that every node will stay below some magic relationship count. Scope the buckets deliberately, consider the sampling rate, and test the queries. A different workload might need finer buckets or a different model altogether.

For the work we were discussing, the approach gave us a way forward while keeping the readings accessible and the queries useful. That isn’t a general benchmark claim; it is why the suggestion helped us.

At the time, I didn’t think much of the conversation. Someone asked a question, I suggested an approach, and we spent about half an hour walking through what I meant.

It was only later that a developer told me they had been wrestling with the issue for several days, close to a week.

That stuck with me. Experience can make a useful pattern seem obvious when it isn’t obvious to the person encountering the problem for the first time.

Sometimes the most useful contribution is a short conversation that changes how someone sees the problem.
