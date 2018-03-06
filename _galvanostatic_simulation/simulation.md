---
layout: page
categories: articles
title: "Galvanostatic App: Simulation walkthrough"
description: A tutorial on galvanostatic simulations
---

## UNDER CONSTRUCTION

In this post, I'll explain the
[cyclic voltammetry simulation](/cyclic_voltammetry_simulation/index.html)
I've created in greater detail.
I've chosen to document this simulation with MATLAB code since its syntax is
easy to follow.
You can find the full MATLAB script file
[here](/cyclic_voltammetry_simulation/code.html).

~~~~matlab
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% CVsim.m - Cyclic voltammetry simulation
% Peter Attia
% Based on Bard and Faulkner, Appendix B
% EC mechanism
% Updated September 24, 2017
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

clear, clc, close all
~~~~

Again, this simulation is well-described in Bard and Faulkner, Appendix B.
Highly recommended for all the details.
This walkthrough is designed to serve as a "practical" guide to performing these
simulations, as well as to make Bard and Faulkner's
occasionally dense writing style more accessible.

### Set independent variables

~~~~matlab
%% INDEPENDENT VARIABLES %%
C      = 1.0;    % [=] mol/cm^3, initial concentration of O. Default = 1.0
D      = 1E-5;   % [=] cm^2/s, O & R diffusion coefficient. Default = 1E-5
etai   = +0.2;   % [=] V, initial overpotential (relative to redox potential). Default = +0.2
etaf   = -0.2;   % [=] V, final overpotential (relative to redox potential). Default = -0.2
v      = 1E-3;   % [=] V/s, sweep rate. Default = 1E-3
n      = 1.0;    % [=] number of electrons transfered. Default = 1
alpha  = 0.5;    % [=] dimensionless charge-transfer coefficient. Default = 0.5
k0     = 1E-2;   % [=] cm/s, electrochemical rate constant. Default = 1E-2
k1     = 1E-3;   % [=] 1/s, chemical rate constant. Default = 1E-3
T      = 298.15; % [=] K, temperature. Default = 298.15
~~~~

These variables are the "adjustable" parameters in this simulation.
These parameters should be straightforward to someone interested in cyclic
voltammetry simulations. I'll note that $ k_0 $ is the electrochemical rate constant,
with units of $ \text{cm/s} $ , and $ k_1 $ is the chemical rate constant,
with units of $ \text{1/s} $.
You can read more about these terms on the
[fundamentals](/cyclic_voltammetry_simulation/fundamentals.html) page.

### Set physical constants

~~~~matlab
%% PHYSICAL CONSTANTS %%
F      = 96485;   % [=] C/mol, Faraday's constant
R      = 8.3145;  % [=] J/mol-K, ideal gas constant
f      = F/(R*T); % [=] 1/V, normalized Faraday's constant at room temperature
~~~~

These variables are fundamental physical constants.
The [Faraday constant](https://en.wikipedia.org/wiki/Faraday_constant)
is often normalized by $ RT $.

In my work, I don't consider temperatures other than room temperature.
If your work involves variable temperature, you can move $ T $ from "constants"
to "independent variables".

### Set simulation variables

~~~~matlab
%% SIMULATION VARIABLES %%
L      = 500;    % [=] number of iterations per t_k (pg 790). Default = 500
DM     = 0.45;   % [=] model diffusion coefficient (pg 788). Default = 0.45
~~~~

$ L $ and $ D_M $ are two intrinsic simulation variables.

$ L $ is the *number of timesteps* in our simulation.
Our experiment will take some amount of real time ($ t_k $, as discussed below).
For a trivial example, if we sweep from $ +1 \text{V} $ to
$ -1 \text{V} $ and back at a rate of $ 1 \text{ V/s} $, we are simulating a total
time of $ 4\text{ s} $. If $ L = 500 $, each timestep will be
$ 4000 \text{ ms / } 500 = 8 \text{ ms} $.

Two notes on $ L $:
- $ L $ controls the resolution of our experiment. A low value of $ L $ will
  lead to "choppiness" in the output; a high value of $ L $ is computationally
  expensive. Bard and Faulkner recommend $ L $ to be between 100 and 1000.
  However, "computationally expensive" in 2001 (the publication year
  of Bard and Faulkner) is different than "computationally expensive" today.
  My 2014 MacBook Air ran this simulation with $ L = 10000 $ in 0.4s.
  This simulation is an analytical form of a set of differential equations,
  so it's already computationally inexpensive relative to its
  original differential form.
  In my experience, $ L = 500 $ produces smooth curves.

- Changing $ L $ will change the magnitude of dimensionless current, so don't
  change $ L $ when comparing two simulations - unless, of course, you're
  interested in understanding the effect of $ L $ 😉.

$ D_M $ is the *model diffusion coefficient*.
$ D_M $ is defined as $ D\Delta t / \Delta x^2 $.
A "model diffusion coefficient" is used to ensure that one implicit
assumption is satisfied: within a single timestep, material can only diffuse
between nearest-neighbor boxes.
If $ \Delta x $ is too small for a given $ \Delta t $, the simulation becomes
unphysical. For example, if $ D_M = 0.5 $, a mass-transfer operation between a
full box and an empty box will leave both boxes half-full, which violates
Fick's laws.
Thus, we must satisfy the condition that $ D_M < 0.5 $.
Bard and Faulkner recommend $ D_M = 0.45 $, which we retain here.

Since we've already defined $ D $ and $ \Delta t $ is controlled by $ L $, $ D_M $
specifies $ \Delta x $. The implication of this definition is that while $ x $
and $ t $ are physically independent, $ \Delta x $ and $ \Delta t $ are
*dependent* in this analytical simulation.
In other words, the spatial resolution is a function of the temporal resolution.

### Calculate temporal and spatial step size

~~~~matlab
%% DERIVED CONSTANTS %%
tk  = 2*(etai-etaf)/v;    % [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
Dt  = tk/L;               % [=] s, delta time (Eqn B.1.10, pg 790)
Dx  = sqrt(D*Dt/DM);      % [=] cm, delta x (Eqn B.1.13, pg 791)
j   = ceil(4.2*L^0.5)+5;  % number of boxes (pg 792-793). If L~200, j=65
~~~~

This section shows the derived constants. I'll walk through each of them
individually:
- $ t_k $ (`tk`) is the total experiment time, or a "characteristic experimental
  duration". $ t_k $ is calculated from multiplying the total voltage swept by
  a scan in [one direction](https://en.wikipedia.org/wiki/One_Direction) by two
  (to account for both sweeps) and dividing by the voltage sweep rate.

- $ \Delta t $ (`dt`) is the size of each timestep, given the total experiment
  time and the number of timesteps we desire, $ L $.

- $ \Delta x $ (`dx`) is the width of each box. It's controlled by $ D_M $, as
  discussed above.

- $ j $ (`j`) is the number of 'finite elements', or 'boxes', in the length dimension.
  The size of each box, $ \Delta x $, is already set, but we
  can calculate the number of boxes required by estimating the
  diffusion layer length in units of boxes.
  3D diffusion proceeds as $ 6(Dt)^{0.5} $. In units of 'boxes',
  we need $ j_{max} = 6(Dt)^{1/2}/\Delta x + 1 $. With some algebra, we find
  that $ j_{max} < 4.2 L^{1/2} $. I added the `+5` since it can't hurt.

### Calculate reversibility parameters

~~~~matlab
%% REVERSIBILITY PARAMETERS %%
ktk    = k1*tk              % dimensionless kinetic parameter (Eqn B.3.7, pg 797)
km     = ktk/L              % normalized dimensionless kinetic parameter (see bottom of pg 797)
Lambda = k0/(D*f*v)^0.5     % dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)
~~~~

These parameters control the extent of chemical and electrochemical reversibility.
We can estimate the shape of the *I-V* curve just by knowing the values
of these parameters.
I discuss chemical and electrochemical reversibility
[here](/cyclic_voltammetry_simulation/index.html).

- $ k_1 t_k $ (`ktk`) is the dimensionless kinetic parameter. Specifically, it
  is the dimensionless *chemical* kinetic parameter, capturing the effect of
  the $R \overset{k_c}{\rightarrow} Z $ reaction.
  $ k_1 t_k $ controls the extent of chemical reversibility.

- $ k_m $ (`km`) is the normalized dimensionless chemical kinetic parameter.
  This value is convenient in future calculations.

- $ \Lambda $ (`Lambda`) is the dimensionless electrochemical reversibility
  parameter, defined by $ \frac{k_0}{(Dfv)^{0.5}} $. $ \Lambda $ is an indicator of the ratio between the rates of
  charge transfer and mass transfer.

### Send warnings to user

~~~~matlab
%% CHEMICAL REVERSIBILITY WARNING %%
if km>0.1
    warning(['k_c*t_k/l equals ' num2str(km) ...
        ', which exceeds the upper limit of 0.1 (see B&F, pg 797)'])
end
~~~~

In my experience, this simulation only breaks under one condition,
documented by Bard and Faulkner (pg 797).
One limitation of the choice of a finite-element model is that the
approximation breaks down at extreme conditions.
In this case, if $ k_1 $ is too large, the rate of chemical reaction significantly
exceeds the time resolution of the simulation, $ t_k/L = \Delta t $.
For example, if $ k_1 = 10 \text{ s}^{-1} $ and $ \Delta t = 0.1 \text{ s} $,
we turn over product faster than we can compute the changes in concentration.
This condition leads to numerical instabilities.

According to the text, the limit is $ k_1 t_k/L > 0.1 $.
My code warns you about this, but allows you to proceed.
If this condition is not satisfied, you may see
infinite current "spikes" when you run the simulation.
To study a system with a high value of $ k_1 $, increase $ L $.

### Pre-initialize variables

Almost there. The next section is mostly pre-initialization:
~~~~matlab
%% PRE-INITIALIZATION %%
k = 0:L;                % time index vector
t = Dt * k;             % time vector
eta1 = etai - v*t;      % overpotential vector, negative scan
eta2 = etaf + v*t;      % overpotential vector, positive scan
eta = [eta1(eta1>etaf) eta2(eta2<=etai)]'; % overpotential scan, both directions
Enorm = eta*f;          % normalized overpotential
kf = k0.*exp(  -alpha *n*Enorm); % [=] cm/s, fwd rate constant (pg 799)
kb = k0.*exp((1-alpha)*n*Enorm); % [=] cm/s, rev rate constant (pg 799)

O = C*ones(L+1,j); % [=] mol/cm^3, concentration of O
R = zeros(L+1,j);  % [=] mol/cm^3, concentration of R
JO = zeros(1,L+1); % [=] mol/cm^2-s, flux of O at the surface
~~~~

Again, I'll walk through the variables:
- $ k $ (`k`) is the time index. `k` is a vector. Since `k = 0:L` (inclusive),
  we require $ L + 1 $ boxes, instead of $ L $ boxes.

- $ t $ (`t`) is the simulation step time, in seconds. `t` is a vector.

- $ \eta_1 $ (`eta1`) and $ \eta_2 $ (`eta2`) combine to form $ \eta $ (`eta`),
  which is a vector of the overpotential. We plot `eta` at the end.

- $ E_{norm} $ (`Enorm`) is a vector of the dimensionless overpotential in volts.
  This form is convenient for Butler-Volmer expressions.

- $ k_f $ (`kf`) and $ k_b $ (`kb`) are the forward and reverse
  electrochemical rate constants, given by the
  [Butler-Volmer equation](https://en.wikipedia.org/wiki/Butler–Volmer_equation).
  `kf` and `kb` are vectors, with values that change with `Enorm`.
  The rate constants have units of $ \text{cm/s} $.

- `O` and `R` are the concentrations of $ O $ and $ R $, respectively.
  The initial concentration of $ O $ is $ C $, and t
  he initial concentration of $ R $ is $ 0 $.
  The `O` and `R` arrays have $ L + 1 $ rows (time steps)
  and $ j $ columns (length steps).
  `O` and `R` are indexed as `O(k,j)` and `R(k,j)`, or
  $ \text{(time, length)} $.
  Note that this convention switches the rows and columns in Bard & Faulkner's
  convention. I find mine more intuitive to work with in MATLAB.

- `J` is a vector representing the flux of species $ O $ ($ mol/cm^2s $).
  We need $ L + 1 $ columns (time steps).

### Run main simulation

And finally, we run the simulation. We cycle through all possible times;
within each timestep, we cycle through all lengths.

~~~~matlab
%% START SIMULATION %%
% i1 = time index. i2 = distance index
for i1 = 1:L
    % Update bulk concentrations of O and R
    for i2 = 2:j-1
        O(i1+1,i2) = O(i1,i2) + DM*(O(i1,i2+1)+O(i1,i2-1)-2*O(i1,i2));

        R(i1+1,i2) = R(i1,i2) + DM*(R(i1,i2+1)+R(i1,i2-1)-2*R(i1,i2)) ...
            - km * R(i1,i2);
    end

    % Update flux
    JO(i1+1)   = ( kf(i1+1).*O(i1+1,2) - kb(i1+1).*R(i1+1,2) ) ./ (1 + Dx/D*(kf(i1+1) + kb(i1+1)) );

    % Update surface concentrations
    O(i1+1,1) = O(i1+1,2) - JO(i1+1)*(Dx/D);
    R(i1+1,1) = R(i1+1,2) + JO(i1+1)*(Dx/D) - km*R(i1+1,1);
end

% Calculate current density, Z, from flux of O
Z = -n.*F.*JO/10; % [=] A/m^2 -> mA/cm^2, current density
~~~~

I found Bard and Faulkner's derivations opaque, since I was always mentally
converting between dimenional and dimensionless variables.
Additionally, the use of dimensionless current hides
important subtleties in the simulation results.
I much prefered the derivation published by Brown
[in this paper](https://dx.doi.org/10.1021/acs.jchemed.5b00225),
which is written with dimensional variables.
In this part of the walkthrough, I'll primarily follow Brown's derivations, and
reference equations in Bard & Faulkner when appropriate.

#### Bulk concentrations

The bulk concentrations of $ O $ and $ R $ change due to diffusion and, in the case of $ R $,
the subsequent chemical reaction.
We start with Fick's combined 1<sup>st</sup> and 2<sup>nd</sup> laws:

$$ \frac{\partial C(x,t)}{\partial t} = D\frac{\partial C^2(x,t)}{\partial x^2} $$

We apply a discrete approximation to arrive at Eqn B.1.6:

$$ C(x,t+\Delta t) = C(x,t) + \frac{D\Delta t}{\Delta x^2}\big(C(x+\Delta x,t) - 2C(x,t) + C(x-\Delta x, t) \big) $$

We substitute simulation variables to arrive at an expression for $ O $.
The bulk concentration of $ O $ changes only by diffusion (Eqn B.1.9):

$$ O(k+1,j) = O(k,j) + D_M\big[ O(k,j+1) - 2O(k,j) + O(k,j-1)\big] $$

The dynamics of the bulk concentration of $ R $ are identical,
except we also need to add the subsequent chemical reaction (Eqn B.3.5):

$$ R(k+1,j) = R(k,j) + D_M\big[ R(k,j+1) - 2R(k,j) + R(k,j-1)\big] - \big(k_1 \Delta t \big) R(k,j) $$

Every timestep, $ k_1 \Delta t $ molecules of $ R $ convert into the chemical product.

#### Current

Bard and Faulkner write an equation for current in Eqn B.4.9:

$$ \frac{i(t)}{nFA} = k_fO(x=0,t) - k_rR(x=0,t) $$

However, I find the Bard and Faulkner sign convention confusing.
I prefer negative currents for negative overpotential
(potentials less than the redox potential).
I switch the current convention below.
If you prefer the Bard and Faulkner convention,
you can simply change `plot(eta,Z)` to `plot(eta,-Z)` with no loss of fidelity.

With my preferred current convention, the above equation becomes:

$$ \frac{i(t)}{nFA} = -k_fO(x=0,t) + k_rR(x=0,t) $$

We can translate these physical varaibles into simulation variables:

$$ \frac{i(k)}{nFA} = -k_f(k)O(k,j=1) + k_r(k)R(k,j=1) $$

Here, $ O(k,j=1) $ and $ R(k,j=1) $ are the concentrations of $ O $ and $ R $
at timestep $ k $ in box $ 1 $, which we take to be the surface.
To calculate the current, then, we need to know $ O(k,j=1) $ and $ R(k,j=1) $.
We can obtain these using four equations for flux, $ J $.
The first two come from Fick's first law:

$$ J_O(x,t) = -D_O\frac{\partial C_O(x,t)}{\partial x} $$

$$ J_R(x,t) = -D_R\frac{\partial C_R(x,t)}{\partial x} $$

Again, we assume $ D_O = D_R = D $.
For box 1 ($ j = 1 $), we can translate these equations using simulation terms:

$$ J_O(k,1) = -D\frac{O(k,2) - O(k,1)}{\Delta x} \Rightarrow
O(k,1) = O(k,2) - J_O\frac{\Delta x}{D} $$

$$ J_R(k,1) = -D\frac{R(k,2) - R(k,1)}{\Delta x} \Rightarrow
R(k,1) = R(k,2) - J_R\frac{\Delta x}{D} $$

At the surface, we can define the current by the flux of $ O $ (pg 792 & B.4.19).
This relationship gives us another equation for the electrode-electrolyte interface:

$$ \frac{i(k)}{nFA} = -J_O(k) = -k_f(k)O(k,j=1) + k_r(k)R(k,j=1) $$

Lastly, at the interface, the flux of $ O $ is equal and opposite to the flux of
$ R $:

$$ J_O(k) = -J_R(k) $$

We can now substitute variables into the third equation:

$$ -J_O(k) = -k_f(k)\left( O(k,2) - J_O\frac{\Delta x}{D} \right)
+ k_r(k)\left( R(k,2) - J_R\frac{\Delta x}{D} \right) $$

$$ J_O(k) = k_f(k)O(k,2) - k_f(k)J_O\frac{\Delta x}{D}
- k_r(k)R(k,2) - k_r(k)J_O\frac{\Delta x}{D} $$

$$ J_O(k)\left(1 + k_f(k)\frac{\Delta x}{D} + k_r(k)\frac{\Delta x}{D}\right)
= k_f(k)O(k,2) - k_r(k)R(k,2) $$

With one more rearrangement, we obtain:

$$ J_O(k) = \frac{k_f(k)O(k,2) - k_r(k)R(k,2)}
{1 + k_f(k)\frac{\Delta x}{D} + k_r(k)\frac{\Delta x}{D}} $$

That's a lot of $ k $'s! We use this equation to calculate the surface flux of $ O $.

At the end, we calculate current density, $ Z $, from flux:

$$ \frac{i(k)}{A} = -nFJ_O $$

#### Surface concentrations

We derived equations for the surface (box 1) concentrations of $ O $ and $ R $
in the previous section from a discrete approximation of Fick's first law.
We account for changes in concentration due to diffusion, electrochemical reaction,
and, in the case of $ R $, the subsequent chemical reaction.

$$ J_O(k,1) = -D\frac{O(k,2) - O(k,1)}{\Delta x} \Rightarrow
O(k,1) = O(k,2) - J_O\frac{\Delta x}{D} $$

$$ J_R(k,1) = -D\frac{R(k,2) - R(k,1)}{\Delta x} \Rightarrow
R(k,1) = R(k,2) + J_O\frac{\Delta x}{D} - \left( k_1 \Delta t \right) R(k-1,1)$$

### Plot results

~~~~matlab
%% PLOT RESULTS %%
% Sometimes length(eta) = length(Z) + 1. If this is the case, truncate last value
if length(eta) > length(Z)
    eta = eta(1:end-1);
end

plot(eta,Z)
xlabel('Overpotential (V)'), ylabel('Current density (mA/cm^2)')
~~~~

Under some conditions of `etai` and `etaj`, `eta` is one element larger than
`Z`. If so, we chop off the last value of `eta`.
For $ L = 500 $, this operation will have a negligible effect on the output.

With that, we're done! Plot `eta` vs `Z` to see the final result.
The Bard and Faulkner current convention is counterintuitive to me, so
I plot `-Z` instead of `Z`.

The results of a simulation using the default values is below:

<p>
<img src="/img/cyclic_voltammetry/results.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>
