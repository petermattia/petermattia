---
layout: post
categories: articles
title: Cyclic voltammetry simulation error
date: 2020-09-20
description: Error in cyclic voltammetry simulation
tags: code science
---

To users of my cyclic voltametry code: I have fixed some errors related to
the units of the concentration term and the current:

1. The default value of concentration was previously 1 mol/cm^3, which is unphysical.
The default value of concentration is now 1 mol/L (i.e. 1 M).
2. This concentration is subsequently divided by 1000 to convert to mol/cm^3,
since cm is the default unit of length.
3. The final current is divided by 100 to convert from from A/cm^2 to mA/cm^2.

The net effect of these changes is a 10x change in the magnitude of the reported current.

I believe I have addressed this error throughout my website, MATLAB app, etc.

Thanks to both Leonard Bezinge and
[Hans-Georg Steinrück](https://chemie.uni-paderborn.de/en/steinrueck)
for alterting me to this error.
