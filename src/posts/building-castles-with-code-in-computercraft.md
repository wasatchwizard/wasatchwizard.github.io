---
title: "Building Castles with Code in ComputerCraft"
date: "2021-04-11"
summary: "I absolutely love ComputerCraft. I wrote dozens of helper scripts and used them to build enormous castles—because apparently Minecraft needed a command-line construction crew."
topics: ["Minecraft", "ComputerCraft", "Programming"]
---

I absolutely love ComputerCraft.

[ComputerCraft adds programmable computers and robots to Minecraft](https://github.com/dan200/ComputerCraft). That is already enough to get my attention. Give me a world made of blocks and a way to write programs that interact with it, and I’m going to start building tools.

Which is exactly what happened.

I wrote dozens of helper scripts and used them to build some amazing, extremely large castles. The building commands were my own helpers on top of ComputerCraft, along these lines:

```text
build-wall -length a -width b -inventory-block c -depth d
```

That’s an illustration of the command style, with letters standing in for the arguments. The appeal is being able to describe the dimensions and block selection, then let a program handle the repetition.

For a look at some of the actual code, see my older post, [“Teaching a Turtle to Build a Less Perfect Wall”](/blog/teaching-a-turtle-to-build-a-less-perfect-wall/), dated March 19, 2012. It walks through two of my original helpers for varying the materials in stonework.

Apparently, my idea of relaxing with a game involves designing a command-line construction crew.

The fun isn’t only in getting a large wall built. It’s in figuring out how to describe the job clearly enough that a program can do it. What should be configurable? Which part of the task can I reuse? What makes this helper useful for the next structure as well as the one in front of me?

Then I get to see the answer turn into something in the world.

That is a particularly satisfying feedback loop. The output of the code is a place I can walk around in. A useful helper becomes part of a much bigger build, and a few more options open up another set of possibilities.

I still get to decide what the castle should look like. Automating the repetitive construction gives me another way to carry out that design. Writing the tools is part of the creative work for me.

And yes, there is something funny about spending time programming after spending time programming. But the context makes a difference. These are my experiments, my oversized building plans, and my choice about which problem sounds fun to solve next.

I don’t need to justify the castle with a business case.

ComputerCraft sits in a wonderful spot between playing a game and making something of my own. I can tinker with the code, improve a helper, or step back and enjoy the thing it helped build.

My April bookmarks also include [Bedrock, a GUI framework for ComputerCraft](https://github.com/oeed/Bedrock). It’s another example of how far people take the computers inside this game. There is always another interesting layer to explore.

For me, though, the castles are a pretty compelling reason to keep coming back.

Some people build a wall. Apparently, I need to build a wall-building program first.
