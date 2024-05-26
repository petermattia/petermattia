---
layout: post
categories: articles
title: Some open questions in battery electrochemistry
date: 2024-03-03
description: Research topics for battery lifetime
tags: science
---

I have two big open questions from my battery electrochemistry research.
As my career is heading in a different direction for the time being, I'm posting them here in the off chance that someone pursues them.
I think these questions should be tackled via both experiment and modeling.

**1. Understanding the asymmetry in current direction of SEI growth**

In my [first publication](https://iopscience.iop.org/article/10.1149/2.0231904jes) as a first author in graduate school, we found that SEI growth is strongly dependent on current direction (see below plot).
In other words, SEI grows much more quickly during charging than discharging.
Charging and discharging are often considered symmetric processes, but this result reveals that SEI growth is highly asymmetric; growth during discharge is negligible.
We also found that the faster you charge your battery, the faster the SEI grows—a big problem for devices that rely on fast charging, like electric vehicles.
A summary of this work can be found [here](https://petermattia.com/articles/2019/03/01/SEI-electrochem.html).

<p>
<img src="/img/SEIgrowthrate_Crate.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

We attempted to explain this phenomenon via a model [here](https://iopscience.iop.org/article/10.1149/2.0241904jes),
although this model is difficult to experimentally validate (beyond phenomenologically matching the empirical results).

When I present this work, a common response is that this effect was observed in carbon black, which has different properties
than graphite.
While I certainly agree, I believe this effect is interesting and important enough to understand even if we only observed it in carbon black.
That said, we also observed this effect in graphite: see Figure 8.7 in my [thesis](https://searchworks.stanford.edu/view/13335784).

<p>
<img src="/img/open-echem-questions/figure8_7_thesis.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

If we accept these observations at face value, this effect has significant implications for battery degradation.
First, we shouldn't worry much about SEI growth during discharging and only consider SEI growth during charging.
Second, we should incorporate the additional SEI growth induced by fast charging into fast charging optimization models.

**2. Understanding the "covering layer"**

We discussed the "covering layer" effect in our ["knees" paper](https://iopscience.iop.org/article/10.1149/1945-7111/ac6d13).
Briefly, we found many, many papers that experimentally observed its presence, but the root cause is unclear.
Here's the relevant section from the text:

<p>
<img src="/img/open-echem-questions/covering_layer_text.png" style="display:block; margin-left: auto; margin-right: auto;">
</p>

And the figure:

<p>
<img src="/img/open-echem-questions/jesac6d13f16_hr.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</p>

I believe that this failure mode is underappreciated in the literature and is important to understand in greater detail.
