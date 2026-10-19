---
title: "One Flag, Three Prefixes. I'm Done Guessing."
date: "2025-09-16"
summary: "I'm tired of guessing which flag prefix a command-line tool wants. Here's the baseline for the apps I write: -, --, and / are interchangeable."
topics: ["Development", "Command Line", "Resty"]
---

Was that `-help`, `--help`, or `/help`?

I use command-line tools all day, and I’m tired of answering that question. One tool wants a single dash. Another wants two. Another uses a slash. Sometimes the prefix depends on whether the option has one letter or an entire word.

I want to remember what a tool does and get on with using it.

So I’m setting a baseline for the command-line apps I write: **`-`, `--`, and `/` are interchangeable flag prefixes.**

[Resty](/projects/resty/) already follows this rule. These all mean the same thing:

```text
resty -help
resty --help
resty /help
```

The same applies to single-letter options: `-o`, `--o`, and `/o` all identify the same option. Use whichever prefix your fingers remember.

There is one deliberate tradeoff: **no bundled single-letter flags.** `-rv` does not mean `-r -v`. Each option gets its own argument. The prefix doesn’t determine how the remaining letters are interpreted.

The implementation is pretty straightforward:

```csharp
while (arg.StartsWith('-') || arg.StartsWith('/')) {
  isFlag = true;
  arg = arg.Substring(1);
}
```

All leading dashes and slashes are removed before the flag name is interpreted. That means `---verbose` and `////help` work too.

Please don’t take that as a formatting recommendation. But if you get enthusiastic with the punctuation, the parser will survive.

I know this gives up a convention some people like. Bundled flags are convenient once you know them. I’m choosing a different convenience: being able to type the prefix you remember without stopping to check which spelling this particular tool accepts.

Resty documents this behavior because it’s intentional, and I intend to keep it.

I can’t make every command-line tool agree. I can make the ones I write follow the same rule.
