---
title: "Teaching a Turtle to Build a Less Perfect Wall"
date: "2012-03-19"
summary: "Two of my ComputerCraft helpers take different approaches to mixing building materials: random blocks, or an accent material between randomly sized runs."
topics: ["Minecraft", "ComputerCraft", "Lua", "Programming"]
---

A wall made entirely from one kind of block can look a little too perfect for what I’m trying to build.

I want some variation in the stonework. And since I’m already using ComputerCraft to help with construction, choosing the materials is another part of the job I can give to a turtle.

Two of my helpers, `dg3` and `dg4`, approach that choice differently. Both are based on the same digging-and-placing idea, but they differ in how they select which block to place.

The idea behind `dg3` is straightforward: dig downward, then place blocks underneath the turtle as it comes back up. Choose an inventory slot randomly for each placement.

Here is that placement loop from the original script:

```lua
for y = 1, depthDug do
 t.up()

 invLoc = math.random(startInvBlock, 9)
 t.select(invLoc)

 t.placeDown()
end
```

In this excerpt, `t` is the turtle API and `depthDug` is the number of layers recorded during the digging phase. `startInvBlock` defaults to slot 4; the choice runs through slot 9. The materials in those slots determine the possible results.

That gives each placement a fresh choice. It is a simple way to mix blocks without deciding every position myself.

But I also want another option: use a primary material for a stretch, then place an accent block, then go back to the primary material. Let the spacing vary so the accent doesn’t become a perfectly repeating pattern.

That is the approach in `dg4`. Its placement helper looks like this:

```lua
local function placeBlock()
    if cnt <= 0 then
        t.select(rndInvBlock)
        cnt = math.random(minRnd, maxRnd)
    else
        selectNext(startInvBlock)
        cnt = cnt - 1
    end
    t.placeDown()
end
```

The names could be clearer, but the behavior is small enough to follow. `cnt` starts at zero, so the first call selects the accent slot. It then chooses how many primary-material placements to attempt before using the accent again.

In the script’s defaults, `rndInvBlock` is slot 2, `startInvBlock` is slot 5, and `minRnd` and `maxRnd` are 2 and 9. The separate `selectNext` helper looks for a nonempty slot from the starting slot through slot 9.

So the accent comes from one selected slot, while the primary supply can occupy several slots. After an accent placement, the next run contains between two and nine primary-material placement attempts.

I like how little code it takes to express that distinction. One version makes a choice for every block. The other makes a choice about the length of each run.

The materials are still my decision. The code handles the repetition and some of the variation. That leaves me thinking about the structure I want to build rather than manually distributing every different block.

These are excerpts from my original helpers, not complete standalone programs or a newly verified release. They depend on the surrounding setup and movement code. The shown code also doesn’t verify every movement or placement result, and `dg3` can select an empty inventory slot. A failed placement doesn’t magically become a finished wall.

Those limitations matter when reusing the scripts. The material-selection idea is still worth sharing on its own.

Sometimes a few lines of code can make the repetitive part of building more interesting—and give the finished stonework a little less uniformity.
