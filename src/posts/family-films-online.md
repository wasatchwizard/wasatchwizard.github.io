---
title: "Building Family Films Online"
date: "2000-01-31"
summary: "A complete online sales website for Feature Films for Families and its catalog of family-friendly movies."
topics: ["Development", "Web Development", "E-commerce", "ASP"]
---

I’ve completed an online sales website for **[Feature Films for Families](http://www.familytv.com/)**, bringing its catalog of family-friendly movies to the web. I called the project “Family Films Online.”

There’s a lot to connect in a storefront. A customer needs to find a movie, read about it, choose a quantity, add it to a cart, and complete an order. Each step needs to carry the right information into the next.

My project outline breaks that flow into catalog and search pages, product details, account signup and login, a shopping cart, and a final invoice. It also accounts for changing quantities, removing items, calculating shipping, and giving customers a printable record of their purchase.

The technical plan uses ASP pages and a database behind the catalog, customer accounts, and cart. One detail I spent time thinking through was how a visitor moves from browsing to having an account, while keeping the cart associated with the right person. Another was making the individual pages behave sensibly when someone arrives through a direct link.

`Response.Cookies` helps track the anonymous visitor so I can merge that visitor’s record and cart into the logged-in account. Logging in shouldn’t mean starting the shopping trip over!

The broader outline also includes customer help and ideas for a children’s activity area, with movie-themed puzzles, connect-the-dots pages, and coloring books. There’s room to build more around the catalog as the site grows.

It’s satisfying to put together a complete sales website where the pages, data, and ordering process all have to work together. A movie listing is only the beginning of what it takes to let someone buy it.

Check it out! [Visit Family Films Online](http://www.familytv.com/)
