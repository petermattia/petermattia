---
layout: page
categories: articles
title: Cyclic Voltammetry App
---

Recently, my battery research has taken a dive into fundamental electrochemistry -
charge-transfer vs mass-transfer, reversibility, asymmetry, etc. I found myself
frequently confused by these terms and concepts, without a good resource to
develop my understanding. Of course,
[Bard and Faulkner](https://www.amazon.com/Electrochemical-Methods-Fundamentals-Allen-Bard/dp/0471043729)
is an essential reference for electrochemists, but I've found it a better
reference textbook than a "learning" textbook.

With help from a post-doc in my lab (who took Allen Bard's
electrochemistry class at UT Austin!),
I built a MATLAB app to help me better understand simple electrochemistry.
The simulations are derived from Appendix B of Bard and Faulkner.
Check out a screenshot below:

![Screenshot]({{ site.url }}/assets/CVsimscreenshot.png)

You can download the app on the [MATLAB File Exchange](https://www.mathworks.com/matlabcentral/fileexchange/64011-cyclic-voltammetry-simulator)
and on [GitHub](https://github.com/petermattia/Cyclic-Voltammetry-Simulator).

Building the app itself was actually pretty easy and fun, thanks to MATLAB's
[App Designer](https://www.mathworks.com/products/matlab/app-designer.html).
In this tutorial, however, I'll just focus on explaining the electrochemical
simulation itself. Equations and discussion will be cross-referenced
to Bard and Faulkner, 2<sup>nd</sup> edition, with links to Wikipedia.

[Fundamental electrochemistry](/cyclic_voltammetry_simulation/fundamentals.html)

[Simulation](/cyclic_voltammetry_simulation//simulation.html)

[Code](/cyclic_voltammetry_simulation/code.html)
