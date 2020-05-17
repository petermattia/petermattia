---
layout: post
categories: articles
title: "Paper published: Closed-loop optimization of fast-charging protocols for batteries with machine learning"
date: 2020-02-27
description: Machine learning for battery fast charging published in <i>Nature</i>
tags: publications science machine-learning
---

<iframe width="728" height="410" src="https://www.youtube.com/embed/5K_uDQCVxjo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

I'm excited to announce that our paper (co-led with
[Aditya Grover](https://aditya-grover.github.io))
on using machine learning to optimize battery fast charging
was recently published in [*Nature*](https://doi.org/10.1038/s41586-020-1994-5)!
This work has been featured by
[Stanford News](https://news.stanford.edu/2020/02/19/machine-learning-speed-arrival-ultra-fast-charging-electric-car/) and the
[*Nature* podcast](https://www.nature.com/articles/d41586-020-00482-x).

Many battery development challenges are slow due to both the *length* and the *number* of required experiments.
The above video highlights our approach as applied to battery fast charging.
To reduce the length of each experiment, we use the early prediction approach
from [our previous work](/articles/2019/04/09/data-driven.html).
To reduce the number of required experiments, we use
[Bayesian optimization](https://en.wikipedia.org/wiki/Bayesian_optimization),
which helps us intelligently choose the next protocols to test.
This approach allowed us to efficiently search over 224 charging protocols
to find those with high lifetime.

I'm excited by this work because it illustrates how machine learning methods
can dramatically reduce testing times;
optimistically, machine learning can speed up the scientific method itself.
I'm convinced that exciting times are ahead for the burgeoning AI + science field!
