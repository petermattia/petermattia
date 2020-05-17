---
layout: page
title: Research
permalink: /research/
order: 2
---

[See my current publications here](/publications)

As a PhD student in the Stanford Department of Materials Science and Engineering,
I worked with [Prof. William Chueh](https://chuehlab.stanford.edu) on
**making lithium-ion batteries last longer** and **charge faster.**
My work aimed to combine bottom-up and top-down experiments to
study degradation in carbon anodes.

My primary projects included:

1. **Characterizing the growth of the
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

2. **Optimizating fast-charging protocols for commercial batteries.**
Fast charging is important for widespread adaptation of electric vehicles, but it
generally reduces battery lifetime.
Multistep charging protocols can achieve both low charging time and high lifetime,
but this optimization problem is expensive due to the long testing time
and large number of experiments required.
In our work, [we first developed machine learning models to predict the final lifetime (1000s of cycles) using data from the first 100 cycles.](/articles/2019/04/09/data-driven.html)
Then, [we used optimal experimental design to efficiently find the highest-lifetime charging protocols.](/articles/2020/02/27/closed-loop-optimization.html)
By reducing the number of cycles required per experiment (using early prediction)
and the total number of experiments (using optimal experimental design),
we can optimize previously intractible battery challenges in a fraction of the time.

    ![OED](/img/OED_figure.svg)
