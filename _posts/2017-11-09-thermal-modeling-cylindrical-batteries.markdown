---
layout: post
categories: articles
title: Thermal modeling of cylindrical batteries
date: 2017-11-09
description: Using MATLAB to do simple thermal modeling of cylindrical batteries
tags: science
---

<img src="\img\thermal-modeling\A123_18650.jpeg" style="display:block; margin-left: auto; margin-right: auto;">

I've recently created simple simulations of heat transfer within
cylindrical batteries for my research.
While countless papers have done thermal modeling,
I had trouble finding a good introduction to this topic.
This post will serve as an introduction to heat transfer modeling
of a cylindrical battery.

A common form factor for lithium-ion cylindrical cells is "18650", which has a diameter
of $ 18 \text{mm} $ and a height of $ 65 \text{mm} $.
The cathode and anode are rolled together into a
["jellyroll"](https://en.wikipedia.org/wiki/Jelly_roll_(battery))
and stuffed inside a stainless steel can.
For reference, the inside of a cylindrical 18650 cell looks like this:

<img src="\img\thermal-modeling\battery_cross_section.png" style="display:block; margin-left: auto; margin-right: auto; width:500px">

In this image, the bright white lines represent the copper current collector
of the anode.

### Model

#### Assumptions

Keep in mind that the purpose of these simulations is primarily illustrative, not
high accuracy:
- *The cylinder is long.* This assumption allows us to model heat transfer in
just one dimension, $ r $. Since $ R/D = 0.14 $, this assumption is reasonable.
This assumption is most accurate for the middle of the battery; it serves as
an upper bound of the center temperature.
- *Resistive heating is the only source of heat generation.*
Other sources contribute to heat generation in a battery,
such as ionic resistance and chemical reaction,
but [resistive heating](https://en.wikipedia.org/wiki/Joule_heating)
is one of the simplest to model.
- *The stainless steel core and case do not contribute to heat transfer.*
This assumption is reasonable since these components are thin and have rapid
heat transfer.
- *The battery's properties are averaged over the bulk.*
Although the inside of a battery contains many distinct components including the
anode, cathode, seperator, current collectors, we represent the contributions
of the individual battery components by average properties.
- *Bulk properties are invariant with temperature, state of charge, position, etc.*
Since we don't expect the variation due to these effects to exceed 10-20%,
this assumption is reasonable for a first-order model.

#### Energy balance

Ultimately, the setup of this model is identical to other cases of
one-dimensional heat transfer in a cylinder with internal heat generation,
such as current-carrying wires and reaction-containing pipes.
The derivation for the 1D cylindrical case is a classic chemical & mechanical
engineering problem, so I won't repeat it here.
[This textbook](http://cecs.wright.edu/~sthomas/htchapter02.pdf)
derives it nicely in equations (2-18) to (2-26).

Basically, we approach this problem with an energy balance:

$$ \text{(rate of energy in) − (rate of energy out) + (rate of heat generation) = (rate of change in energy)} $$

The end result is below:

$$ \frac{1}{\alpha} \frac{\partial T}{\partial t} =
\frac{1}{r} \frac{\partial}{\partial r}\left(r \frac{\partial T}{\partial r}\right)+ \frac{\dot{e}_{gen}}{k} $$

This equation is a [partial differential equation (PDE)](https://en.wikipedia.org/wiki/Partial_differential_equation), which
generally requires a numerical solution (as opposed to an analytical solution).
This PDE includes a few parameters:
- $ k $ is the [*thermal conductivity*](https://en.wikipedia.org/wiki/Thermal_conductivity)
- $ \alpha = {k}/{\rho c_p} $ is the [*thermal diffusivity*](https://en.wikipedia.org/wiki/Thermal_diffusivity)
- $ \dot{e}\_{gen} = \left(I^2 R_{int}\right)/\left(\pi R^2 L\right)$ is
the *volumetric heat generation rate*. Here, we assume a constant heat generation
rate due to [resistive heating](https://en.wikipedia.org/wiki/Joule_heating),
given by $ I^2 R_{int} $. The volume is simply the volume of an "18650" cylinder
with $ R = 9 \text{ mm} $ and $ L = 65 \text{ mm} $.

#### Initial and boundary conditions

Since this equation is second-order in space ($ r $) and first-order in time ($ t $),
we need two boundary conditions and one initial condition. They are given by:

- IC: $ T(x,t=0)=T_{init} $. This basically means that the whole cell starts at
  some uniform temperature $ T_{init} $. I've set $ T_{init} = 30°C$ here.
- BC1:
$ \frac{\partial T}{\partial r} \bigr\|_{r=0} = 0 $.
This is the *thermal symmetry* boundary condition;
since the cell is symmetric across $ r $,
the maximum temperature is at $ r = 0 $ and thus
the first derivative is $ 0 $.
See Eqn 2-50 and Fig 2-30 in
[this textbook](http://cecs.wright.edu/~sthomas/htchapter02.pdf)
for a more detailed description.
- BC2: $ -k \frac{\partial T(R,t)}{\partial r} = h\big(T(R,t) - T_{\infty} \big) $.
This is the boundary condition for
[convective heat transfer](https://en.wikipedia.org/wiki/Convective_heat_transfer),
which represents how a cell exchanges heat with its environment.

We also need to set limits of integration for both space and time.
For space, we integrate between $ r = 0 $ and $ r = R = 0.009 \text{ m} $,
since an 18650 cell has a diameter of $ 9 \text{ mm} $.
For time, we integrate between $ t = 0 $ and the total (dis)charging time,
which varies depending on the C rate.

#### Parameter estimation

We now have a few parameters that require estimation.
Fortunately, [Drake *et al*](http://www.uta.edu/faculty/jaina/MTL/pubs/Drake-JPS2014.pdf)
([DOI](https://doi.org/10.1016/j.jpowsour.2013.11.107)) did a careful analysis
of these parameters for an LFP/graphite 18650 cell.
I mostly use his values in my analysis:

<table style="width:100%">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Value</th>
      <th>Units</th>
      <th>Source</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td style="text-align:center"> $ k $ </td>
      <td style="text-align:center"> $ 0.2 $ </td>
      <td style="text-align:center"> $ \text{ W/mK}  $ </td>
      <td style="text-align:center"> <a href="http://www.uta.edu/faculty/jaina/MTL/pubs/Drake-JPS2014.pdf">Drake <i>et al</i> 2014</a> </td>
    </tr>
    <tr>
      <td style="text-align:center"> $ \rho $ </td>
      <td style="text-align:center"> $ 2362 $ </td>
      <td style="text-align:center"> $ \text{ kg/m}^3  $ </td>
      <td style="text-align:center"> <a href="http://www.uta.edu/faculty/jaina/MTL/pubs/Drake-JPS2014.pdf">Drake <i>et al</i> 2014</a> </td>
    </tr>
    <tr>
      <td style="text-align:center"> $ c_p $ </td>
      <td style="text-align:center"> $ 1000 $ </td>
      <td style="text-align:center"> $ \text{ J/kgK} $ </td>
      <td style="text-align:center"> <a href="http://jes.ecsdl.org/content/146/3/947">Maleki <i>et al</i> 1998</a></td>
    </tr>
    <tr>
      <td style="text-align:center"> $ h $ </td>
      <td style="text-align:center"> $ 10 $ </td>
      <td style="text-align:center"> $ \text{ W/m}^2\text{K} $ </td>
      <td style="text-align:center"> <a href="https://www.engineeringtoolbox.com/convective-heat-transfer-d_430.html">Engineering Toolbox</a> (air convection) </td>
    </tr>
    <tr>
      <td style="text-align:center"> $ R_{int} $ </td>
      <td style="text-align:center"> $ 0.017 $ </td>
      <td style="text-align:center"> $ \text{ }\Omega $ </td>
      <td style="text-align:center"> My measurements </td>
    </tr>
  </tbody>
</table>

<br>

For $ c_p $, Drake *et al* had a value of $ 1720 \text{ J/kgK} $.
This value is much higher than other values of $ c_p $ I found in literature.
$ 1000 \text{ J/kgK} $ seems more reasonable.

One interesting point raised by Drake *et al* is that the radial heat transfer
coefficient, $ k_r $, is much lower than the axial heat transfer coefficient,
$ k_z $, since heat transfer through the polymeric seperator is limiting in the
radial direction.

#### Solving the PDE

MATLAB has a built-in function called [`pdepe`](https://www.mathworks.com/help/matlab/ref/pdepe.html)
designed to solve one-dimensional PDEs like this one.
I use this function with little additional modification.
MATLAB's own documentation for this function is quite good.
If you're interested in seeing my implementation, check out my
[GitHub repository](https://github.com/petermattia/18650-thermal-modeling) for this code.
Unfortunately Python doesn't appear to have a nice built-in PDE solver yet,
although one could solve it manually using an iterative finite-element model.

#### Biot number analysis

One of the major motivations for this type of work is estimating the
internal temperature during cell operation, particularly during fast
charging and discharging. We can quickly estimate the expected difference
between surface and center temperatures by the dimensionless
[Biot number](https://en.wikipedia.org/wiki/Biot_number):

$$ Bi = \frac{L_c h}{k} $$

For a cylinder, $ L_c = R/2 $. Thus:

$$ Bi = \frac{R h}{2k} $$

Our best values for the required parameters are
$ R = 9 \text{mm} = 0.009 \text{m} $, $ k = 0.2 \text{W/mK} $,
and $ h = 10 \text{W/m}^2\text{K} $ (air convection).
With these values, we obtain:

$$ Bi = 0.225 $$

In thermal modeling, we can often assume that the difference between the
surface and bulk temperature is small if $ Bi < 0.1 $.
Our value is only a factor of two larger than this criterion.
Thus, we should still account for spatial variation, but we should expect
a small difference between the surface and core temperatures.

As an aside, this analysis changes significantly if we consider water or oil
cooling ($ h = 500 \text{W/m}^2\text{K} $):

$$ Bi = 11.25 $$

Now, we should expect a much larger difference between the center and surface
temperatures.

### Results

Check out the results of charging at 1C, 5C, and 10C below:

#### 1C (charging time = 60 minutes)
<img src="\img\thermal-modeling\battery_1C.svg" style="display:block; margin-left: auto; margin-right: auto;">
<img src="\img\thermal-modeling\battery_1C.gif" style="display:block; margin-left: auto; margin-right: auto;">

#### 5C (charging time = 12 minutes)
<img src="\img\thermal-modeling\battery_5C.svg" style="display:block; margin-left: auto; margin-right: auto;">
<img src="\img\thermal-modeling\battery_5C.gif" style="display:block; margin-left: auto; margin-right: auto;">

#### 10C (charging time = 6 minutes)
<img src="\img\thermal-modeling\battery_10C.svg" style="display:block; margin-left: auto; margin-right: auto;">
<img src="\img\thermal-modeling\battery_10C.gif" style="display:block; margin-left: auto; margin-right: auto;">

While the temperature rise during 1C charging is less than one degree,
the temperature rise during 10C charging is nearly 20°C!
However, even in this case, the temperature difference between the center and
surface of the battery is only a few degrees,
as predicted by the Biot number analysis.

### Future work
This simulation is essentially the simplest thermal model of a battery you can create.
Additional refinements include:
- Solve the PDE including the $ z $ dependence of heat generation to include
  cooling from the caps
- Develop more sophisticated models for heat generation, $ c_p $, and $ k $ that includes
  additional heat generation terms (ionic resistance, chemical reaction, etc)
  and dependencies on state-of-charge, direction of charge, and temperature
- Account for the stainless steel core and can (neglected in this model)

I've enjoyed creating this model, and I think it nicely illustrates
the power of simple simulations to guide understanding of a problem.
