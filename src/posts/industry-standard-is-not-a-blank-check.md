---
title: "Industry Standard Is Not a Blank Check"
date: "2021-01-05"
summary: "If you can't explain why a best practice fits the product, calling it an industry standard doesn't make it a sound decision. Microservices included."
topics: ["Development", "Architecture", "Teamwork"]
---

“It’s an industry standard.”

Okay. What problem does it solve here?

That should be an ordinary engineering question. Too often, it gets treated as resistance to progress. Ask why a design is appropriate, and suddenly you are against best practices, against modern architecture, or afraid of change.

I’m tired of that conversation.

Knowing the name of an architectural pattern is easy. Understanding the conditions that make it useful, the costs it introduces, and when to leave it alone takes more work. Repeating an expert’s recommendation skips that work while borrowing the expert’s credibility.

Blindly following a best practice is still blindly following something.

The situation that bothers me most is when a team is still learning a product, but gets broad permission to redesign it around whatever is currently fashionable. Management hears familiar terminology and takes that as evidence that the decisions are sound.

Being new to a product doesn’t make someone incapable of improving it. Fresh eyes can find problems the rest of us have stopped noticing. But a new team still needs to learn why the existing system behaves as it does. Some choices will be mistakes. Others will reflect requirements that haven’t made it into the introductory presentation.

If management doesn’t understand those constraints either, its confidence cannot substitute for that missing knowledge. Giving the team a blank check just passes the uncertainty downstream to the people who will maintain the result.

That is a failure of oversight.

Microservices are a good example of how this happens.

I understand why they exist. Independent deployment and scaling can be useful when the product and team actually need them. But those benefits come with distributed-system costs: remote calls can fail, data changes can cross service boundaries, and diagnosing a request can require following it through several running processes. Martin Fowler describes this overhead as the [microservice premium](https://martinfowler.com/bliki/MicroservicePremium.html), and discusses the benefits and costs in [Microservice Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html).

You need a reason to pay that premium.

“We want it to scale” isn’t enough. Which workload needs to scale independently? What is the bottleneck? Have we measured it? Will separating this particular component help, or will it add a network hop to the same underlying constraint?

Separating responsibilities in code does not require giving every responsibility its own deployment. I want clear boundaries, understandable code, and services where they earn their keep. A well-structured application can keep related work together while leaving room to extract a service when there is a concrete reason to do so.

My preference is to start with the simplest deployment that meets the requirements, then make a case for each additional boundary. If independent deployment solves a real problem, show me. If a small service has a useful job, let’s build it.

But please stop treating a request for justification as proof that I don’t understand microservices.

There is also a commercial context to the advice. [AWS](https://aws.amazon.com/microservices/), [Google Cloud](https://cloud.google.com/blog/products/api-management/got-microservices-service-mesh-management-might-not-be-enough), and [Azure](https://azure.microsoft.com/en-us/blog/microservices-an-application-revolution-powered-by-the-cloud/) promote microservices alongside products for building and operating them. These companies sell infrastructure and managed services. They have a commercial interest in our technology choices.

That doesn’t make their technical advice false. It does mean I want us to evaluate the recommendation against our needs, including the operating bill and the work our team will take on. A vendor’s reference architecture is an example to examine, not permission to stop thinking.

Before approving an architectural change, I want answers to a few basic questions:

1. What specific product or operational problem are we solving?
2. What simpler options did we consider, and why are they insufficient?
3. What new failure modes, costs, and maintenance work are we accepting?
4. What evidence would show that this decision helped?

The same questions apply to my preferred design. Experience with a product gives me useful context; it doesn’t exempt my ideas from scrutiny.

I don’t expect certainty before anyone writes code. I do expect a reasoned decision and someone willing to own the consequences. The people doing the cleanup should have a voice before the next round of complexity is approved.

Standards and best practices are useful starting points. They carry lessons we shouldn’t have to rediscover from scratch. Understanding those lessons includes understanding their limits.

If the entire justification is “the experts recommend it,” we haven’t finished the design discussion.

We’ve barely started it.
