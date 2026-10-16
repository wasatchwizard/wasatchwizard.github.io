---
title: "Google Maps stopped working a few days ago"
date: "2007-07-13"
summary: "We ran into a problem this last Monday (7/9/07) where the Google Maps stopped working on some of our page. After figuring out why some pages were working and some weren't it turns out that Google made a change to their API. Basically,…"
topics: ["Google Maps"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/07/google-maps-stopped-working-few-days.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-2090390527870430454"
---

We ran into a problem this last Monday (7/9/07) where the Google Maps stopped working on some of our page. After figuring out why some pages were working and some weren't it turns out that Google made a change to their API.

Basically, you must now call **`map.setCenter()`** to initialize the map before calling any of the other methods that set preferences to it such as **`map.enableDragging()`**, **`map.enableDoubleClickZoom()`**.

Actually, the only one that I noticed that caused the map to not display at all was `map.enableDragging().`
