---
layout: post
categories: articles
title: "Galvanostatic simulation web app"
date: 2018-03-06
description: Introducing my galvanostatic simulation web app, built with plotly.js
tags: code science
---

Two updates on my cyclic voltammetry simulation:
1. I've completed the [simulation tutorial](/cyclic_voltammetry_simulation/simulation.html).
This process really helped me understand the underlying equations behind these
simulations.
As a result, I found some inconsistencies in previous versions of the code and app.
**If you're using a version before version 2.0, or code with a date earlier than 9/24, please update to the latest version.**

2. I also ported my MATLAB app to the web! You can find it
[here](/cyclic_voltammetry_simulation/cvwebapp.html).
I hope this web app can increase the accessibility of simple electrochemical
simulations.

<p>
<a href="/cyclic_voltammetry_simulation/cvwebapp.html">
<img src="/img/CVsimplotly.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

This simulation was built with the same tools as my cyclic voltammetry
simulation - more info [here](/articles/2017/09/24/cyclic-voltammetry-web-app.html).
If you're interested, the source code for the
[front end](https://github.com/petermattia/petermattia/blob/master/_galvanostatic_simulation/galvanostaticwebapp.md)
and the [back end](https://github.com/petermattia/petermattia/blob/master/assets/galv_sim.js) is on GitHub.
