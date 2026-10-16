---
title: "sortxml (week #22)"
date: "2013-05-28"
summary: "This is a very simple utility that prettifies and sorts xml file nodes and attributes. It is simple to use. The default is to output pretty and sorted nodes and attributes. So, given the following: Would output the following: I created…"
topics: ["Application of the Week 2013","Utility"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/05/sortxml-week-22.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-5050685415197052411"
---

This is a very simple utility that prettifies and sorts xml file nodes and attributes.  
**It is simple to use.**  
  

```text
USAGE: sortxml.exe [options] infile [outfile]

  infile      The name of the file to sort, etc.
  outfile     The name of the file to save the output to.
              If this is omitted, then the output is written to stdout.

OPTIONS:

  --pretty    Ignores the input formatting and makes the output look nice.
  --sort      Sort both the nodes and attributes.
  --sortnode  Sort the nodes.
  --sortattr  Sort the attributes.

(prefix an option with ! to turn it off.)
```

  
The default is to output pretty and sorted nodes and attributes. So, given the following:  
  

```text
    $ type sample.xml
    <root><node attr="name" value="one"></node></root>
```

Would output the following:  
  

```text
    $ sortxml.exe sample.xml
    <root>
        <node attr="name" value="one">
        </node>
    </root>
```

I created this utility so I can use it as a File Format in Beyond Compare. Here is the gist of the File Format in BC3.  
  

```text
    Helpers\sortxml.exe --pretty --sortnode --!sortattr %s %t
```

  
Check out the source code at [GitHub](https://github.com/kodybrown/sortxml)!
