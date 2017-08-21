---
layout: page
categories: articles
title: "Cyclic Voltammetry App: Fundamental electrochemistry"
---

### Fundamental electrochemistry

This simulation couples a one-electron electrochemical reduction with a subsequent
chemical reaction of the reduced species, as below:

$$ O + e^- \overset{k_f}{\underset{k_r}{\leftrightarrows}} R \overset{k_c}{\rightarrow} Z $$

In this experiment, we model three mechanistic processes: the electrochemical
reaction (charge transfer), the chemical reaction, and diffusion.

#### Electrochemical reaction (charge transfer)

In this model, the charge-tranfer kinetics are modeled by the Bulter-Volmer equation.
The forward electrochemical rate constant, $k_f$, and reverse electrochemical
rate constant, $k_r$, primarily depend on the fundemental electrochemical
parameters $k_0$ and $\alpha$ (Eqns 3.3.9 & 3.3.10):

$$ k_f = k^0 \exp[{-\alpha f (E - E^{0'})}] $$

$$ k_r = k^0 \exp[{(1-\alpha) f (E - E^{0'})}] $$

$k_0$ is the standard electrochemical rate constant, defined as the "kinetic
facility" of a redox couple - in other words, it measures the ease of electron
transfer in the redox reaction (see section 3.3.3).
$k_0$, $k_f$, and $k_c$ all have units of $cm/s$.

$\alpha$ is the
[transfer coefficient](https://en.wikipedia.org/wiki/Charge_transfer_coefficient),
which is a measure of the "symmetry of the energy barrier"
between the forward and reverse reactions (section 3.3.4).
$\alpha$ is dimensionless.

Three more terms:
- $f$ is the normalized Faraday's constant, $\text{38.92 }  V^{-1}$ at room temperature
- $E$ is the applied potential, in $V$
- $E^{0'}$ is the formal potential, in $V$. Thus, $E - E^{0'}$ is the overpotential.

#### Chemical reaction
The reduction product can also chemically react (in this case, )

#### Diffusion
