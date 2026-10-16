---
title: "Problems with Pocket PC event notifications using CeRunAppAtEvent, CeRunAppAtTime and CeSetUserNotificationEx"
date: "2005-07-12"
summary: "I had a serious bug in an application recently that I found was being caused by the Pocket PC API; the CeRunAppAtEvent and CeRunAppAtTime methods to be precise. These methods are supposed to run an application based on a system event…"
topics: []
originalUrl: "https://elegantdevelopment.blogspot.com/2005/07/problems-with-pocket-pc-event.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-113088631274258727"
---

I had a serious bug in an application recently that I found was being caused by the Pocket PC API; the CeRunAppAtEvent and CeRunAppAtTime methods to be precise. These methods are supposed to run an application based on a system event (such as power on, network availability, etc.) or a time, respectively. But, after releasing a product, I found that it works only for a short while; after the application schedules itself a few times, it stops scheduling completely and it returns no errors or indication that scheduling has ceased.  
  
Enter CeSetUserNotificationEx. This is another API-level method that allows me to create notifications. But, it has its own share of bugs too. For instance, when my application is already scheduled to run and I attempt to schedule it again, only for a different time, it doesn’t get scheduled (and never runs again without scheduling it manually). Despite what the documentation (and Microsoft tech support says) you can not schedule the same event (using the handle – so you don’t get duplicates) if it’s already scheduled.  
  
I finally found the solution I needed after several days of trial and error and research into other alternatives. I was about ten minutes from starting to create my own application that would always be running that launched the events itself, when I thought of the solution I needed.  
  
The work-around is to save your handle to the scheduled event and always clear that notification before scheduling it. I felt kind of funny for not thinking of it earlier actually, but at least after three days with Microsoft support, at least I thought of it and not them…  
  
Here’s the code:  
  

```text
long timeHandle = 0;
// get timeHandle from registry if it has been scheduled before, otherwise it stays set to 0

SYSTEMTIME st;
::GetLocalTime(&st);
// manipulate your st variable to get the time you want (add 2 hours, add one day, etc.)

UserNotificationTrigger nt;
memset(&nt, 0, sizeof(CE_NOTIFICATION_TRIGGER));
nt.dwSize = sizeof(UserNotificationTrigger);
nt.dwType = CNT_TIME;
nt.lpszApplication = L"\\application\\to run.exe";
nt.lpszArguments = L"application arguments";
nt.stStartTime = st;

UserNotificationType untype;
memset(&untype, '\0', sizeof(untype));

// Clear any existing event notification
if (!CeClearUserNotification(timeHandle))
   WriteLog(L"Could not clear existing notification.\r\n");

timeHandle = CeSetUserNotificationEx(0, &nt, &untype);
if (NULL != timeHandle)
   WriteLog(L"Application scheduled to run again.\r\n");
else
   WriteLog(L"Failed to schedule application\r\n");
```

  
  
CeRunAppAtEvent information is located here: [http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcerunappatevent.asp](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcerunappatevent.asp)  
CeRunAppAtTime information is located here: [http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcerunappattime.asp](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcerunappattime.asp)  
CeSetUserNotificationEx information is located here: [http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcesetusernotificationex.asp](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wceui40/html/cerefcesetusernotificationex.asp)
