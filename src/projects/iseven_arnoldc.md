---
title: "iseven_arnoldc"
summary: ""
screenshot: ""
hidden: false
github:
  id: 465502270
  repository: "kodybrown/iseven_arnoldc"
  url: "https://github.com/kodybrown/iseven_arnoldc"
  description: "This is a simple implementation of IsEven, in ArnoldC."
  pushedAt: "2022-03-02T23:34:58Z"
  language: null
  archived: false
  readmeUrl: "https://github.com/kodybrown/iseven_arnoldc/blob/main/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/iseven_arnoldc/main/README.md"
---


This is a simple implementation of an IsEven method, in ArnoldC.

Just for fun. :-)

## What is ArnoldC?

ArnoldC is a programming language based on the one liners of Arnold Schwarzenegger movies.

- [ArnoldC Website](https://lhartikk.github.io/ArnoldC/)
- [Source (GitHub)](https://github.com/lhartikk/ArnoldC)
- [Wiki: Examples](https://github.com/lhartikk/ArnoldC/wiki/ArnoldC)

## Getting Started

Make sure you have Java installed.

Download the required `'ArnoldC.jar'` file.

```powershell
> curl --output "./ArnoldC.jar" "http://lhartikk.github.io/ArnoldC.jar"
```

**Compile it.**

```powershell
> java -jar ArnoldC.jar IsEven.arnoldc
```

> Do not include _any_ path characters in your file name (not even `'./'` at the beginning).

**Run it.**

```powershell
> java IsEven
1
```

The number you are checking (if it is even or not) is located at the end of line #6.

```text
DO IT NOW ISEVEN 0|1|2|3|etc
```

## A Simple Example: Hello World

File: **hello.arnoldc**

```arnoldc
IT'S SHOWTIME
TALK TO THE HAND "hello world"
YOU HAVE BEEN TERMINATED
```

Compile and run.

```powershell
> java -jar ArnoldC.jar hello.arnoldc
> java hello
hello world
```
