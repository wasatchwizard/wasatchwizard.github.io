---
title: "A High-Level Plan Is Not a Blank Check"
date: "2021-01-11"
summary: "A microservices proposal can be a useful starting point and still leave too much unanswered to authorize implementation. Who decides the details, and on what evidence?"
topics: ["Development", "Architecture", "Teamwork"]
---

I’ve [written about using “industry standard” as a substitute for justification](/blog/industry-standard-is-not-a-blank-check/). There is another part of that problem I want to address: approving a broad architectural direction before deciding what that approval actually covers.

A high-level proposal can be a good start. It can establish goals, introduce vocabulary, and give people something concrete to discuss.

It can also leave most of the consequential decisions unanswered.

Those two things can be true at the same time.

My concern with a recent architecture discussion wasn’t that I couldn’t understand the proposal. I understood the direction. What I couldn’t find was enough explanation to evaluate the choices that would follow from it.

Perhaps the document was only intended as an overview. That’s fair. But an overview needs to stay an overview until we have agreed on which decisions are settled and which still need work.

Otherwise, “this looks like a reasonable direction” quietly becomes “go build whatever you think belongs under this heading.”

That is a lot of authority to hide inside a short document.

With a team still learning the product, I want particular care around that transition. There are requirements, constraints, and past failures to understand. New people should question the existing design. They should also expect questions about its proposed replacement.

Choosing microservices as a direction doesn’t answer where the boundaries should be, which responsibilities need independent deployment, or what happens when the proposed arrangement doesn’t fit a particular workflow.

Who makes those calls? What evidence guides them? Who reviews the consequences before they spread through the implementation?

If the answer is that the designated architect will decide, then we need to be honest about how much discretion we are granting. A title identifies a responsibility. The reasoning still needs to be available for review.

I’m not interested in winning an argument over titles. I’m interested in the system we will have to build, operate, and maintain after the meeting is over.

That is why “you don’t understand the architecture” is such an unhelpful response to a specific objection. Someone can understand a proposal and disagree with it. They can support its goals and question its boundaries. They can know how to implement it and still believe there is a simpler way.

Answer the objection. Walk through the disputed behavior. Compare the options against the same requirement.

When the discussion becomes concrete, we have something useful to work with. We can discover that someone misunderstood a constraint, that a proposal needs adjustment, or that the existing approach really does need replacing. Any of those outcomes is better than treating familiarity with terminology as the deciding qualification.

I also need to apply that standard to my own alternatives. If I believe a change will reduce processing or simplify the code, I should explain the mechanism and test the claim. Confidence and experience help me form a hypothesis. They don’t turn an estimated improvement into a measured result.

I don’t want us to replace someone else’s assumptions with mine.

Before moving from a broad proposal into implementation, I want a short record of the important choices: the problem, the constraints, the alternatives, the reason for the decision, and what remains uncertain. Where the answer is unclear, a focused experiment may tell us more than another general debate about architectural styles.

There is a limit to this, too. Demanding a complete design before anyone can begin is its own way to stall a project. We need enough detail for the decision in front of us, with room to learn and revise as we go.

What we shouldn’t do is approve the unknown parts by accident.

Management has a role here. Ask what the team has actually agreed on. Make sure the people who understand the product’s difficult corners have been heard. Require reasons for consequential choices, and make ownership of the follow-through clear.

That leaves room for the team to do its work without making every unanswered question somebody else’s future cleanup task.

I can push hard for an alternative and still work in good faith on the approach we ultimately choose. Once we have made an informed decision, I’ll help make it succeed.

Until then, asking for something better is part of the work.
