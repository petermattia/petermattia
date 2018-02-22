---
layout: post
categories: articles
title: "Kevin Bacon and Wikipedia: My introduction to web scraping"
date: 2017-10-14
description: Text mining Wikipedia using Beautiful Soup 4
tags: data-science code
---

<p><a href="https://en.wikipedia.org/wiki/Kevin_Bacon">
<img src="\img\wiki-phil\Kevin_Bacon_SDCC_2014.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

There's a game played among movie buffs (of which I can't claim to be) called
"Six Degrees of Kevin Bacon". The goal is to find the fewest degrees of seperation
between any actor or actress and
[Kevin Bacon](https://en.wikipedia.org/wiki/Kevin_Bacon)
by connecting them through other
actors they've performed in a movie with.
For example,
[Tom Hanks](https://en.wikipedia.org/wiki/Tom_Hanks) has a
["Bacon number" of 1](https://www.google.com/search?q=bacon+number+tom+hanks),
since he co-starred in [*Apollo 13*](https://en.wikipedia.org/wiki/Apollo_13_(film))
with Bacon.
The Civil War general [William Rufus Shafter](https://en.wikipedia.org/wiki/William_Rufus_Shafter)
has a [Bacon number of 7](https://www.google.com/search?q=bacon+number+william+rufus+shafter),
if you count the tenuous connection between Theodore Roosevelt and Oprah Winfrey
in [*Food, Inc*](https://en.wikipedia.org/wiki/Food,_Inc).
Since Kevin Bacon is a prolific actor, the theory is that
nearly all actors and actresses are within six degrees of seperation from
Kevin Bacon.
Check out the ["Oracle of Bacon"](https://oracleofbacon.org) to explore more
connections, or just Google ["bacon number *person*"](https://www.google.com/search?q=bacon+number+denzel+washington).
Fortunately, Kevin Bacon's own perspective of the game has taken a [significant
turn for the better](https://www.cnn.com/2014/03/08/tech/web/kevin-bacon-six-degrees-sxsw/index.html).

<p><a href="https://www.wikipedia.org">
<img src="\img\wiki-phil\Wikipedia-logo-v2.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

["Getting to Philosophy"](https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy)
is the Wikipedia version of this game. The idea is that as an encyclopaedia,
most Wikipedia pages have links to more general topics, e.g.
["Stanford University"](https://en.wikipedia.org/wiki/Stanford_University) →
["private university"](https://en.wikipedia.org/wiki/Private_university), with
["Philosophy"](https://en.wikipedia.org/wiki/Philosophy) being the most general topic.
The difference between this and the Kevin Bacon game is that we only use the
*first* link to connect to the next page.
I'll illustrate this with some Wikipedia pages of personal interest:

- [**Lithium-ion battery**](https://en.wikipedia.org/wiki/Lithium-ion_battery) →
[Rechargeable battery](https://en.wikipedia.org/wiki/Rechargeable_battery) →
[Battery (electricity)](https://en.wikipedia.org/wiki/Battery_(electricity)) →
[Electrochemical cell](https://en.wikipedia.org/wiki/Electrochemical_cell) →
[Electrical energy](https://en.wikipedia.org/wiki/Electrical_energy) →
[Electric potential energy](https://en.wikipedia.org/wiki/Electric_potential_energy) →
[Potential energy](https://en.wikipedia.org/wiki/Potential_energy) →
[Energy](https://en.wikipedia.org/wiki/Energy) →
[Physics](https://en.wikipedia.org/wiki/Physics) →
[Natural science](https://en.wikipedia.org/wiki/Natural_science) →
[Science](https://en.wikipedia.org/wiki/Science) →
[Knowledge](https://en.wikipedia.org/wiki/Knowledge) →
[Fact](https://en.wikipedia.org/wiki/Fact) →
[Verificationism](https://en.wikipedia.org/wiki/Verificationism) →
[**Philosophy**](https://en.wikipedia.org/wiki/Philosophy). **14 degrees**
- [**Philadelphia Eagles**](https://en.wikipedia.org/wiki/Philadelphia_Eagles) →
[American football](https://en.wikipedia.org/wiki/American_football) →
[Gridiron football](https://en.wikipedia.org/wiki/Gridiron_football) →
[Football](https://en.wikipedia.org/wiki/Football) →
[Team sport](https://en.wikipedia.org/wiki/Team_sport) →
[Sport](https://en.wikipedia.org/wiki/Sport) →
[Competition](https://en.wikipedia.org/wiki/Competition) →
[Territory (animal)](https://en.wikipedia.org/wiki/Territory_(animal)) →
[Ethology](https://en.wikipedia.org/wiki/Ethology) →
[Scientific method](https://en.wikipedia.org/wiki/Scientific_method) →
[Scientific technique](https://en.wikipedia.org/wiki/Scientific_technique) →
[Systematic process](https://en.wikipedia.org/wiki/Systematic_process) →
[Critical thinking](https://en.wikipedia.org/wiki/Critical_thinking) →
[Objectivity (philosophy)](https://en.wikipedia.org/wiki/Objectivity_(philosophy)) →
[**Philosophy**](https://en.wikipedia.org/wiki/Philosophy). **Also 14 degrees**
- [**Delaware**](https://en.wikipedia.org/wiki/Delaware) →
[U.S. State](https://en.wikipedia.org/wiki/U.S._state) →
[Polity](https://en.wikipedia.org/wiki/Polity) →
[Entity](https://en.wikipedia.org/wiki/Entity) →
[Existance](https://en.wikipedia.org/wiki/Existence) →
[Ontology](https://en.wikipedia.org/wiki/Ontology) →
[**Philosophy**](https://en.wikipedia.org/wiki/Philosophy). **6 degrees**

There are some rules for what counts as the first link:
- It must link to a valid Wikipedia page - no in-page citations, external links,
"meta" Wikipedia pages like
[this one for pronunciation](https://en.wikipedia.org/wiki/Help:IPA/English), etc
- The link can't be in parentheses, since these links typically reference language pages
(see pages like [Science](https://en.wikipedia.org/wiki/Science) or [Egypt](https://en.wikipedia.org/wiki/Egypt))
- The link can't be a previously referenced page, to avoid loops.
If the first link has already been referenced, go to the second link, and so on.

To learn web scraping and Python fundamentals, I wrote a script to automatically find
the degree of seperation between a Wikipedia page and "philosophy".
In this post, I share my results.
Keep in mind I only search the English-language version of Wikipedia
([https://en.wikipedia.org](https://en.wikipedia.org)).

### Random pages

I spent many an hour in high school looking at
[random Wikipedia pages](https://en.wikipedia.org/wiki/Special:Random),
so the first thing I tried is investigating the distribution of degrees of
seperation for 500 random pages.
Check it out here:

<p>
<img src="\img\wiki-phil\random_dist.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

The distribution is [right-tailed](https://en.wikipedia.org/wiki/Skewness) -
most pages are clustered between 8-17 degrees, but there's a long tail of
very distant articles.

Some fun ones:
- At five degrees removed, the closest articles were the novel [*Warbreaker*](https://en.wikipedia.org/wiki/Warbreaker)
and the 1923 silent movie
[*Drifting*](https://en.wikipedia.org/wiki/Drifting_(1923_film)).
Both connected through [genre](https://en.wikipedia.org/wiki/Genre) →
[category](https://en.wikipedia.org/wiki/Category) →
[ontology](https://en.wikipedia.org/wiki/Ontology) →
[philosophy](https://en.wikipedia.org/wiki/Philosophy)
- At 29 degrees removed, the most distant article was
[Chennai Slam](https://en.wikipedia.org/wiki/Chennai_Slam),
the reigning champions of the
[Indian basketball league](https://en.wikipedia.org/wiki/UBA_Pro_Basketball_League)
- Skimming through the random articles, many appeared to be small villages
around the world like
[Deh Sheykh, Sirjan](https://en.wikipedia.org/wiki/Deh_Sheykh,_Sirjan),
international media like
[*Three Plus Two*](https://en.wikipedia.org/wiki/Three_Plus_Two),
or musical groups like
[Dave's True Story](https://en.wikipedia.org/wiki/Dave%27s_True_Story).
The most banal entries I came across were
[banana peel](https://en.wikipedia.org/wiki/Banana_peel) and
[fishing bait](https://en.wikipedia.org/wiki/Fishing_bait).
One that stuck out was
[*Mysterious Castles of Clay*](https://en.wikipedia.org/wiki/Mysterious_Castles_of_Clay).
I also learned about the practice of [eco-running](https://en.wikipedia.org/wiki/Eco-running).

### Top 100 pages

Wikipedia has an article for nearly everything, obscure as it may be.
How does this distribution change when we look at the most popular
Wikipedia articles?
The below plot shows the distribution of the
[100 most popular pages on Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Multiyear_ranking_of_most_viewed_pages#Top-100_list):

<p>
<img src="\img\wiki-phil\top100_dist.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

The distributions are similarly shaped.
We can look at the population statistics to more quantitatively
compare this distribution to the distribution of random pages:

<table style="width:50%; margin-left: auto; margin-right: auto;">
  <thead>
    <tr>
      <th>Statistic</th>
      <th>Random pages</th>
      <th>Top 100 pages</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td style="text-align:center">Mean</td>
  	  <td style="text-align:center">13.6</td>
      <td style="text-align:center">12.9</td>
    </tr>
    <tr>
      <td style="text-align:center">Median</td>
      <td style="text-align:center">13</td>
      <td style="text-align:center">12</td>
    </tr>
    <tr>
      <td style="text-align:center">Mode</td>
      <td style="text-align:center">12</td>
      <td style="text-align:center">10</td>
    </tr>
    <tr>
      <td style="text-align:center">Minimum</td>
      <td style="text-align:center">5</td>
      <td style="text-align:center">5</td>
    </tr>
    <tr>
      <td style="text-align:center">Maximum</td>
      <td style="text-align:center">29</td>
      <td style="text-align:center">27</td>
    </tr>
  </tbody></table>

<br>
Overall, the distribution of top 100 is centered slightly to the left of the random distribution.
I attribute this to fewer "out there" articles compared to the population of
random pages.

Is there a relationship between degrees of seperation and page rank?
Just for fun, I made an interactive plot below to investigate this.
Hover over a point to learn more about it,
and click on a point to go to its Wikipedia page.

{% include top100.html %}

<br>
As to be expected, there's no relationship between page rank and degrees from
"philosophy".

There were six pages that were five degrees from "philosophy" - five of
which are TV shows
([*The Big Bang Theory*](https://en.wikipedia.org/wiki/The_Big_Bang_Theory),
[*Game of Thrones*](https://en.wikipedia.org/wiki/Game_of_Thrones),
[*How I Met Your Mother*](https://en.wikipedia.org/wiki/How_I_Met_Your_Mother),
[*Breaking Bad*](https://en.wikipedia.org/wiki/Breaking_Bad), and
[*Lost*](https://en.wikipedia.org/wiki/Lost_(TV_series))) -
all of which connected through the
[genre](https://en.wikipedia.org/wiki/Genre) →
[category](https://en.wikipedia.org/wiki/Category) →
[ontology](https://en.wikipedia.org/wiki/Ontology) →
[philosophy](https://en.wikipedia.org/wiki/Philosophy)
connection documented earlier.
Interestingly, the page in the top 100 with the highest "philosophy number" (27)
was also a TV show - [*Glee*](https://en.wikipedia.org/wiki/Glee_(TV_series)).
For whatever it's worth (read: very little), the second-highest-ranking page,
[Donald Trump](https://en.wikipedia.org/wiki/Donald_Trump), is equally removed
from "philosophy" than the third-highest-ranking page,
[Barack Obama](https://en.wikipedia.org/wiki/Barack_Obama).

### Categories

Wikipedia also maintains a
[list](https://en.wikipedia.org/wiki/Wikipedia:Multiyear_ranking_of_most_viewed_pages#Countries)
of the 30 most popular pages in 15 different categories.
We can characterize the distributions of degrees of seperation for the pages
in each category with a boxplot:

<p>
<img src="\img\wiki-phil\categories_boxplot.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

[Sports teams](https://en.wikipedia.org/wiki/Wikipedia:Multiyear_ranking_of_most_viewed_pages#Sport_teams)
have the closest distribution, since many of the teams are
association football ("soccer") teams that follow the same path to "philosophy".
As we've already seen, the ["Films and TV series"](https://en.wikipedia.org/wiki/Wikipedia:Multiyear_ranking_of_most_viewed_pages#Films_and_TV_series)
category has the largest distribution.


Since the above page lists the popularity of each page in each category,
we can also characterize the popularity of each category.
Below is a bar chart showing the page popularity of the 1<sup>st</sup>,
10<sup>th</sup>, and 30<sup>th</sup> most popular pages in each category.
The top page in each category is displayed in the label.

<p>
<img src="\img\wiki-phil\categories_popularity.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

I was surprised by two results:
- The popularity of countries. Wouldn't Wikipedia's most popular page,
[the United States](https://en.wikipedia.org/wiki/United_States),
have very general information that's not of interest to the casual Wikipedian?
I typically go to Wikipedia to find very specific information.
But I can see the US page's popularity coming from school reports, etc.
- The popularity of, well, popular people
(singers, actors, sportsmen, bands).
[Michael Jackson](https://en.wikipedia.org/wiki/Michael_Jackson) is at \#6,
[Lady Gaga](https://en.wikipedia.org/wiki/Lady_Gaga) at \#9, and
[Eminem](https://en.wikipedia.org/wiki/Eminem) at \#10.
While I'd expect Google queries to be high for these cultural icons, I didn't
expect Wikipedia to be such a prominent source for information.
Of course, the entertainers at the top of the list are all American,
which is partially influenced by using the English-language version of Wikipedia
and widespread, high-quality internet access in America.

### Coding

This exercise was a good "weekend project" introduction to commonly-used
Python packages like
[BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) (web scraping),
[pandas](https://pandas.pydata.org) (data frames),
[matplotlib](https://matplotlib.org) (plotting), and
[bokeh](https://bokeh.pydata.org/en/latest/) (interactive web plots).
The GitHub repository is
[here](https://github.com/petermattia/wikipedia-degrees-of-sep-philosophy).
