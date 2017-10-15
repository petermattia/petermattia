---
layout: post
categories: articles
title: "Kevin Bacon and Wikipedia: My introduction to web scraping"
date: 2017-10-14
description: Text mining Wikipedia using Beautiful Soup 4
tags: data-science code
---

Six degrees of Kevin Bacon

http://oracleofbacon.org

http://www.cnn.com/2014/03/08/tech/web/kevin-bacon-six-degrees-sxsw/index.html

<p><a href="https://en.wikipedia.org/wiki/Kevin_Bacon">
<img src="\img\wiki-phil\Kevin_Bacon_SDCC_2014.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

["Getting to Philosophy"]
(https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy)
is the Wikipedia version of this game.

To teach myself web scraping, I developed code to automate this process.
The GitHub repository is
[here](https://github.com/petermattia/wikipedia-degrees-of-sep-philosophy).

### Random

<p>
<img src="\img\wiki-phil\random_dist.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

Some fun ones:


### Top 100 pages

<p>
<img src="\img\wiki-phil\top100_dist.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

{% include top100.html %}

Most and least

### Categories

<p>
<img src="\img\wiki-phil\categories_boxplot.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

<p>
<img src="\img\wiki-phil\categories_popularity.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>
