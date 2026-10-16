---
title: "Output name/values of an Enum"
date: "2007-03-28"
summary: "I took the time a while ago to figure out the best way to output each name and value in an Enum. I just keep using the code and have been looking in recent projects looking for the code to re-use in a new project. So, I thought I’d…"
topics: [".Net","C#","Development"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/03/output-namevalues-of-enum.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-8876647043414254908"
---

  
I took the time a while ago to figure out the best way to output each name and value in an Enum. I just keep using the code and have been looking in recent projects looking for the code to re-use in a new project. So, I thought I’d share the love..  
  
This code will output the name and value of each element in the MyEnum object.  
  

```csharp

string[] names = Enum.GetNames(typeof(MyEnum));
Array values = Enum.GetValues(typeof(MyEnum));
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine(string.Format("{0} = {1}", names[i], values.GetValue(i)));
}
```

  
  
I think Reflection is probably the most overlooked and under-appreciated assembly in the whole .Net framework. Don’t you just love it? 8^)
