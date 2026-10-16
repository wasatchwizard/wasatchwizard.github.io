---
title: "The difference between VarChar and NVarChar"
date: "2005-10-27"
summary: "I was asked recently by a solid developer (one of the best I know, in fact) about the difference between the TSQL varchar and nvarchar data types. I was surprised he didn't know this. So, I thought it might be helpful to post it on my…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/10/difference-between-varchar-and.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113043293178941901"
---

I was asked recently by a solid developer (one of the best I know, in fact) about the difference between the TSQL varchar and nvarchar data types. I was surprised he didn't know this. So, I thought it might be helpful to post it on my Blog, as well.  
  
In Microsoft SQL Server, the only difference between varchar and nvarchar is that nvarchar is UNICODE (also called double-byte). If you declare columns as:  
  

```text
Myvarchar nvarchar(255)
MyNvarchar nvarchar(255)
```

The Myvarchar column will use 255 bytes in your table, where the MyNvarchar column will use 510 bytes in your table.  
  
Basically, if you need to support other languages in your product you should use nvarchar data type. If you are sure you will never localize the product, then you can use varchar.
