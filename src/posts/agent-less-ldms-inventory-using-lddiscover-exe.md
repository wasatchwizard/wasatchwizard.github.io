---
title: "Agent-less LDMS inventory using LDDiscover.exe"
date: "2005-11-20"
summary: "I was playing around with some of the components that come with LANDesk Management Suite (LDMS). I work for LANDesk Software, Inc. on the ISV team. My team comes up with solutions to integrate LANDesk and our partners’ products. Anyway,…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/11/agent-less-ldms-inventory-using.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113114685864819152"
---

I was playing around with some of the components that come with LANDesk Management Suite (LDMS). I work for [LANDesk Software, Inc.](http://www.landesk.com/Products/LDMS/) on the ISV team. My team comes up with solutions to integrate LANDesk and our partners’ products.  
  
Anyway, I figured out a very cool use of LDDiscover.exe, one of the components available to LDMS users. Using LDDiscover.exe I automated the deployment of our agent to all of the machines on my (private) network. That’s cool, but nothing that the LDMS console doesn’t already do (although, personally I prefer the simple UI of LDDiscover.exe for some quick tasks). What is cool about this is that using nearly the same steps I was able to perform an agent-less inventory of all of those machines, without installing our agent onto those machines inventoried.  
  
Here are the steps to run LDDiscover.exe:  
  
1\. Run LDDiscover.exe (installed with LDMS under ManagementSuite\\Utilities)  
2\. Configure it  
3\. Enter in IP ranges (or machine names)  
4\. Enter account credentials. (You can pre-append the user with the domain name if needed.)  
5\. Enter the commands to run (see below).  
6\. Click Run!  
  
If you want to install the LDMS agent, use the following commands where merlin-ldms is my Core server:  
  

```text
net use \\merlin-ldms\ldlogon /user:Username "password"
\\merlin-ldms\ldlogon\wscfg32.exe /install
net use /d \\merlin-ldms\ldlogon
```

If you want to perform an agent-less inventory of all of those machines, use these commands instead:  
  

```text
net use \\merlin-ldms\ldlogon /user:Username "password"
\\merlin-ldms\ldlogon\ldiscn32.exe /s=merlin-ldms /ntt=merlin-ldms /sync /V
net use /d \\merlin-ldms\ldlogon
```

You can also create an ldform.dat file in the \\ldlogon folder that the scanner will pick up, which will provide custom data for querying (such as ‘Automated Scan = True’).
