%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% galvsim.m - Galvanostatic simulation
% Peter Attia
% Based on Bard and Faulkner, Equation 8.3.96
% E mechanism
% Updated March 6, 2018
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

clear, clc, close all

global A B c1 c2 j_app t

%% INDEPENDENT VARIABLES %%
C      = 1.0;   % [=] mol/cm^3, initial concentration of O. Default = 1.0
D      = 1E-5;  % [=] cm^2/s, O & R diffusion coefficient. Default = 1E-5
j_app  = 1E0;   % [=] A/m^2, applied current density. Default = 1E-3
n      = 1.0;   % [=] number of electrons transfered. Default = 1
alpha  = 0.5;   % [=] dimensionless charge-transfer coefficient. Default = 0.5
k0     = 1E-2;  % [=] cm/s, electrochemical rate constant. Default = 1E-2
L      = 200;   % [=] dimensionless simulation resolution

%% PHYSICAL CONSTANTS %%
F      = 96485;   % [=] C/mol, Faraday's constant
R      = 8.3145;  % [=] J/mol-K, ideal gas constant
T      = 298.15;  % [=] K, temperature. Default = 298.15
f      = F/(R*T); % [=] dimensionless Faraday's constant at room temperature

%% DERIVED CONSTANTS %%
A = F*k0*C; % [=] A/m^2
B = (-2*j_app*k0) / (pi^0.5*D^0.5); % [=] A/m^2
c1 = -alpha*f;
c2 = (1-alpha)*f;
tau = 0.9999 * ( n*F*D^0.5*C*pi^0.5 / (2 * j_app) )^2;

%% START SIMULATION %%
time_array = linspace(0,tau,L)';
V = zeros(length(time_array),1);
for i = 1:length(time_array)
    t = time_array(i);
    V(i) = fsolve(@const_j,0,optimset('Display','off'));
end

% Calculate Q from Q = I*t
Q = j_app.*time_array./3600;

%% DISPLAY RESULTS %%
disp(['Tau = ' num2str(tau/3600,3) ' hours'])

% V(t)
figure, plot(time_array./3600,V)
xlabel('Time (h)'), ylabel('Voltage (V vs O/O^-)')

% V(Q)
figure, plot(Q,V)
xlabel('Capacity (Ah)'), ylabel('Voltage (V vs O/O^-)')

% dQ/dV(V)
figure, plot(V(1:end-1), diff(Q)./diff(V))
xlabel('Voltage (V vs O/O^-)'), ylabel('dQ/dV (Ah/V)')

%% FUNCTION FOR FSOLVE TO OPTIMIZE OVER %%
function F = const_j(x)
    global A B c1 c2 j_app t
    F(1) = (A+B*t^0.5)*exp(c1*x) + B*t^0.5*exp(c2*x) - j_app;
end
