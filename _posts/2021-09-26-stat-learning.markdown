---
layout: post
categories: articles
title: "Paper published: Statistical learning for battery lifetime prediciton"
date: 2021-09-26
description: Statistical learning for battery lifetime prediciton
tags: publications science machine-learning
---

I just published a paper work entitled ["Statistical Learning for Accurate and Interpretable Battery Lifetime Prediction"](https://doi.org/10.1149/1945-7111/ac2704) with [Kristen Severson](https://kseverso.github.io) and [Jeremy Witmer](https://scholar.google.com/citations?user=szQebygAAAAJ&hl=en). This work builds on [my class project](http://cs229.stanford.edu/proj2018/report/206.pdf) for [CS229](http://cs229.stanford.edu), where we explored concepts building on the work of [Severson et al.](https://doi.org/10.1038/s41560-019-0356-8), and answers some of the remaining questions I had about our original paper after it was published.

Some of the ideas and results presented in this work:
1. "Capacity matrices" ([Figure 1](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f1)) are a compact, easy-to-visualize, machine-learning-ready format for storing battery cycling data
2. Downsampling ([Figure 2](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f2)) can make battery cycling datasets much more compact
(could be useful for very large datasets)
3. Univariate models ([Figure 3](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f3)) can perform very well on this dataset; furthermore,
the interquartile range statistic slightly outperforms variance (gasp!)
4. Simple multivariate models ([Figures 5](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f5)--[6](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f6)) perform pretty well and reveal some interesting trends into the voltage curves (I'm confident they mean *something*, but not sure quite what yet)
5. Deep learning models perform similarly to the simpler statistical learning 
models ([Figure 7](https://iopscience.iop.org/article/10.1149/1945-7111/ac2704#jesac2704f7)), despite the fact that the vast majority of follow-up papers to
[Severson et al.](https://doi.org/10.1038/s41560-019-0356-8) uses deep learning

At the very least, I hope this paper inspires others to consider simple models before 
jumping to deep learning. Starting simple, after all, is good scientific practice.
However, if deep learning models are used, training a statistical learning model in parallel
is worthwhile to benchmark the performance of the complex model.

Unfortunately, the header formatting got messed up in the proof stage 
(many headers got demoted to subheaders);
hopefully the intended logic is easy to follow.

Lastly, many students have contacted me about the slow response time to get an
academic license for the code in [Severson et al.](https://doi.org/10.1038/s41560-019-0356-8)
While I'm unfortunately unable to do much to address that issue, this 
paper does not face this licensing limitation.
The data and code used to generate the figures is available [here](https://github.com/petermattia/revisit-severson-et-al); [this notebook](https://github.com/petermattia/revisit-severson-et-al/blob/main/revisit-severson-et-al.ipynb) contains nearly all of the code used to generate the figures.
The paper is also open-access.
