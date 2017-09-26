---
layout: page
categories: articles
title: "Chemical and electrochemical reversibility"
description: Tutorial on chemical and electrochemical reversibility in cyclic voltammetry simulations
---

## UNDER CONSTRUCTION

My personal research has been

> “The term ‘reversible’ is probably the most confusing, misused, and ambiguous term in all of electrochemistry”

My version of the quote is as follows:

> “The terms ‘reversible’ and ‘symmetric’ --is-- are probably the most confusing, misused, and ambiguous terms in all of electrochemistry”

In this post,
- **Chemical reversibility:** Product of electrochemical reaction returns to original reactant upon a reverse scan, instead of a side product
- **Electrochemical reversibility:** Charge transfer is fast relative to mass transfer
- **General reversibility:** Some property (e.g. structure) is cycleable

My sources include:
- Richard Kelly, “Reversibility – Chemical vs. Electrochemical”
- Mary Louie, Ph.D. thesis, Appendix A.1
- Bard & Faulkner, 2nd edition

### Background

$$ O + e^- \overset{k_f}{\underset{k_r}{\leftrightarrows}} R \overset{k_c}{\rightarrow} Z $$

[cyclic voltammetry simulation](/cyclic_voltammetry_simulation/index.html)
I've created in greater detail.

### Chemical reversibility

Chemical reversibility is straightforward to understand

Product of electrochemically generated species can further react

Chemically irreversible if rc >> rr

Chemical reversibility is relative to scan rate/cycling rate

### Electrochemical reversibility

Elec

Butler Volmer kinetics:

$$ k_f = k^0 \exp\left({-\alpha f (E - E^{0'})}\right) $$

$$ k_r = k^0 \exp\left({(1-\alpha) f (E - E^{0'})}\right) $$

Yo
- **Electrochemical facility** is defined by the **magnitude of $ k_0 $**
- **Electrochemical reversibility** is defined by the **ratio of charge transfer**
**($ k_0 $) to mass transfer ($ (Dfv)^{0.5} $)**.
- **Electrochemical asymmetry** is defined by the **difference of $ \alpha $ from 0.5**

#### Electrochemical facility

Electrochemical facility is defined by the standard (heterogeneous) rate constant, $ k_0 $.

From Bard and Faulkner, page 96:
>The physical interpretation of $ k_0 $ is straightforward.
>It simply is a measure of the kinetic facility of a redox couple”

Electrochemical facility is simply how easily a material exchanges an electron
with its environment.

The units of $ k_0 $ are $ \text{cm/s} $.

Electrochemically facile reactions have values of
$ k_0 $ near $ \text{1-10 cm/s} $, while
electrochemically infacile reactions have values of
$ k_0 $ near $ \text{10^{-9} cm/s} $.

#### Electrochemical reversibility

Not facility. Kelly gets it wrong

### Combining chemical and electrochemical irreversibility

Combining the above two cases

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

Since I've already made up this term, I'll continue to make up a definition.
General reversibility is equivalent to **cycleability**.
This definition is in the context of bulk material changes, not
side reactions (since side reactions represent chemical irreversibility).

I hope this tutorial was helpful. Please reach out with any questions, comments, or suggestions!
