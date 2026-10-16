---
title: "Returning dynamic Xml from C# web services"
date: "2006-08-01"
summary: "A co-worker and I spent a while trying to figure out how to return custom XML content from a C# web service. We were trying to figure out how to get our content assigned into a struct (that was being returned) without it encoding our…"
topics: ["C#","Web Services","XML"]
originalUrl: "https://elegantdevelopment.blogspot.com/2006/08/returning-dynamic-xml-from-c-web.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-115460792384141990"
---

A co-worker and I spent a while trying to figure out how to return custom XML content from a C# web service. We were trying to figure out how to get our content assigned into a struct (that was being returned) without it encoding our XML tags. It wasn't going to happen. Then he thought of a great idea. He set an XmlNode as the return object. So, we built our XML content in memory as before and simply returned that object. Doing this we able to return any XML data without having to know what it will be before hand.

```csharp
[WebMethod]
public XmlNode GetDynamicXml()
{
   XmlDocument myXmlDocument = new XmlDocument();
   // load xml content or build it up dynamically, etc
   return myXmlDocument.DocumentElement;
}
```

I thought it was a clever use of the technology considering the limited alternatives..
