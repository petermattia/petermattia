---
layout: post
categories: articles
title: "Paper published: Fast battery formation"
date: 2021-06-06
description: Understanding the fundamentals of battery formation
tags: publications science
---

I just published a paper from my graduate work entitled ["Benefits of Fast Battery Formation in a Model System"](https://doi.org/10.1149/1945-7111/abff35). This work explores the fundamentals of ithium-ion battery formation on carbon black, my go-to model system for studying SEI growth.

Though the paper is dense, I think these findings are exciting! Battery formation is among the most important components of battery manufacturing due to its impact on energy density, lifetime, and cost. Some previous work like [An et al.](https://doi.org/10.1016/j.jpowsour.2017.01.011) found fast formation could outperform slower formation protocols on these metrics, but not much is known about the fundamentals of this process.

Here, we separate the formation cycle into two steps: above 0.5 V vs Li/Li$^{+}$ (what we call “EC reduction”) and below 0.5 V vs Li/Li$^{+}$ (voltage regimes of typical SEI growth). Our key finding is that the products of EC reduction do *not* impact the passivation ability of the first cycle SEI — only the SEI formed at low potentials provides passivation (as quantified by the second-cycle Coulombic efficiency). In the below figure, you can see how only the formation capacity below 0.5 V is correlated with the second-cycle Coulombic efficiency:

<p>
<img src="/img/formation.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

Furthermore, we find that high currents and low temperatures suppress the EC reduction reaction; thus, using these conditions in the regime of this reaction can lead to improved energy density and cost, with no impact on lifetime! We also find that the low potential reactions can also be optimized — there’s a sweet spot where we can minimize the first cycle and second cycle losses. The bottom line is there is plenty of room to optimize battery formation from first principles.

The data and code used to generate the figures is available [here](https://github.com/petermattia/first-cycle-SEI-on-carbon-black).
