---
layout: page
categories: articles
title: "Cyclic Voltammetry App: Code"
---

The full simulation code is posted below.

~~~~matlab
%%%%%
% This simulation is based on Bard and Faulkner, 2nd edition, Appendix B.
%%%%%

%%% USER-CONTROLLED VARIABLES %%%
C = app.Cfield.Value; % [=] mol/cm^3, initial concentration of O
D = app.Dfield.Value; % [=] cm^2/s, O & R diffusion coefficient
etai = app.etaifield.Value; % [=] V, initial overpotential (relative to redox potential)
etaf = app.etaffield.Value; % [=] V, final overpotential (relative to redox potential)
v = app.vfield.Value; % [=] V/s, sweep rate
alpha = app.alphafield.Value; % [=] dimensionless charge transfer coefficient
k0 = app.k0field.Value; % [=] cm/s, electrochemical rate constant
k1 = app.k1field.Value; % [=] 1/s, chemical rate constant

%%% SIMULATION VARIABLES %%%
L      = 500;    % [=] number of iterations per t_k (pg 790). Default = 500
DM     = 0.45;   % [=] model diffusion coefficient (pg 788). Default = 0.45

%%% CONSTANTS %%%
F      = 96485;   % [=] C/mol, Faraday's constant
R      = 8.3145;  % [=] J/mol-K, ideal gas constant
T      = 298.15;  % [=] K, temperature. Default = 298.15
f      = F/(R*T); % [=] dimensionless Faraday's constant at room temperature

%%% DERIVED CONSTANTS %%%
j      = ceil(4.2*L^0.5)+5;   % [=] number of boxes. If L~200, j=65
Deta   = (etai-etaf)/v;       % [=] s, time of one scan (pg 790)
tk     = 2*Deta;              % [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
Dt     = tk/L;                % [=] s, delta time (Eqn B.1.10, pg 790)
Dx     = sqrt(D*Dt/DM);       % [=] cm, delta x (Eqn B.1.13, pg 791)
ktk    = k1*tk;               % [=] dimensionless kinetic parameter (Eqn B.3.7, pg 797)
km     = ktk/L;               % [=] normalized dimensionless kinetic parameter (see bottom of pg 797)
Lambda = k0/(D*f*v)^0.5;      % [=] dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)

if km>0.1
warning(['k_c*t_k/l equals ' num2str(km)...
', which exceeds the upper limit of 0.1 (see B&F, pg 797)'])
end

%%% START SIMULATION %%%
k = 0:L;
t = Dt * k;
X = (k+1)/sqrt(L*DM);
eta1 = etai - v*t; % negative scan
eta2 = etaf + v*t; % positive scan
eta = [eta1(eta1>etaf) eta2(eta2<=etai)]'; % eta includes both fwd and rev
Enorm = eta*f;
kf = ( k0*tk*exp(  -alpha *Enorm) )./( sqrt(DM*L)*Dx );
kb = ( k0*tk*exp((1-alpha)*Enorm) )./( sqrt(DM*L)*Dx );

A = C*ones(length(k)-1,j);
B = zeros(length(k)-1,j);
Z = zeros(length(k)-1,1);

Z(1) = ( kf(1)*A(1,2) - kb(1)*B(1,2) ) ./ (1 + kf(1) + kb(1));

for i1 = 2:length(k)-1
Z(i1)   = ( kf(i1).*A(i1,2) - kb(i1).*B(i1,2) ) ./ (1 + kf(i1) + kb(i1));
A(i1,1) = A(i1,2) - Z(i1) + km*B(i1-1,1);
B(i1,1) = B(i1,2) + Z(i1) - km*B(i1-1,1);

for i2 = 2:j-1
A(i1,i2) = A(i1-1,i2) + DM*(A(i1-1,i2+1)+A(i1-1,i2-1)-2*A(i1-1,i2)) + ...
+ km * B(i1-1,i2);

B(i1,i2) = B(i1-1,i2) + DM*(B(i1-1,i2+1)+B(i1-1,i2-1)-2*B(i1-1,i2)) + ...
- km * B(i1-1,i2);

end

Z(i1)   = ( kf(i1).*A(i1,2) - kb(i1).*B(i1,2) ) ./ (1 + kf(i1) + kb(i1));

end
eta = eta(1:end-1);
Z = Z(1:end-1);
~~~~
