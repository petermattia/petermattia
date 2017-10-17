---
layout: page
categories: articles
title: "Chemical and electrochemical reversibility"
description: Tutorial on chemical and electrochemical reversibility in cyclic voltammetry simulations
---

[//]: # 20170809 Peter A 17Su electrochem fundementals

## UNDER CONSTRUCTION

My research has started involving various forms of reversibility and asymmetry
in electrochemistry.
In my quest to make sense of it all, I developed
[cyclic voltammetry simulations](/cyclic_voltammetry_simulation\index)
to help me better understand these concepts.
As I was reading more about these topics, I encountered
[this page](http://www.asdlib.org/onlineArticles/ecourseware/Kelly_Potentiometry/PDF-4-Reversibility.pdf),
in which the author states:

> “The term ‘reversible’ is probably the most confusing, misused, and ambiguous term in all of electrochemistry”

After spending more time with this material, my version of the quote is as follows:

> “The term<span style="color:red">*s*</span> ‘reversible’ and ‘symmetric’ ~~is~~ <span style="color:red">*are*</span> probably the most confusing, misused, and ambiguous term<span style="color:red">*s*</span> in all of electrochemistry”

I hope to change this with this tutorial.
In this post, I'll explain three different types of reversibility encountered in electrochemistry:
- **Chemical reversibility:** The product of electrochemical reaction returns
to the original reactant upon a reverse scan instead of a side product
- **Electrochemical reversibility:** Charge transfer is fast relative to mass transfer
- **General reversibility:** Some property (e.g. structure) is cycleable

My sources include:
- [Richard Kelly, “Reversibility – Chemical vs. Electrochemical”](http://www.asdlib.org/onlineArticles/ecourseware/Kelly_Potentiometry/PDF-4-Reversibility.pdf)
- [Mary Louie, Ph.D. thesis, Appendix A.1](http://thesis.library.caltech.edu/6420/4/Appendix.pdf)
- Bard & Faulkner, 2<sup>nd</sup> edition

### Background

We consider the following system of reactions:

$$ O + e^- \overset{k_f}{\underset{k_r}{\leftrightarrows}} R \overset{k_c}{\rightarrow} Z $$

This system is an electrochemical redox reaction in which the
product can further react in a first-order chemical reaction,
commonly called an "$ EC $" mechanism.
For more details, you can check out other
[cyclic voltammetry simulation tutorials](/cyclic_voltammetry_simulation/index.html)
I've created, especially the
[fundamentals](/cyclic_voltammetry_simulation/fundamentals.html) page.

### Chemical reversibility

In my opinion, chemical reversibility is straightforward to understand.

Product of electrochemically generated species can further react

Chemically irreversible if rc >> rr

Chemical reversibility is relative to scan rate/cycling rate

$$ k_1 t_k $$

$$ k_1 t_k / l $$

(Plots)

### Electrochemical reversibility

To understand electrochemical reversibility, we should start with the
[Butler-Volmer kinetic equations](https://en.wikipedia.org/wiki/Butler–Volmer_equation):

$$ k_f = k^0 \exp\left({-\alpha f (E - E^{0'})}\right) $$

$$ k_r = k^0 \exp\left({(1-\alpha) f (E - E^{0'})}\right) $$

These equations play a key role in defining three key electrochemical concepts:
- **Electrochemical facility** is defined by the **magnitude of $ k_0 $**
- **Electrochemical reversibility** is defined by the **ratio of charge transfer**
**($ k_0 $) to mass transfer ($ (Dfv)^{0.5} $)**.
- **Electrochemical asymmetry** is defined by the **difference of $ \alpha $ from 0.5**

We'll look at each of these in detail in the following sections.

#### Electrochemical facility

Electrochemical facility is defined by the standard (heterogeneous) rate constant, $ k_0 $.
I like Bard and Faulkner's definition of electrochemical facility on page 96:
>The physical interpretation of $ k_0 $ is straightforward.
>It simply is a measure of the kinetic facility of a redox couple.

In other words, electrochemical facility is simply how easily a material
exchanges an electron with its environment.
The units of $ k_0 $ are $ \text{cm/s} $.
Electrochemically facile reactions have values of
$ k_0 $ near $ \text{1-10 cm/s} $, while
electrochemically infacile reactions have values of
$ k_0 $ near $ \text{10}^{-9} \text{cm/s} $.

(Image of benzene and OER)

#### Electrochemical reversibility

A major confusion I encountered in this understanding is the difference between
electrochemical facility and electrochemical reversibility.
Kelly's tutorial gives the following definition for electrochemical reversibility
(here, he uses $ k_s $ to represent $ k^0 $):

![Kelly reversibility definition](/img/cyclic_voltammetry/kelly_rev.png)

At first glance, this definition seems reasonable.
Unfortunately, **this is wrong - electrochemical facility is not equivalant**
**to electrochemical reversibility!**
In other words, $ k_0 $ is not sufficient to define electrochemical reversibility.
If there's one takeaway I want you to take from this post, it's this point.
Unfortunately, Kelly gets it wrong in his otherwise excellent tutorial.

Cutting through this confusion is a job for Bard and Faulkner.

$$ \Lambda = \frac{k_0}{(Dfv)^{0.5}} $$

Translating this equation,
$ \Lambda $ is simply the ratio of the rates of charge transfer, represented by $ k_0 $,
 to mass transfer, represented by $ (Dfv)^{0.5} $.

 (Plots)

One important point is that electrochemical reversibility is an
important definition, as the classification of a system as electrochemically
reversible, electrochemically pseudo-reversible, or electrochemically
irreversible has distinct meaning in electrochemistry.
Standard relationships between current and scan rate have been developed
to extract various parameters from cyclic voltammetry experiments, but these
relationships are specific to each domain of electrochemical reversibility.
See section () of Bard and Faulkner or Section IV of
[this application note from Bio-logic](http://www.bio-logic.net/wp-content/uploads/20131128-Application_note_41-1.pdf)
for more information.

#### Electrochemical asymmetry

Electrochemical asymmetry is defined by $ \alpha $, the
[charge-transfer coefficient](https://en.wikipedia.org/wiki/Charge_transfer_coefficient).
I will soon write a seperate article on different types of asymmetry found
in electrochemistry.

### Combining chemical and electrochemical irreversibility

Combining the above two cases

(Plots)

### General reversibility

Part of my initial confusion with the term "reversible" is my background
in batteries - a device that we typically consider reversible.
In my opinion, we need a term to describe this type of reversibility,
since it's so common in electrochemistry and so easily confused with other
types of reversibility.
Most battery materials are "reversible" even if cycled in the
electrochemically irreversible regime.
More generally, any redox reaction is, by definition, reversible,
given a large enough overpotential for sufficient time.
For lack of a better term, I'll designate this type of reversibility as
*general reversibility*.

The concept of general reversibility may be easier to understand in the
context of general **ir**reversibility.
For example, high-voltage cathode materials like Li-rich layered oxides and
high-capacity alloying anode materials like silicon experience
structural & chemical change both *within a single sweep*,
as the material is subjected to extreme voltages,
and *after many sweeps*, as the material continues to change with time
(even if the material doesn't experience additional overpotential).

Since I've already made up this term, I'll continue to make up definitions.
General reversibility is equivalent to **cycleability**.
This definition is in the context of bulk material changes, not
side reactions (since side reactions represent chemical irreversibility).

I hope this tutorial was helpful. Please reach out with any questions, comments, or suggestions!
