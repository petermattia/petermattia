---
layout: post
categories: articles
title: "Adding milk to coffee: An optimization problem"
date: 2021-10-30
description: Quick simulations on the best time to add milk to coffee
tags: science
---

On a recent road trip with friends, we debated the optimal time to add 
milk to coffee to reach a comfortable drinking temperature
(wait, this isn't a typical road trip conversation?).
To settle the debate, I ran a quick thermal model of radiative cooling of coffee.
See the details and assumptions in [this notebook](https://github.com/petermattia/coffee-and-milk-cooling/blob/main/coffee_cup_cooling.ipynb); I'll just briefly go over the results here.

First, I modeled coffee cooling without milk.
Note that because I only model radiative cooling from the top of the cup,
the cooling is pretty slow (~3 hours to reach a comfortable cooling temperature):
<p>
<img src="/img/coffee_and_milk/coffee_no_milk.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

Then, I modeled the addition of a ["splash"](https://www.mirror.co.uk/news/uk-news/experts-reveal-difference-between-splash-12398376) of milk at 1 hr. The cooling time actually increases slightly
because I model slighly lower [emissivity](https://en.wikipedia.org/wiki/Emissivity)
for coffee with milk than black coffee.
<p>
<img src="/img/coffee_and_milk/coffee_withmilk_1hr.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

Finally, I modeled a variety of milk insertion times. Overall, the differences are small:
<p>
<img src="/img/coffee_and_milk/coffee_withmilk_alltimes.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

We can now plot "time to ideal drinking temperature" vs. "milk insertion time".
The optimum is at ~2.75 hours --- i.e., the time at which the addition of the 
milk immediately brings the coffee to a comfortable drinking temperature.

<p>
<img src="/img/coffee_and_milk/t_ideal_vs_t_insertion.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

Perhaps counterintuitively, the best time to insert your milk into your coffee is after it has cooled for some time. This result holds because the radiative heat transfer is fastest when the temperature gradient between the coffee and ambient is largest, which occurs at the beginning of the cooling process.
However, the difference is pretty small overall given the conservative cooling model used in these simulations.

I drink very little coffee, but hope this helps someone else!
