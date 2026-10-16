---
title: "File permissions for normal users vs. locked-down users"
date: "2006-05-24"
summary: "This table details the permissions and ability to write files in the specified folders per user."
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2006/05/file-permissions-for-normal-users-vs.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-114848414755164211"
---

This table details the permissions and ability to write files in the specified folders per user.  

<div class="table-scroll" role="region" aria-label="Article table" tabindex="0">
<table><tr><td>All versions of Windows</td><td></td><td>SYSTEM account</td><td></td><td>Locked-down user</td><td></td><td>Normal user</td></tr><tr><td>C:\</td><td></td><td>Yes</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td>C:\Windows\</td><td></td><td>unknown</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td>C:\Windows\System32</td><td></td><td>unknown</td><td></td><td>No</td><td></td><td>No</td></tr><tr><td>C:\Program Files\</td><td></td><td>No</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td colspan="7">&#160;</td></tr><tr><td>Windows 9x specific</td><td></td><td>SYSTEM account</td><td></td><td>Locked-down user</td><td></td><td>Normal user</td></tr><tr><td>C:\Windows\Profiles\</td><td></td><td>Yes</td><td></td><td>Yes</td><td></td><td>Yes</td></tr><tr><td>C:\Windows\Profiles\&lt;user&gt;</td><td></td><td>Yes</td><td></td><td>Yes</td><td></td><td>Yes</td></tr><tr><td>C:\Windows\Profiles\&lt;user&gt;\Application Data</td><td></td><td>Yes</td><td></td><td>Yes</td><td></td><td>Yes</td></tr><tr><td>C:\Windows\Application Data\</td><td></td><td>Yes</td><td></td><td>Yes</td><td></td><td>Yes</td></tr><tr><td colspan="7">&#160;</td></tr><tr><td>Windows NT/2000/XP specific</td><td></td><td>SYSTEM account</td><td></td><td>Locked-down user</td><td></td><td>Normal user</td></tr><tr><td>C:\Documents and Settings\</td><td></td><td>No</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td>C:\Documents and Settings\All Users\</td><td></td><td>Yes</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td><nobr>C:\Documents and Settings\All Users\Application Data</nobr></td><td></td><td>Yes</td><td></td><td>No</td><td></td><td>Yes</td></tr><tr><td>C:\Documents and Settings\&lt;user&gt;\</td><td></td><td>No</td><td></td><td>Yes</td><td></td><td>Yes</td></tr><tr><td>C:\Documents and Settings\&lt;user&gt;\Application Data</td><td></td><td>No</td><td></td><td>Yes</td><td></td><td>Yes</td></tr></table>
</div>
