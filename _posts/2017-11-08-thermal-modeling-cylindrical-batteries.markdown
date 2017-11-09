---
layout: post
categories: articles
title: Thermal modeling of cylindrical batteries
date: 2017-11-08
description: Using MATLAB to do simple thermal modeling of cylindrical batteries
tags: science
---

<img src="\img\thermal-modeling\A123_18650_v2.jpeg" style="display:block; margin-left: auto; margin-right: auto;">

I've recently created simple simulations of heat transfer within

### Future work
This simulation is essentially the simplest thermal model of a battery you can create.
Additional refinements include:
- Solve the PDE including the $ z $ dependence of heat generation to include
  cooling from the caps
- Develop a more sophisticated model for heat generation that includes
  additional heat generation terms (entropic heating, etc) and state-of-charge
  dependence
- Account for the stainless steel core and can

However, I've enjoyed creating this model, and I think it nicely illustrates
the power of simple simulations to guide thinking of a problem.
