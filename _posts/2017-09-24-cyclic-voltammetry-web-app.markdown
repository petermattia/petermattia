---
layout: post
categories: articles
title: "Cyclic voltammetry simulation web app"
date: 2017-09-24
description: Introducing my cyclic voltammetry web app, built with plotly.js
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

For some technical background on how I built it:
I tried a few different online charting libraries before settling on
[plotly.js](https://plot.ly/javascript/).
I was initially interested in
[bokeh-server](https://bokeh.pydata.org/en/latest/docs/user_guide/server.html#userguide-server-applications)
after seeing their
[demo apps](https://demo.bokehplots.com/apps/sliders).
However, setting up a full server was overkill for this purpose.
I then looked at two other Javascript charting libraries.
[C3.js](http://c3js.org) seemed well-suited for my application, but
I couldn't easily format the axes and legend, and the defaults didn't look good.
Next, I tried [Chart.js](http://www.chartjs.org),
but it doesn't nativly support plotting standard *xy* data
(it supports *xy* pairs, which is less functional than plotting separate
*x* and *y* vectors).
The [plotly.js](https://plot.ly/javascript/) library was very straightforward
to set up and had built-in functionality for saving figures and data -
it was clearly designed for scientific applications like my own.
Lastly, I used the [math.js](http://mathjs.org) library for some array
manipulations and the [w3.css](https://www.w3schools.com/w3css/default.asp)
CSS library to create the buttons.

If you're interested, the source code for the
[front end](https://github.com/petermattia/petermattia/blob/master/_cyclic_voltammetry_simulation/CVwebapp.md)
and the [back end](https://github.com/petermattia/petermattia/blob/master/assets/CVsim.js) is on GitHub.
