---
title: "gostatic"
summary: "A very simple static HTTP server written in Go."
hidden: false
# GitHub metadata is separate from handwritten content. Future sync belongs to dotask.
github:
  id: 54336634
  repository: "kodybrown/gostatic"
  url: "https://github.com/kodybrown/gostatic"
  description: "A **very** simple static HTTP server written in Go."
  pushedAt: "2019-06-12T19:22:42Z"
  language: "Go"
  archived: false
---

I built gostatic years ago and still use it to serve simple websites locally, including this one.

Eleventy builds the pages; gostatic serves the generated files:

```powershell
gostatic.exe -path .\_site -port 8080
```
