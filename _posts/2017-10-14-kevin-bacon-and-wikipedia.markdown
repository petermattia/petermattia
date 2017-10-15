---
layout: post
categories: articles
title: "Kevin Bacon and Wikipedia: My intro to web scraping"
date: 2017-10-14
description: Text mining Wikipedia using Beautiful Soup 4
tags: data-science code
---

Six degrees of Kevin Bacon

http://oracleofbacon.org
http://www.cnn.com/2014/03/08/tech/web/kevin-bacon-six-degrees-sxsw/index.html

![Kevin Bacon](\img\wiki-phil\Kevin_Bacon_SDCC_2014.jpg)
<p>
<a href="https://www.zymergen.com">
<img src="{{ site.url }}/img/zymergen.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

["Getting to Philosophy"]
(https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy)
is the Wikipedia version of this game.

To teach myself web scraping, I developed code to automate this process.
The GitHub repository is
[here](https://github.com/petermattia/wikipedia-degrees-of-sep-philosophy).

### Random

![random distribution](\img\wiki-phil\random_dist.svg)

Some fun ones:


### Top 100 pages

![random distribution](\img\wiki-phil\top100_dist.svg)

{% include top100.html %}

Most and least

### Categories

![random distribution](\img\wiki-phil\categories_boxplot.svg)

![random distribution](\img\wiki-phil\categories_popularity.svg)
