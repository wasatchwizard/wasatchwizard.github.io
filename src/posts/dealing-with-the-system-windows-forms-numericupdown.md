---
title: "Dealing with the System.Windows.Forms.NumericUpDown"
date: "2006-06-27"
summary: "I ran into quite an annoying little .Net framework bug today. At least, I'm assuming it's a bug since I didn't notice any documentation explaining. When I set the Minimum and Maximum values, you'd think that you wouldn't be able to…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2006/06/dealing-with-systemwindowsformsnumeric.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-115144204986941453"
---

I ran into quite an annoying little .Net framework bug today. At least, I'm assuming it's a bug since I didn't notice any documentation explaining.  
  
When I set the Minimum and Maximum values, you'd think that you wouldn't be able to enter a value outside that range, right? So would I. Unfortunately, it doesn't work out that way.. at least not at first.  
  
Apparently, there is a bug in the events of the NumericUpDown control that prevent limiting or restricting the user input when done via the keyboard. The only way I could get the control to not allow letters into the field was by implementing two of its events. Implementing more than these two seems fine, but these two must be there together or it doesn't work.  
  
What you do in the events does not matter if you at least access the e.KeyValue and numericUpDown.Value values within each event. That's all it took to get my code working.  
  

```csharp
private void numericUpDown_KeyDown(object sender, System.Windows.Forms.KeyEventArgs e)
{
   string fixdotnet = string.Format("numericUpDown_KeyDown {0}, {1}", e.KeyValue, numericUpDown.Value);
}

private void numericUpDown_KeyUp(object sender, System.Windows.Forms.KeyEventArgs e)
{
   string fixdotnet= string.Format("numericUpDown_KeyUp {0}, {1}", e.KeyValue, numericUpDown.Value);
}
```

  
Another interesting tidbit is that the `Validating` event would not fire AT ALL, unless I accessed the numericUpDown.Value field. Now, that's annoying.  
  
I've cleaned the source up, created sample projects, removed/added/re-added controls, and closed Visual Studio .Net 2003 and tried again. Nothing seems to fix it.. Anyone have any ideas other than this workaround?
