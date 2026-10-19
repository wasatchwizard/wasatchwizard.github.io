---
title: "The App Isn’t Finished Until the API Exists"
date: "2021-03-26"
summary: "A polished mobile workflow still can’t serve the customer if its supporting endpoint is missing. The dependency belongs in the feature plan from the beginning."
topics: ["Development", "APIs", "Teamwork"]
---

I can build the screen, handle the input, and make the workflow pleasant. I still can’t ship the feature if the endpoint it depends on doesn’t exist.

That is one of the frustrations of working on a mobile provisioning app while the supporting backend is being developed by another team.

I want to make the app useful. There are features to add, rough edges to smooth out, and ways to make the person doing the provisioning spend less time fighting the software.

But some of that work stops at a boundary I can’t finish from the mobile side. The app needs a capability from the backend, and I need the team responsible for it to deliver it.

This post is about that recurring dependency problem, rather than a diagnosis of one particular support ticket.

An app can look surprisingly complete before that boundary gets exercised. Screens can be populated with sample data. Navigation can work. A demonstration can follow a planned path.

Then someone tries the real workflow, with their own account and actual devices, and discovers which parts of the feature still exist only in the plan.

That gap belongs in our definition of the work.

Before we promise a feature, I want agreement on what crosses the API boundary. Which request does the app send? What response can it expect? How does authorization work? What happens when the operation fails? Who owns the backend change, and when will it be available to test?

An endpoint name on a task list doesn’t answer all of that. Neither does a mock response. Mocks are useful for building the interface while another piece is in progress, but we still need to integrate and test the real behavior.

The backend team has constraints too. They may be supporting existing customers, repairing problems, or waiting on another dependency of their own. I don’t expect an endpoint to appear just because I ask for it.

I do expect the constraint to be visible so we can make an honest decision about scope and timing.

If the backend capability won’t be ready, say so. We can change the feature, change its priority, or change the delivery date. Letting the mobile work proceed against an indefinite dependency just hides the decision until later.

Management has a part in resolving that. Two teams can each be busy on their assigned work while the customer’s feature remains blocked between them. Someone needs to own the delivery across that boundary, with the authority to settle competing priorities.

I care about the whole experience, from the device being provisioned to the data becoming useful. A nice interface is a contribution to that experience, but it can’t substitute for the service behind it.

I want us to plan and review complete workflows, with their dependencies included.

When a customer asks whether the feature works, “my part is done” isn’t much of an answer.
