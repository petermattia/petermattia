---
layout: page
categories: articles
title: "Cyclic Voltammetry App: Simulation walkthrough"
---

In this post, I'll explain the
[cyclic voltammetry simulation](/cyclic_voltammetry_simulation/index.html)
I've created in
greater detail. You can find the full MATLAB script file
[here](/cyclic_voltammetry_simulation/code.html).

~~~~matlab
%%%%%
% From Bard and Faulkner, 2nd edition, Appendix B
% Peter Attia
% Updated September 17, 2017
%%%%%

clear, clc, close all
~~~~

Again, this simulation is well-described in Bard and Faulkner, Appendix B.
Highly recommended for all the details.
This walkthrough is designed to serve as a "practical" guide to performing these
simulations, as well as to make Bard and Faulkner's
occasionally dense writing style more accessible.

### Set independent variables

~~~~matlab
%%% INDEPENDENT VARIABLES %%%
C      = 1.0;   % [=] mol/cm^3, initial concentration of O. Default = 1.0
D      = 1E-5;  % [=] cm^2/s, O & R diffusion coefficient. Default = 1E-5
etai   = +0.2;  % [=] V, initial overpotential (relative to redox potential). Default = +0.2
etaf   = -0.2;  % [=] V, final overpotential (relative to redox potential). Default = -0.2
v      = 1E-3;  % [=] V/s, sweep rate. Default = 1E-3
n      = 1.0;   % [=] number of electrons transfered. Default = 1
alpha  = 0.5;   % [=] dimensionless charge-transfer coefficient. Default = 0.5
k0     = 0.01;  % [=] cm/s, electrochemical rate constant. Default = 1E-2
k1     = 0;    % [=] 1/s, chemical rate constant. Default = 0
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
%%% CONSTANTS %%%
F      = 96485;   % [=] C/mol, Faraday's constant
R      = 8.3145;  % [=] J/mol-K, ideal gas constant
T      = 298.15;  % [=] K, temperature. Default = 298.15
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
%%% SIMULATION VARIABLES %%%
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
  of Bard and Faulkner) is different than "computationally expensive" in 2017.
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
%%% DERIVED CONSTANTS %%%
tk  = 2*(etai-etaf)/v;    % [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
Dt  = tk/L;               % [=] s, delta time (Eqn B.1.10, pg 790)
Dx  = sqrt(D*Dt/DM);      % [=] cm, delta x (Eqn B.1.13, pg 791)
j   = ceil(4.2*L^0.5)+5;  % number of boxes (pg 792-793). If L~200, j=65
~~~~

This section shows the derived constants. I'll walk through each of them
individually:
- $ t_k $ (`tk`) is the total experiment time, or a "characteristic experimental
  duration". $ t_k % is calculated from multiplying the total voltage swept by
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
%%% REVERSIBILITY PARAMETERS %%%
ktk    = k1*tk;              % dimensionless kinetic parameter (Eqn B.3.7, pg 797)
km     = ktk/L;              % normalized dimensionless kinetic parameter (see bottom of pg 797)
Lambda = k0/(D*f*v)^0.5;     % dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)
~~~~

These parameters control the extent of chemical and electrochemical reversibility.
We can estimate the shape of the I-V curve just by knowing the values
of these parameters.
I'll do a follow-up post on chemical and electrochemical
reversibility soon.

- $ k_1 t_k $ (`ktk`) is the dimensionless kinetic parameter. Specifically, it
  is the dimensionless *chemical* kinetic parameter, capturing the effect of
  the $R \overset{k_c}{\rightarrow} Z $ reaction.
  $ k_1 t_k $ controls the extent of chemical reversibility.

- $ k_m $ (`km`) is the normalized dimensionless chemical kinetic parameter.
  This value is convenient in future calculations.

- $ \Lambda $ (`Lambda`) is the dimensionless electrochemical reversibility
  parameter. It's an indicator of the balance between charge-transfer and
  mass-transfer rates.

### Send warnings to user

~~~~matlab
if km>0.1
    warning(['k_c*t_k/L equals ' num2str(km) ...
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
we turn over product faster than we can compute the changes.
This condition leads to numerical instabilities.

According to the text, the limit is $ k_1 t_k/L > 0.1 $.
My code warns you about this, but allows you to proceed.
If this condition is not satisfied, you may see
infinite current "spikes" when you run the simulation.
To study a system with a high value of $ k_1 $, increase $ L $.

### Pre-initialize variables

Almost there. The next section is mostly pre-initialization:
~~~~matlab
%%% PRE-INITIALIZATION %%%
k = 0:L;                % time index vector
t = Dt * k;             % time vector
eta1 = etai - v*t;      % overpotential vector, negative scan
eta2 = etaf + v*t;      % overpotential vector, positive scan
eta = [eta1(eta1>etaf) eta2(eta2<=etai)]'; % overpotential scan, both directions
Enorm = eta*f;          % normalized overpotential
kf = (k0*(tk/D)^0.5).*exp(  -alpha *n*Enorm); % dimensionless fwd rate constant (pg 799)
kb = (k0*(tk/D)^0.5).*exp((1-alpha)*n*Enorm); % dimensionless rev rate constant (pg 799)

O = C*ones(L+1,j); % Initial concentrations of O
R = zeros(L+1,j);  % Initial concentrations of R
Z = zeros(L+1,1);  % Dimensionless current
~~~~

Again, I'll walk through the variables:
- $ k $ (`k`) is the time index. `k` is a vector. Since `k = 0:L` (inclusive),
  we require $ L + 1 $ boxes, instead of $ L $ boxes.

- $ t $ (`t`) is the simulation step time, in seconds. `t` is a vector.

- $ \eta_1 $ (`eta1`) and $ \eta_2 $ (`eta2`) combine to form $ \eta $ (`eta`),
  which is a vector of the overpotential. We plot `eta` at the end.

- $ E_{norm} $ (`Enorm`) is a vector of the dimensionless overpotential in volts.
  This form is convenient for Butler-Volmer expressions.

- $ k_f $ (`kf`) and $ k_b $ (`kb`) are the dimensionless
  forward and reverse rate constants,
  given by the
  [Butler-Volmer equation](https://en.wikipedia.org/wiki/Butler–Volmer_equation).
  `kf` and `kb` are vectors, with values that change with `Enorm`.
  We make the rate constants dimensionless by multiplying by $ (t_k/D)^{0.5} $,
  which comes from expressing the physical definition of current in terms of
  simulation variables (see Bard & Faulkner, Eqns B.4.9 and B.4.10).

- `O` and `R` are the initial concentrations of $ O $ and $ R $, respectively.
  The initial concentration of $ O $ is $ C $, and the initial concentration
  of $ R $ is $ 0 $.
  The `O` and `R` arrays have $ L + 1 $ rows (time steps)
  and $ j $ columns (length steps).
  $ O $ and $ R $ are indexed as $ O(k,j) $ and $ R(k,j) $, or
  $ \text{(time, length)} $.
  Note that this convention switches the rows and columns in Bard & Faulkner's
  convention. I find mine more intuitive to work with in MATLAB.

- `Z` is a vector of the dimensionless current, which we'll plot at the end.
  We need $ L + 1 $ columns (time steps).

### Run main simulation

And finally, we run the simulation. We cycle through all possible times;
within each timestep, we cycle through all lengths.

~~~~matlab
%%% START SIMULATION %%%

% First dimensionless current (pg 792)
Z(1) = ( kf(1)*O(1,2) - kb(1)*R(1,2) ) ./ (1 + kf(1) + kb(1));

% k = time index. j = distance index
for i1 = 2:length(k)
    % Update surface concentrations
    Z(i1)   = ( kf(i1).*O(i1,2) - kb(i1).*R(i1,2) ) ./ (1 + kf(i1) + kb(i1));
    O(i1,1) = O(i1,2) - Z(i1) + km*R(i1-1,1);
    R(i1,1) = R(i1,2) + Z(i1) - km*R(i1-1,1);

    % Update bulk concentrations of O and R
    for i2 = 2:j-1
        O(i1,i2) = O(i1-1,i2) + DM*(O(i1-1,i2+1)+O(i1-1,i2-1)-2*O(i1-1,i2)) ...
            + km * R(i1-1,i2);

        R(i1,i2) = R(i1-1,i2) + DM*(R(i1-1,i2+1)+R(i1-1,i2-1)-2*R(i1-1,i2)) ...
            - km * R(i1-1,i2);
    end

    % Update current.
    % We flip the sign of current because the Bard and Faulkner current
    % convention is weird
    Z(i1)   = -( kf(i1).*O(i1,2) - kb(i1).*R(i1,2) ) ./ (1 + kf(i1) + kb(i1));
end
~~~~

### UNDER CONSTRUCTION

#### Initial current

We'll now calculate the current at $ k = t = 0 $:

We can calculate this current directly since the concentrations at
$ k = t = 0 $ are defined.

The equation we use for dimensionless current is:

$$ Z(k) = \frac{k_f(k)O(k,2) - k_r(k)R(k,2)}{1 + k_f(k) + k_r(k)} $$

That's a lot of $ k $'s! What this equation is saying is ___.

#### Surface dynamics

The surface dynamics follow (Eqns B.4.13 & B.4.14):

$$ O(k+1,1) = O(k,1) + D_M\big[ O(k,2) - O(k,1)\big] - Z(k)\big( D_M/L\big) $$

$$ R(k+1,1) = R(k,1) + D_M\big[ R(k,2) - R(k,1)\big] + Z(k)\big( D_M/L\big) $$

#### Bulk dynamics:

The bulk dynamics of O incorporate diffusion (Eqn B.1.9)

$$ O(k+1,j) = O(k,j) + D_M\big[ O(k,j+1) - 2O(k,j) + O(k,j-1)\big] $$

For R, incorporate diffision + chemical reaction (Eqn B.3.5)

$$ R(k+1,j) = R(k,j) + D_M\big[ R(k,j+1) - 2R(k,j) + R(k,j-1)\big] - \big(k_1 t_k/L \big) R(k,j) $$


#### TODO:
- `O(i1,2)` instead of `O(i1,1)`?
- `Z(i1)` twice?

The Bard and Faulkner current convention truly is weird.

### Plot results

We're done! Plot `eta` vs `Z` to see the final result.

~~~~matlab
plot(eta,Z)
xlabel('Overpotential (V)'), ylabel('Dimensionless current')
~~~~
