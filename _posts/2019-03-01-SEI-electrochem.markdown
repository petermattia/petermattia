---
layout: post
categories: articles
title: "Papers published: SEI kinetics via electrochemistry"
date: 2019-03-01
description: Electrochemical kinetics of SEI growth, Parts I and II
tags: science
---

My [first first-author publication in graduate school](https://dx.doi.org/10.1149/2.0231904jes)
was recently published in the *Journal of the Electrochemical Society*,
along with a [follow-up paper](https://dx.doi.org/10.1149/2.0241904jes)
lead by our collaborators at MIT.
I started this project when I started graduate school,
and while it was a long road to publication,
I'm quite pleased with the outcome.

The goal of this work is to study the "solid-electrolyte interphase", or SEI.
The SEI is probably the most common failure mode for lithium-ion batteries
in use today; it's almost certainly why the battery on your cell phone or
laptop only lasts a few years.
Its growth is not too different from that of a rusting nail;
the formation of rust (Fe<sub>2</sub>O<sub>3</sub>) consumes iron (Fe),
but the rust also prevents more rust from growing. Similarly, SEI consumes
lithium, which reduces the available capacity in your battery,
but its growth also prevents more SEI from forming.

The SEI is historically difficult to characterize—in fact,
[a prominent battery scientist once wrote that](https://dx.doi.org/10.1021/cr500003w)
"the more we learn about SEI, the more we know how little we understand it."
This layer is very thin (around 10,000 times thinner than a human hair)
and extremely sensitive to water and oxygen.
The delicate nature of the SEI means that in the process of
opening up a battery and looking at its SEI, we often destroy it.
While the SEI has been widely studied, the scientific community
has no clear consensus on its behavior.

In this work, we study SEI growth via careful electrochemical measurements.
This approach has two key advantages: electrochemistry is nondestructive,
meaning we can have high confidence in our results, and quantitative,
meaning we can make accurate comparisons between different usage conditions.
In [Part I](https://dx.doi.org/10.1149/2.0231904jes), we develop a technique to probe SEI growth as the battery is
cycling.
We then developed a detailed model that helps explain our results in
[Part II](https://dx.doi.org/10.1149/2.0241904jes).

Our most interesting result was highly surprising: we found that SEI growth
is strongly dependent on current direction (see below plot).
In other words, **SEI grows much more quickly during charging than discharging.**
Charging and discharging are often considered symmetric processes,
but this result reveals that SEI growth is highly asymmetric;
growth during discharge is negligible.
We also found that the faster you charge your battery, the faster the SEI
grows—a big problem for devices that rely on fast charging, like electric vehicles.

This work is a big step forward in our fundamental understanding
of SEI growth.
On the more practical side, we are now applying these insights
to design better battery management systems.

<p>
<img src="/img/SEIgrowthrate_Crate.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>
