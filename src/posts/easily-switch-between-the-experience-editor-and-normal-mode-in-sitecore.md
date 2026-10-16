---
title: "Easily switch between the Experience Editor and normal mode in Sitecore"
date: "2016-02-25"
summary: "When working on a Sitecore website, quite often, I need to go back and forth between the normal website and the Experience Editor. I tried having two bookmarks for each page or module, but that grew tiresome very quickly - especially…"
topics: ["Sitecore"]
originalUrl: "https://elegantdevelopment.blogspot.com/2016/02/easily-switch-between-experience-editor.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-3978525577947525981"
migrationNote: "Bookmarklet source is preserved below; original draggable links are shown as text."
---

When working on a Sitecore website, quite often, I need to go back and forth between the normal website and the Experience Editor. I tried having two bookmarks for each page or module, but that grew tiresome very quickly - especially since I don't want to have a bookmark for every page on the website.  
  
So, I got in the habit of including \``sc_mode=normal`\` in what bookmarks I do have. And, then I simply change that to \``sc_mode=edit`\` in the address bar when needed and vice-versa. But, that has grown old also.  
  
So, today I created a simple [bookmarklet](http://bookmarklets.org/what-is-a-bookmarklet/) that edits the current page's \``sc_mode`\` on the query string.  

### Change to edit mode.

Drag \[this link\] to your bookmarks bar.  
  
Here is the code:  
  

```javascript
    javascript:(function(){
        var q={},i,a=window.location.search.substr(1).split("&");
        for(i in a){
            q[a[i].split("=")[0]]=a[i].split("=")[1];
        }
        q['sc_mode']='edit';
        a=[];
        for(i in q){
            a[a.length]=i+'='+q[i];
        }
        window.location.search='?'+a.join('&');
    }());
```

  

One line:

  

    `javascript:(function(){var q={},i,a=window.location.search.substr(1).split("&");for(i in a){q[a[i].split("=")[0]]=a[i].split("=")[1];}q['sc_mode']='edit';a=[];for(i in q){a[a.length]=i+'='+q[i];}window.location.search='?'+a.join('&');}());`

  

### Change to normal mode.

Drag \[this link\] to your bookmarks bar.

  
Here is the code:  
  

```javascript
    javascript:(function(){
        var q={},i,a=window.location.search.substr(1).split("&");
        for(i in a){
            q[a[i].split("=")[0]]=a[i].split("=")[1];
        }
        q['sc_mode']='normal';
        a=[];
        for(i in q){
            a[a.length]=i+'='+urlEncode(q[i]);
        }
        window.location.search='?'+a.join('&');
    }());
```

  

One line:

  

`javascript:(function(){var q={},i,a=window.location.search.substr(1).split("&");for(i in a){q[a[i].split("=")[0]]=a[i].split("=")[1];}q['sc_mode']='normal';a=[];for(i in q){a[a.length]=i+'='+q[i];}window.location.search='?'+a.join('&');}());`

  

### Alternate between edit and normal modes with one bookmarklet.

Drag \[this link\] to your bookmarks bar.

  
Here is the code:  
  

```javascript
    javascript:(function(){
        var q={},i,a=window.location.search.substr(1).split("&");
        for(i in a){
            q[a[i].split("=")[0]]=a[i].split("=")[1];
        }
        if(q['sc_mode']!=='edit'){
            q['sc_mode']='edit';
        }else{
            q['sc_mode']='normal';
        }
        a=[];
        for(i in q){
            a[a.length]=i+'='+urlEncode(q[i]);
        }
        window.location.search='?'+a.join('&');
    }());
```

  

One line:
