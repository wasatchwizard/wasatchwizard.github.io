---
title: "Installing Windows NT Server in the Right Order"
date: "2002-07-15"
summary: "My Windows NT 4.0 Server setup checklist, from IIS 2.0 and the first round of drivers through Service Pack 6a."
topics: ["Windows", "IIS", "System Administration"]
---

Here's my checklist for setting up Windows NT 4.0 Server. The order matters. The sound card went in before Service Pack 3, the AGP video driver went in after it, and the IIS upgrade depended on what else I needed the server to run.

1. **Install the base server and its services.** Open Network Neighborhood Properties, go to the Services tab, and add the services you’ll use, especially IIS 2.0. Install the sound card and other older devices before SP3. Leave the AGP video driver and Proxy Server 2.0 until after SP3.
2. **Install Service Pack 3.** This takes IIS 2.0 to IIS 3.0. Set up the AGP video driver now. Proxy Server 2.0 can go in at this point. If you plan to move to IIS 4.0, read the IIS and Proxy Server release notes before installing Proxy Server.
3. **Install Internet Explorer 4.01 SP1** from the NT 4.0 SP4 disc. I marked this version as required for Active Desktop.
4. **Install IIS 4.0 from the NT Option Pack** if you need it. Do this after IE 4.01. Check how the IIS upgrade affects Proxy Server 2.0.
5. **Install SP4 or SP5** after reading the release notes for Proxy Server and the other installed services.
6. **Install Internet Explorer 5.** Check `ie.txt` in the NT IE 5 folder first.
7. **Install SP5** (if you took the SP4 route in step 5).
8. **Install SP6a.**
