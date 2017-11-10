---
layout: post
categories: articles
title: Automating science
date: 2017-09-18
description: Thoughts on accelerating scientific innovation through automation
tags: science
---

Like everyone else, I wish I had more time -
there's too much to do with only 24 hours a day!
If graduate school has taught me one thing, it's the value of time.
Yet I spend much of my research time doing low-level tasks,
like ordering supplies, preparing samples, and converting files.
Life is too short to do these low-level chores over and over again.

Which is why, as a graduate student, I'm very excited for increased automation in science.
Unlike, say, customer service, science is an ideal field for automation:
removing the human element from science is often an asset!
Automation promises higher sample throughput, precision, reproducibility, and
analytic rigor; lower cost-per-experiment and human bias;
and, importantly, more efficient use of human time.

In this post, I'll discuss three categories of automation in science:
automated **data processing & analysis**, automated **experimentation**,
and automated **everything**.
I distinguish autonomous science from purely computational approaches like
the [Materials Project](https://www.materialsproject.org);
while these initiatives certainly have a role to play,
I'm an experimentalist, so I'm more excited by automating empirical science.

### Automated data processing & analysis

The first level of automation in science is automated data processing and analysis. This level is purely software-based.
Automated data *processing* and automated data *analysis* are related but distinct.

Automated data processing saves human scientists significant time
by reducing the low-level data conversion overhead.
Often, scientific instrumentation saves data in obtuse formats,
and it can take hours to extract data into a usable format,
let alone extract meaningful insight.
The time savings can be massive - the process of
["data wrangling"](https://en.wikipedia.org/wiki/Data_wrangling) in
data science often takes 90% of the analysis time, and I imagine a similar
ratio for battery analysis.

<p>
<a href="https://www.voltaiq.com">
<img src="/img/automating-science/voltaiq.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

In my field of battery research, [Voltaiq](https://www.voltaiq.com)
specializes in automated data processing.
Different battery cyclers (potentiostats) save data in a variety of
different spreadsheet formats.
The main challenge is that the "units" of interest, single cycles, run together
in a spreadsheet format.
Separating cycles can be difficult to automate if the electrochemical conditions
are changing with each experiment.
Voltaiq provides a cloud-based interface to quickly and automatically
visualize key figures, saving battery scientists hours per day.

Autonomous data analysis is essentially artificial intelligence,
in which a computer makes decisions on data.
Of course, AI is widely employed for rapid decision-making
in the technology and financial industries today,
with spam filtering, online advertising, and high-frequency trading as canonical examples.
The role of AI-enabled automation in scientific decision-making was recently profiled
by [*Science* magazine](http://science.sciencemag.org/content/357/6346)
(content behind paywall).
AI-driven scientific analysis is best suited for optimization problems
over a large parameter space, in which knowing the optimum can reveal insight
into fundamental mechanisms that underpin the system.
However, in the physical sciences, we often just want automated analysis,
since the experiments are carefully constructed to test specific hypotheses.

### Automated experimentation

Automated experimentation, or **high-throughput testing**, is a seperate aspect
of scientific automation.
Recent advances in robotics enable recent high-throughput experiments.
The robot can *operate* a scientific instrument, as in a humanoid robot,
or it can *be* a scientific instrument, as in an assembly line process.
Advantages of high-throughput testing include speed, cost, precision, and
reproducibility.

<p>
<a href="http://pubs.acs.org/doi/abs/10.1021/acscombsci.6b00153">
<img src="/img/automating-science/combinatorial.gif" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

A related field is
[combinatorial chemistry](https://en.wikipedia.org/wiki/Combinatorial_chemistry),
or systematic exploration of a synthesis parameter space.
[ACS Combinatorial Science](http://pubs.acs.org/journal/acsccc) highlights
work in this area.
The goal is often to fully populate a parameter space, such as a phase diagram.
Combinatorial science is especially well-suited for solution chemistry,
as the robotics of liquid handling are relatively simple.
For example, the [Andrew Alliance](https://www.andrewalliance.com) has developed a
 pipetting robot at an accessible price point.

<p>
<a href="http://www.wildcatdiscovery.com">
<img src="/img/automating-science/wildcat.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

In the battery space,
[Wildcat Discovery Technologies](http://www.wildcatdiscovery.com/) performs
high-throughput experiments to optimize battery components, including
electrode powders and liquid electrolytes. Their secret sauce is developing
robotically-assembled electrochemical cells.

As a graduate student studying batteries, I'm particulary excited
by high-throughput experimentation methods in battery science to reduce the
"drudgery" of routine lab work, not to mention the throughput and yield advantages.
While I enjoyed making [coin cells](https://en.wikipedia.org/wiki/Button_cell)
(mini-batteries for research purposes)
when I joined the lab, the novelty quickly wore off;
now, as I near my 1000<sup>th</sup> cell, making coin cells is
most definitely work - especially when I need 50 identical cells at once.

### Automated everything

"Automated everything" is combining the two levels above, and then some.
"Automated everything" is more commonly called **"closed-loop testing**", since
the autonomous system can "close the loop" by automatically generating
hypotheses, results, and insight, and then repeating until it
reaches a satisfactory answer.
Closed-loop testing is best suited for optimization problems
over a parameter space, in which the physical apparati and problem structure
are well defined.

<p>
<a href="http://science.sciencemag.org/content/324/5923/85.full">
<img src="/img/automating-science/adam.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

The first reference to a "robot scientist" that I could find is
[Adam](https://en.wikipedia.org/wiki/Robot_Scientist).
Published in
[*Nature*](https://search.proquest.com/docview/204547838)
and
[*Science*](http://science.sciencemag.org/content/324/5923/85.full),
Adam optimizes the growth of microbial cell cultures by changing
the genotype and environment, a multi-dimensional parameter space.
Adam made over 7 million optical density measurements - a feat that would
take years to perform manually.
The second-generation robot, [Eve](http://www.cam.ac.uk/research/news/artificially-intelligent-robot-scientist-eve-could-boost-search-for-new-drugs), innovates over Adam by more efficiently sampling the parameter space.

<p>
<a href="https://www.zymergen.com">
<img src="/img/automating-science/zymergen.png" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

[Zymergen](https://www.zymergen.com) is a startup pursuing automated science
for high-throughput biology to improve the productivity of industrial
microbes.
Zymergen's CEO describes their results improving microbial strains that are
already "highly optimized" in the company's [*Science* profile](http://science.sciencemag.org/content/357/6346/18.full):
>So far, Hoffman says, Zymergen's robotic lab has boosted the efficiency of
>chemical-producing microbes by more than 10%.
>That increase may not sound like much,
>but in the <span class="tex2jax_ignore">$</span>160-billion-per-year sector of the chemical industry
>that relies on microbial fermentation, a fractional improvement
>could translate to more money than the entire <span class="tex2jax_ignore">$</span>7 billion annual
>budget of the National Science Foundation.

I like the author's description of the suitability of closed-loop testing for
"essentially any complex optimization problem for which improvement is well-defined."

Closed-loop testing enables a scientific ["4th paradigm"](https://en.wikipedia.org/wiki/Data_science),
 as captured by this quote from Zymergen's ["What we do"](https://zymergen.com/what-we-do/) page:

>We replace the hypothesis-driven method with a systematic test-everything approach that lets the data speak for itself.

This "data-driven" method reminds me of the ["Edisonian approach"](
https://en.wikipedia.org/wiki/Edisonian_approach).
For problems with high dimensionality, the data-driven approach may be required
when human intuition can neither generate experimental data with reasonable time
and cost constraints
nor make sense of the problem's complexity.

To my knowledge, no one has attempted closed-loop testing for optimizing batteries yet...
