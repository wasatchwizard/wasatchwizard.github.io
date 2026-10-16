---
title: "Important differences between the JavaScript null and undefined"
date: "2007-08-17"
summary: "I'm cleaning up some old code today primarily consisting of JavaScript and a bit of C# (ASP.net). I'm trying to make the code faster and more easily understood. I thought I'd clean up the code used when working with elements on the…"
topics: ["JavaScript"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/08/important-differences-between.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-2676852773623078584"
migrationNote: "The original interactive demo buttons are preserved as source examples instead of runnable demos."
---

I'm cleaning up some old code today primarily consisting of JavaScript and a bit of C# (ASP.net). I'm trying to make the code faster and more easily understood.  
  
I thought I'd clean up the code used when working with elements on the page. Generally, this consists of an assignment from the DOM to a local JS variable and then an if statement to verify the object was found.  
  
Now, some people will claim that it isn't necessary to perform the check (assuming you are checking during onload or after) because it is highly unlikely that only part of the web page will be downloaded. I agree that it is unlikely and quite frankly if only a portion of the page gets downloaded you're going much more important problems to worry about than a few JavaScript error dialogs. But, nevertheless, I still feel it is a good practice to check for null objects.  
  
I have always done a simple check as follows:  
  

```text
var obj = document.getElementById("myobject");
if (obj)
   obj.style.display = "block";
```

  
  
However, I know many web developers who go a little further:  
  

```javascript
var obj = document.getElementById("myobject");
if (null != obj && "undefined" != typeof(obj))
   obj.style.display = "block";
```

  
  
I generally only check for `undefined` when checking if a method parameter exists or not.  
  

```javascript
function myFunc(id, e)
{
   var obj = document.getElementById(id);
   if (obj)
   {
      if ("undefined" != e && null != e)
         obj.innerHTML = "An error occurred: " + e;
   }
}
```

  
  
Does it matter? What do you do? What's the difference between null and undefined?  
  
Well, so the difference between null and undefined are very simple, yet very important. null is actually an object in JavaScript. undefined is a value for objects that don't exist or variables that have not yet been assigned to.  
  
Checking for null is simple:  
  

```text
if (obj) // the object exists
if (null != obj) // the object exists
if (!obj) // the object is null
if (null == obj) // the object is null
```

  
  
Checking for undefined is just as simple\*:  
  

```javascript
// test as an object
if (undefined != obj) // the object is defined
if (undefined == obj) // the object is undefined
// test as a string
if ("undefined" != typeof(obj)) // the object is defined
if ("undefined" == typeof(obj)) // the object is undefined
```

  
  
\*Please note, however that a lot of people make the simple mistake of testing the wrong thing with regards to undefined. There are two ways to test it, as a string or as an object. Look closely at the two different types of examples above, so you don't accidentally mix them up! (Which I've only done about a bajillion times!)  
  
And, don't forget that just because an object is not undefined, does not mean that it is non-null as well. In other words a null object is still an object therefore it is defined. That make sense?  
  
  
  
  
Well, in my cleaning up I decided to revisit the whole thing and noticed like all maturing web applications there are many variations and uses of these throughout our code. I needed to know for sure, however, what is returned by getElementById (and getElementsByName) when the object or objects are not found. And, also what is the best, cleanest way to test those objects.  
  
So, I wrote a few tests:  
  

```javascript
var obj = document
      .getElementById("this-elem-doesnt-exist");
if (!obj)
   alert("!obj");
if (obj)
   alert("obj");
if (null == obj)
   alert("null == obj");
if (null != obj)
   alert("null != obj");
if (undefined == obj)
   alert("undefined == obj");
if (undefined != obj)
   alert("undefined != obj");
if ("undefined" == typeof(obj))
   alert("\"undefined\" == typeof(obj)");
if ("undefined" != typeof(obj))
   alert("\"undefined\" != typeof(obj)");
if (undefined == typeof(obj))
   alert("undefined == typeof(obj)");
if (undefined != typeof(obj))
   alert("undefined != typeof(obj)");
```

  
  
  

```javascript

function test1()
{
var obj = document.getElementById("this-elem-doesnt-exist");
if (!obj)
 alert("!obj");
if (obj)
 alert("obj");
if (null == obj)
 alert("null == obj");
if (null != obj)
 alert("null != obj");
if (undefined == obj)
 alert("undefined == obj");
if (undefined != obj)
 alert("undefined != obj");
if ("undefined" == typeof(obj))
 alert("\"undefined\" == typeof(obj)");
if ("undefined" != typeof(obj))
 alert("\"undefined\" != typeof(obj)");
if (undefined == typeof(obj))
 alert("undefined == typeof(obj)");
if (undefined != typeof(obj))
 alert("undefined != typeof(obj)");
}
```

  
  
Now, let's run the same tests against an object that we know exists:  
  

```javascript
var obj = document
      .getElementById("this-elem-exists");
if (!obj)
   alert("!obj");
if (obj)
   alert("obj");
if (null == obj)
   alert("null == obj");
if (null != obj)
   alert("null != obj");
if (undefined == obj)
   alert("undefined == obj");
if (undefined != obj)
   alert("undefined != obj");
if ("undefined" == typeof(obj))
   alert("\"undefined\" == typeof(obj)");
if ("undefined" != typeof(obj))
   alert("\"undefined\" != typeof(obj)");
if (undefined == typeof(obj))
   alert("undefined == typeof(obj)");
if (undefined != typeof(obj))
   alert("undefined != typeof(obj)");
```

  
  
  
  

```javascript

function test2()
{
var obj = document.getElementById("this-elem-exists");
if (!obj)
 alert("!obj");
if (obj)
 alert("obj");
if (null == obj)
 alert("null == obj");
if (null != obj)
 alert("null != obj");
if (undefined == obj)
 alert("undefined == obj");
if (undefined != obj)
 alert("undefined != obj");
if ("undefined" == typeof(obj))
 alert("\"undefined\" == typeof(obj)");
if ("undefined" != typeof(obj))
 alert("\"undefined\" != typeof(obj)");
if (undefined == typeof(obj))
 alert("undefined == typeof(obj)");
if (undefined != typeof(obj))
 alert("undefined != typeof(obj)");
}
```

  
  
Based on the results, I really think that all you should have to do is a simple check as in the first example. So, I'm changing our code to look nice and clean using just a simple if (obj), unless there is a need to check if it's undefined.
