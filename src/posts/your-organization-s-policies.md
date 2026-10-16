---
title: "Your organization's policies..."
date: "2013-03-11"
summary: "\"Your organization's policies are preventing us from completing this action for you. For more info, please contact your help desk.\" I have been getting this error every time I click on a hyperlink in an Outlook 2013 email. It has been…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2013/03/your-organizations-policies.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-1524994845071043193"
---

`"Your organization's policies are preventing us from completing this action for you. For more info, please contact your help desk."`  
  
I have been getting this error every time I click on a hyperlink in an Outlook 2013 email. It has been very frustrating.  
  
The problem was solved by resetting the `HKEY_CLASSES_ROOT\.html` String (Default) value to `'htmlfile'`. Apparently, this was happening frequently when un-installing Google Chrome. However, on my machine it appears that Notepad++ changed the key!? I made the fix, restarted Outlook, and it works now!  

  
  
I found the solution here:  
  
[http://support.microsoft.com/default.aspx?scid=kb;en-us;310049&wa=wsignin1.0](http://support.microsoft.com/default.aspx?scid=kb;en-us;310049&wa=wsignin1.0)  
  
Here are the steps (from the link above):  
  
**Verify that the String (Default) value of the "HKEY\_CLASSES\_ROOT \\.html" key is "htmlfile"**  

1.  Click **Start**, and then click **Run**.
2.  In the **Open** box, type **regedit**, and then click **OK**.
3.  Locate, and then click the following registry subkey:  
    **HKEY\_CLASSES\_ROOT \\.html**
4.  Make sure that the value of the **String (Default)** is "htmlfile". If it's not "htmlfile", right-click **(Default)**, click **Modify**, input htmlfile in the **Value data** box, and then click **OK**.
5.  Exit Registry Editor.
