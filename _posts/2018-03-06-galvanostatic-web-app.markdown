---
layout: post
categories: articles
title: "Galvanostatic simulation web app"
date: 2018-03-06
description: Introducing my galvanostatic simulation web app, built with plotly.js
tags: code science
---

Recently, I've encountered some subtle differences between experiments
probed via cyclic voltammetry and via constant-current (galvanostatic)
conditions. To help understand the differences,
I've created another online simulation for galvanostatic
electrochemistry, which lives
[here](/galvanostatic_simulation/galvanostaticwebapp.html).
I hope this web app can increase the accessibility of simple electrochemical
simulations.

<p>
<a href="/galvanostatic_simulation/galvanostaticwebapp.html">
<img src="/img/galvsimplotly.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

The simulation tutorials are still in progress.

This simulation was built with the same tools as my cyclic voltammetry
simulation---more info [here](/articles/2017/09/24/cyclic-voltammetry-web-app.html).
If you're interested, the source code for the
[front end](https://github.com/petermattia/petermattia/blob/master/_galvanostatic_simulation/galvanostaticwebapp.md)
and the [back end](https://github.com/petermattia/petermattia/blob/master/assets/galv_sim.js) is on GitHub.
