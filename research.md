---
layout: page
title: Research
permalink: /research/
order: 2
---

[See my current publications here](/publications)

Broadly, my career has focused on lithium-ion battery lifetime, failure, quality, and reliability,
with an emphasis on data-driven techniques.

## Tesla
As a member of the Cell Qualification team, I worked at the intersection of lab testing, cell production,
and field quality to understand and prevent key lithium-ion battery failure modes.
In addition, my team developed data-driven techniques for characterizing
cell performance, lifetime, quality, and variabiliity.

## Graduate school
As a PhD student in the [Stanford Department of Materials Science and Engineering](https://mse.stanford.edu),
I worked with [Prof. William Chueh](https://chuehlab.stanford.edu) on
**making lithium-ion batteries last longer** and **charge faster.**
My work aimed to combine fundamental and applied approaches to
study battery degradation.

My primary projects included:

1. **Data-driven mehtods for predicting and optimizing battery lifetime during fast charging.**
Fast charging is important for widespread adaptation of electric vehicles, but it
generally reduces battery lifetime.
Multistep charging protocols can achieve both low charging time and high lifetime,
but this optimization problem is expensive due to the long testing time
and large number of experiments required.
In our work, [we first developed machine learning models to predict the final lifetime (1000s of cycles) using data from the first 100 cycles.](/articles/2019/04/09/data-driven.html)
Then, [we used optimal experimental design to efficiently find the highest-lifetime charging protocols.](/articles/2020/02/27/closed-loop-optimization.html)
This work was published in [*Nature*](https://doi.org/10.1038/s41586-020-1994-5)
and [*Nature Energy*](https://doi.org/10.1038/s41560-019-0356-8)
and covered by outlets such as
[*WIRED*](https://www.wired.com/story/ai-is-throwing-battery-development-into-overdrive/)
and the [*WSJ*](https://www.wsj.com/articles/electric-car-batteries-get-a-boost-from-artificial-intelligence-11604422792). 

    ![OED](/img/OED_figure.svg)

2. **Characterizing the growth of the
[solid-electrolyte interphase](https://en.wikipedia.org/wiki/Lithium-ion_battery#Electrolytes) (SEI).**
SEI growth is a major degradation mode in lithium-ion batteries.
This process is similar to iron oxidation (i.e. rusting); a surface layer forms that both
consumes material (lithium or iron) and also prevents further growth (termed self-passivation).
We characterized SEI growth via both
[microscopic](/articles/2019/08/20/SEI-cryo.html) and 
[electrochemical](/articles/2019/03/01/SEI-electrochem.html) techniques.
Notably, we discovered that the growth of this layer occurs much faster during battery charging
than battery discharging.

    ![SEI](/img/SEI.svg)
