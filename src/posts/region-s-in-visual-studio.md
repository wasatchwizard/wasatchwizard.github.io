---
title: "#region’s in Visual Studio"
date: "2013-12-10"
summary: "I really don’t mind regions, when used correctly (ie: sparsely). The rest of the time, however, I want to rip them all out of any code I look at. I used to use some cool macros to automatically expand all regions, but since Microsoft…"
topics: ["Visual Studio"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/12/regions-in-visual-studio.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-1509269350282091756"
---

I really don’t mind regions, when used correctly (ie: sparsely). The rest of the time, however, I want to rip them all out of any code I look at. I used to use some [cool macros](http://stackoverflow.com/questions/10396354/visual-studio-collapse-extends-regions-only-shortcut) to automatically expand all regions, but since Microsoft [killed macros in Visual Studio 2013](/blog/i-miss-macros-in-visual-studio-2012/)..

So, for Visual Studio 2013, I settled on automatically expanding regions when a file is opened. That way people can organize their code all they want and I don’t have to deal with it.. 8^)

The extension is called **'I Hate #Regions'**.

Sadly, it will only install on Visual Studio 2010 and 2012. So, open up the `.vsix` file into your favorite archive tool and add edit the `extension.vsixmanifest` file. Insert the following snippet at the end of the `Vsix/Identifier/SupportedProducts` section.

```xml
   <VisualStudio Version="12.0">
     <Edition>Ultimate</Edition>
     <Edition>Premium</Edition>
     <Edition>Pro</Edition>
   </VisualStudio>
```

  

That’s it. You can download the [**I Hate #Regions**](http://visualstudiogallery.msdn.microsoft.com/0ca60d35-1e02-43b7-bf59-ac7deb9afbca) extension from the Visual Studio Gallery.
