%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% CVsim.m - Cyclic voltammetry simulation
% Peter Attia
% Based on Bard and Faulkner, Appendix B
% EC mechanism
% Updated September 24, 2017

% This version adheres more strictly to the Bard and Faulkner
% dimensionless variable convention. I recommend Brown's formulation
% ('CVsim.m') for a more intuitive understanding of the simulation.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

clear, clc, close all

%% INDEPENDENT VARIABLES %%
C      = 1.0;    % [=] mol/cm^3, initial concentration of O. Default = 1.0
D      = 1E-5;   % [=] cm^2/s, O & R diffusion coefficient. Default = 1E-5
etai   = +0.2;   % [=] V, initial overpotential (relative to redox potential). Default = +0.2
etaf   = -0.2;   % [=] V, final overpotential (relative to redox potential). Default = -0.2
v      = 1E-3;   % [=] V/s, sweep rate. Default = 1E-3
n      = 1.0;    % [=] number of electrons transfered. Default = 1
alpha  = 0.5;    % [=] dimensionless charge-transfer coefficient. Default = 0.5
k0     = 1E-2;   % [=] cm/s, electrochemical rate constant. Default = 1E-2
kc     = 1E-3;   % [=] 1/s, chemical rate constant. Default = 1E-3
T      = 298.15; % [=] K, temperature. Default = 298.15

%% CONSTANTS %%
F      = 96485;   % [=] C/mol, Faraday's constant
R      = 8.3145;  % [=] J/mol-K, ideal gas constant
f      = F/(R*T); % [=] 1/V, normalized Faraday's constant at room temperature

%% SIMULATION VARIABLES %%
L      = 500;    % [=] number of iterations per t_k (pg 790). Default = 500
DM     = 0.45;   % [=] model diffusion coefficient (pg 788). Default = 0.45

%% DERIVED CONSTANTS %%
tk  = 2*(etai-etaf)/v;    % [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
Dt  = tk/L;               % [=] s, delta time (Eqn B.1.10, pg 790)
Dx  = sqrt(D*Dt/DM);      % [=] cm, delta x (Eqn B.1.13, pg 791)
j   = ceil(4.2*L^0.5)+5;  % number of boxes (pg 792-793). If L~200, j=65

%% REVERSIBILITY PARAMETERS %%
ktk    = kc*tk              % dimensionless kinetic parameter (Eqn B.3.7, pg 797)
km     = ktk/L              % normalized dimensionless kinetic parameter (see bottom of pg 797)
Lambda = k0/(D*f*v)^0.5     % dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)

%%% CHEMICAL REVERSIBILITY WARNING %%%
if km>0.1
    warning(['k_c*t_k/l equals ' num2str(km) ...
        ', which exceeds the upper limit of 0.1 (see B&F, pg 797)'])
end

%% PRE-INITIALIZATION %%
k = 0:L;                % time index vector
t = Dt * k;             % time vector
eta1 = etai - v*t;      % overpotential vector, negative scan
eta2 = etaf + v*t;      % overpotential vector, positive scan
eta = [eta1(eta1>etaf) eta2(eta2<=etai)]'; % overpotential scan, both directions
Enorm = eta*f;          % normalized overpotential
kf = (k0*(tk/D)^0.5).*exp(  -alpha *n*Enorm); % dimensionless fwd rate constant (pg 799)
kb = (k0*(tk/D)^0.5).*exp((1-alpha)*n*Enorm); % dimensionless rev rate constant (pg 799)

O = C*ones(L+1,j); % [=] mol/cm^3, concentration of O
R = zeros(L+1,j);  % [=] mol/cm^3, concentration of R
Z = zeros(1,L+1);  % dimensionless flux of O at the surface

%% START SIMULATION %%
% k = time index. j = distance index
for i1 = 1:L+1
    % Update flux
    Z(i1)   = ( kf(i1).*O(i1,2) - kb(i1).*R(i1,2) ) ./ (1 + kf(i1) + kb(i1));

    % Update surface concentrations
    O(i1,1) = O(i1,2) - Z(i1);
    R(i1,1) = R(i1,2) + Z(i1) - km*R(i1,1);

    % Update bulk concentrations of O and R
    for i2 = 2:j-1
        O(i1+1,i2) = O(i1,i2) + DM*(O(i1,i2+1)+O(i1,i2-1)-2*O(i1,i2));

        R(i1+1,i2) = R(i1,i2) + DM*(R(i1,i2+1)+R(i1,i2-1)-2*R(i1,i2)) ...
            - km * R(i1,i2);
    end
end

%% PLOT RESULTS %%
% Sometimes length(eta) = length(Z) + 1. If this is the case, truncate last value
if length(eta) > length(Z)
    eta = eta(1:end-1);
end
hold on, plot(eta,-Z.*16)
xlabel('Overpotential (V)'), ylabel('Dimensionless current')
