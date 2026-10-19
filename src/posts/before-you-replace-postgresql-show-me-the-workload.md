---
title: "Before You Replace PostgreSQL, Show Me the Workload"
date: "2021-01-07"
summary: "Moving an IoT measurement store to Neo4j needs a case built on actual data and queries. A list of modern architecture goals is no substitute for that evidence."
topics: ["Development", "Architecture", "Databases", "IoT"]
---

I’m strongly opposed to replacing our PostgreSQL measurement store with Neo4j on the strength of the architectural case I’ve seen so far.

We are discussing an IoT system. Devices produce measurements over time. Before we choose a replacement database, I want to see how it will handle that work: receiving readings, finding them by device and time range, calculating summaries, retaining history, and supporting the reports people actually use.

Calling the proposed architecture modern, flexible, or customer-centric doesn’t answer those questions.

Those are worthwhile goals. They are also broad enough to describe almost any database proposal. A document can contain pages of sensible principles and still fail to explain why this particular technology belongs at the center of this particular product.

The proposal I’m reacting to names Neo4j and asks for an IoT-focused schema, simplicity, performance, and operational planning. What I don’t see is a workload comparison that justifies replacing the existing measurement store. It also leaves an important distinction unresolved: are we introducing a graph for a specific capability, or moving the raw readings themselves?

That distinction needs an answer before implementation starts.

I’m not claiming graph databases have no place in IoT. Devices have relationships with equipment, locations, and other devices. Some questions really are about following those relationships. Neo4j’s own [discussion of graphs in automotive and manufacturing](https://neo4j.com/blog/supply-chain-and-logistics/graphs-in-automotive-and-manufacturing/) describes relationship-oriented applications.

But a useful model of connected equipment does not, by itself, justify moving its entire measurement history into the same database.

Show me the queries that require it. Show me why those queries matter enough to justify the change. Then show me what happens to the rest of the workload.

My starting point would be to evaluate the PostgreSQL options we already have available.

[PostgreSQL supports range partitioning](https://www.postgresql.org/docs/13/ddl-partitioning.html), including partitioning by date. I want to understand what we can accomplish with a suitable schema, indexes, and partitioning before concluding that the database family needs replacing.

[TimescaleDB builds time-series capabilities on PostgreSQL](https://medium.com/timescale/announcing-1-0-enterprise-ready-time-series-database-sql-open-source-400b4342dfa0). That makes it a candidate worth investigating for the measurement workload.

[Citus provides distributed PostgreSQL capabilities and approaches to scalable aggregation](https://www.citusdata.com/blog/2018/06/14/scalable-incremental-data-aggregation/). If distributing the workload is what we need, I want that evaluated too.

Those are different options with different costs. I’m not proposing that we install extensions until the problem disappears, or assuming TimescaleDB and Citus can simply be combined without checking compatibility and constraints. Each candidate needs its own evaluation.

The same goes for adding a separate graph database. Perhaps a specific relationship-heavy feature would justify one. Perhaps it wouldn’t. Running another database introduces work too, especially if information has to stay consistent between stores.

My preferred tools need to earn their place just as much as Neo4j does.

Here is the comparison I want before we authorize a migration:

1. Use representative data, realistic history, and the actual queries the product needs.
2. Test ingestion while users are querying, including late readings and corrections where those occur.
3. Measure query latency, resource use, storage growth, and operating cost on stated configurations.
4. Demonstrate retention, backup and restore, failure recovery, and the proposed migration path.
5. Identify the result that would justify the change **and** the result that would make us reject it.

I don’t need every future question answered. I need enough evidence to believe we are solving a real problem without creating a larger one.

There is a governance problem here as well. I’m concerned when enthusiasm from the boardroom starts carrying more weight than the implementation questions the engineering team still needs to answer.

A board member can raise a useful idea. Management can set business goals and insist that a system meet them. Neither position makes a database recommendation technically correct.

The team still owns the responsibility to investigate it. “This came from above” cannot become the reason we skip the comparison or stop listening to objections.

That standard applies to me too. My investment in a product gives me a reason to care deeply about its success. It doesn’t make my preferred architecture correct. Evidence has to do that work.

I want the distinction between a proposed direction and an evaluated decision made explicit. If we haven’t established the ingestion requirements, tested the queries, or compared alternatives, say so. Don’t present the technology choice as settled while the reasons for choosing it are still missing.

At this point, I am against the migration. Naming Neo4j and listing architectural aspirations are not enough to change that.

Bring the workload, the comparison, and the operational plan. Then we have a decision to discuss.
