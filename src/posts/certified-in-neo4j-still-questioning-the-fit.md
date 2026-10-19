---
title: "Certified in Neo4j, Still Questioning the Fit"
date: "2021-03-30"
summary: "We’re moving forward with Neo4j despite my objections. I got certified, and I’ll do my best to make the migration succeed. My concerns about the workload still stand."
topics: ["Development", "Architecture", "Databases", "IoT"]
---

Well, we’re doing it. Despite my objections, we’re moving forward with Neo4j for the backend.

So I went and got certified.

<figure style="margin: 1.5rem 0;">
  <a href="/assets/blog/certified-in-neo4j-still-questioning-the-fit/neo4j-certified-professional.png">
    <img src="/assets/blog/certified-in-neo4j-still-questioning-the-fit/neo4j-certified-professional.png" alt="Neo4j Certified Professional certificate presented to Kody Brown, dated March 30, 2021, with a score of 92 percent" width="1286" height="915">
  </a>
  <figcaption>Neo4j Certified Professional, March 30, 2021. Score: 92%. Select the certificate to view it at full size.</figcaption>
</figure>

Partly because the others were working through it, partly because I enjoy learning something new, and partly because it seemed like a worthwhile challenge. Apparently, even an architecture disagreement can turn into homework.

There was another reason, too. I felt pressure to demonstrate that I was supporting the team. I didn’t want my objections to the decision to be interpreted by leadership as an unwillingness to do the work.

That is an uncomfortable reason to take a certification exam. But it was part of what I was thinking.

To be clear, I don’t hate Neo4j. From what I’ve seen, it looks like a mature, capable graph database. I can appreciate the product and enjoy learning it while still questioning our decision to adopt it.

My objection has been about fit.

I’ve [already written about the case I wanted to see before replacing our PostgreSQL measurement store](/blog/before-you-replace-postgresql-show-me-the-workload/). Our workload involves device readings over time, ingestion, historical queries, and reporting. I still don’t believe we’ve established that a graph database is the right primary home for that data.

Completing a certification doesn’t answer that question. It tells me I’ve met the requirements of the exam. It doesn’t benchmark our queries, establish our operating costs, or demonstrate that the migration is worth the work.

It also doesn’t mean my alternative wins automatically. If I want us to stay with PostgreSQL or evaluate a time-series approach, that position needs evidence too.

But the decision is moving forward, and I still care about the outcome.

I’m going to learn the technology, contribute what I can, and do my best to make the implementation perform well. If I find a problem, I’ll raise it. If I find a better way to make the chosen approach work, I’ll bring that forward too.

I have no interest in a failed migration becoming an opportunity to say “I told you so.” I would much rather have a working system and a team that can support it.

That commitment should leave room for honest technical concerns. We still need to test assumptions, measure results, and revisit choices when the evidence calls for it. Supporting the team shouldn’t require pretending those questions are settled.

I argued against adopting Neo4j for this workload. I still think the concerns deserve answers.

And I will still do my best to make it a success.
