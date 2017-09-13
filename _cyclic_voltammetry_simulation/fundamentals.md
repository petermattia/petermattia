---
layout: page
categories: articles
title: "Cyclic Voltammetry App: Fundamental electrochemistry"
---

### Fundamental electrochemistry

This
[cyclic voltammetry simulation](/cyclic_voltammetry_simulation/index.html).) 
couples a one-electron electrochemical reduction with a subsequent
chemical reaction of the reduced species, as below:

$$ O + e^- \overset{k_f}{\underset{k_r}{\leftrightarrows}} R \overset{k_c}{\rightarrow} Z $$

This simulation assumes aqueous electrochemistry.
A metal electrode in solution supplies and extracts electrons from aqueous species
O and R, such as in the case of
 [ferro-/ferricyanide](https://en.wikipedia.org/wiki/Ferrocyanide).

In this simulation, we model three mechanistic processes: the electrochemical
reaction (charge transfer), the chemical reaction, and diffusion.

#### Electrochemical reaction (charge transfer)

In this model, the charge-tranfer kinetics follow the Bulter-Volmer formulation.
The forward electrochemical rate constant, $k_f$, and reverse electrochemical
rate constant, $k_r$, primarily depend on the fundemental electrochemical
parameters $k_0$ and $\alpha$ (Eqns 3.3.9 & 3.3.10):

$$ k_f = k^0 \exp\left({-\alpha f (E - E^{0'})}\right) $$

$$ k_r = k^0 \exp\left({(1-\alpha) f (E - E^{0'})}\right) $$

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

The surface concentrations of O and R ultimately control the measured current (3.3.11):

$$ i = F A k^0 \left[C_O(0,t)\exp\left({-\alpha f (E - E^{0'})}\right) - C_R(0,t)\exp\left({(1-\alpha) f (E - E^{0'})}\right)\right] $$

Here, $C_O(0,t)$ and $C_R(0,t)$ are the concentrations of O and R at the electrode
surface.

#### Chemical reaction
The reduction product can also chemically react in a simple unimolecular
reaction ($R \overset{k_c}{\rightarrow} Z $). Standard
[first-order reaction kinetics](https://en.wikipedia.org/wiki/First-order_reaction)
describe this unimolecular reaction:

$$ \frac{\partial C_R(x,t)}{\partial t} = -k_c C_R $$

The units of $k_c$ are $s^{-1}$, as expected for a
first-order reaction rate constant.

#### Diffusion

[Fick's laws](https://en.wikipedia.org/wiki/Fick%27s_laws_of_diffusion)
model diffusion in this system.
Fick's first law of diffusion is:

$$ J_i(x,t) = -D_i\frac{\partial C_i(x,t)}{\partial x} $$

Here, $ J_i(x,t) $ is the flux ($ {mol}/{cm^2s} $) of species $ i $, and
$ D_i $ ($ {cm^2}/{s} $) is the diffusion coefficient of species $ i $.
A common assumption in aqueous electrochemistry is that the diffusion coefficients
of $ O $ and $ R $ are equal, or $ D_O = D_R $.

Fick's second law is:

$$ -\frac{\partial C_i(x,t)}{\partial t} = \frac{\partial J_i(x,t)}{\partial x} $$

The combined first and second law is:

$$ \frac{\partial C_i(x,t)}{\partial t} = D_i\frac{\partial C_i^2(x,t)}{\partial x^2} $$

#### Summary

The interplay between the electrochemical reaction at the surface, the
chemical reaction of the reduced product $ R $, and the diffusion of both $ O $
and $ R $ yield the cyclic voltammetry result. Specifically, two dimensionless
numbers - $ \Lambda $, an indicator for charge transfer vs mass transfer
rates, and $ k_1 t_k $, an indicator for chemical reaction rate vs experiment
time, define the system's electrochemical reversibility and
chemical reversibility, respectively.
I will discuss in greater detail in a future post.
