---
title: "Customizing the Tools menu in LDMS"
date: "2005-11-23"
summary: "Here are instructions on how to add LDDiscover.exe to the Tools menu in the LDMS Win32 console. It is designed to be easily customized by LDMS users. First, create a new folder named Tools under the ManagementSuite folder. The default…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/11/customizing-tools-menu-in-ldms.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113458253212817323"
---

Here are instructions on how to add LDDiscover.exe to the Tools menu in the LDMS Win32 console. It is designed to be easily customized by LDMS users.  
  
First, create a new folder named Tools under the ManagementSuite folder. The default ManagementSuite folder (also referred to as Ldmain) is `C:\Program Files\LANDesk\ManagementSuite`. So, for a default installation your new folder will be at: `C:\Program Files\LANDesk\ManagementSuite\Tools`.  
  
Now, create a new file in that folder called LDDiscover.xml with the following contents:  

```xml
<?xml version="1.0" encoding="utf-8"?>
<ToolInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <_toolBoxText>LDDiscovery</_toolBoxText>
 <_className>Standalone Process</_className>
 <_assemblyPath>C:\Program Files\LANDesk\ManagementSuite\Utilities\LdDiscover\LDDiscover.exe</_assemblyPath>
 <_bitmapPath>resources\TVTS\bmps\ImageUltra16.bmp</_bitmapPath>
 <_showInToolsMenu>true</_showInToolsMenu>
 <_showInToolBox>true</_showInToolBox>
 <_extendComputerContextMenu>false</_extendComputerContextMenu>
 <_group>Configuration</_group>
</ToolInfo>
```

Start (or restart) the LDMS console to see your changes. (Note: You'll have to change the path in the file that points to the LDDiscover.exe file, if you did not install LDMS into the default directory.)
