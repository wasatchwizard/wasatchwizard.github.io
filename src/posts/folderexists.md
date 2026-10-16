---
title: "FolderExists()"
date: "2006-06-26"
summary: "I haven't found a good method to check if a folder exists in non-managed C++, so I thought I'd post what I came up with. This also works with Windows CE, too. Bear in mind, however, that this could also return false if there was a…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2006/06/folderexists.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-115135875742392187"
---

I haven't found a good method to check if a folder exists in non-managed C++, so I thought I'd post what I came up with. This also works with Windows CE, too.  
  

```cpp
bool FolderExists(TCHAR *szPath)
{
   DWORD dwAttr = GetFileAttributes(szPath);
   if (dwAttr & FILE_ATTRIBUTE_DIRECTORY)
   {
      return TRUE;
   }
   return FALSE;
}
```

  
  
Bear in mind, however, that this could also return false if there was a permissions error. I'll let you expand upon it as like.
