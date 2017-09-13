---
layout: page
categories: articles
title: "Cyclic Voltammetry App: Simulation walkthrough"
---

## UNDER CONSTRUCTION

In this post, I'll explain the cyclic voltammetry simulation I've created in
greater detail. You can find the full MATLAB script file
[here](/cyclic_voltammetry_simulation/code.html).

~~~~matlab
%%%%%
% From Bard and Faulkner, 2nd edition, Appendix B
% Peter Attia
% Updated August 31, 2017
%%%%%

clear, clc, close all
~~~~

Again, this simulation is well-described in Bard and Faulkner, Appendix B.
Highly recommended for all the details.
This walkthrough is designed to serve as a "practical" guide to performing these
simulations, as well as to make Bard and Faulkner's
occasionally dense writing style more accessible.

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

~~~~matlab
%%% SIMULATION VARIABLES %%%
L      = 500;    % [=] number of iterations per t_k (pg 790). Default = 500
DM     = 0.45;   % [=] model diffusion coefficient (pg 788). Default = 0.45
~~~~

$ L $ and $ D_M $ are two intrinsic simulation variables.

$ L $ is the *number of timesteps* in our simulation.
Our experiment will take some amount of real time ($ t_k $, as discussed below).
For a trivial example, if our experiment sweeps from $ +1 \text{V} $ to
$ -1 \text{V} $ at a rate of $ 1 \text{ V/s} $, we are simulating a total
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
  so it's already computationally inexpensive.
  In my experience, $ L = 500 $ produces smooth curves.
- Changing $ L $ will change the magnitude of dimensionless current, so don't
  change $ L $ when comparing two simulations - unless, of course, you're
  interested in understanding the effect of $ L $ 😉.

#### TODO

$ D_M $ is the *model diffusion coefficient*.
$ D_M $ is defined as $ D\Delta t / \Delta x^2 $.

~~~~matlab
%%% DERIVED CONSTANTS %%%
j      = ceil(4.2*L^0.5)+5;   % [=] number of boxes. If L~200, j=65
Deta   = (etai-etaf)/v;       % [=] s, time of one scan (pg 790)
tk     = 2*Deta;              % [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
Dt     = tk/L;                % [=] s, delta time (Eqn B.1.10, pg 790)
Dx     = sqrt(D*Dt/DM);       % [=] cm, delta x (Eqn B.1.13, pg 791)
ktk    = k1*tk;               % [=] dimensionless kinetic parameter (Eqn B.3.7, pg 797)
km     = ktk/L;               % [=] normalized dimensionless kinetic parameter (see bottom of pg 797)
Lambda = k0/(D*f*v)^0.5;      % [=] dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)
~~~~

#### TODO

This section shows the derived constants. I'll walk through each of them
individually:
- $ j $ (`j`) is
- $ \Delta \eta $ (`Deta`) is
- $ t_k $ (`tk`) is
- $ \Delta t $ (`dt`) is
- $ \Delta x $ (`dx`) is
- $ k_1 t_k $ (`ktk`) is
- $ \Lambda $ (`Lambda`) is

~~~~matlab
if km>0.1
    warning(['k_c*t_k/l equals ' num2str(km) ...
        ', which exceeds the upper limit of 0.1 (see B&F, pg 797)'])
end
~~~~

#### TODO

In my experience, this simulation only breaks under one well-documented condition,
which is addressed by Bard and Faulkner.

Almost there. The next section is mostly pre-initialization:
~~~~matlab
%%% PRE-INITIALIZATION %%%
k = 0:L;
t = Dt * k;
X = (k+1)/sqrt(L*DM);
eta1 = etai - v*t; % negative scan
eta2 = etaf + v*t; % positive scan
eta = [eta1(eta1>etaf) eta2(eta2<=etai)]'; % eta includes both fwd and rev
Enorm = eta*f;
kf = ( k0*tk*exp(  -alpha *Enorm) )./( sqrt(DM*L)*Dx );
kb = ( k0*tk*exp((1-alpha)*Enorm) )./( sqrt(DM*L)*Dx );

O = C*ones(L+1,j); % Initial concentrations of O
R = zeros(L+1,j);  % Initial concentrations of R
Z = zeros(L+1,1);  % Dimensionless current
~~~~

#### TODO

Again, I'll walk through the variables:
- $ k $ (`k`) is
- $ t $ (`t`) is
- $ X $ (`X`) is
- $ \eta 1 $ (`eta1`) and $ \eta 2 $ (`eta2`) combine to form $ \eta $ (`eta`),
  which
- $ E_{norm} $ (`Enorm`) is
- $ k_f $ (`k_f`) and $ k_b $ (`k_b`) are
- `O` and `R` are the initial concentrations of $ O $ and $ R $, respectively.
  The initial concentration of $ O $ is $ C $, and the initial concentration
  of $ R $ is $ 0 $.
  The size of `O` and `R` is
- `Z` is the dimensionless current, which we'll plot at the end.
  We need

We'll now calculate our first current:

~~~~matlab
% First dimensionless current (pg 792)
Z(1) = ( kf(1)*O(1,2) - kb(1)*R(1,2) ) ./ (1 + kf(1) + kb(1));
~~~~

#### TODO

Since there is no flux at $ t = 0 $, we

And finally, the bulk of the simulation:

~~~~matlab
%%% START SIMULATION %%%
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

#### TODO:
- `O(i1,2)` instead of `O(i1,1)`?
- `Z(i1)` twice?

We're done! Plot `eta` vs `Z` to see the final result.

~~~~matlab
plot(eta,Z)
xlabel('Overpotential (V)'), ylabel('Dimensionless current')
~~~~
