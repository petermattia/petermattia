
var CVplot = function() {
  // Parse text field values entered by user
  var C = parseFloat(document.getElementById('conc').value);
  var D = parseFloat(document.getElementById('conc').value);
  var etai = parseFloat(document.getElementById('etai').value);
  var etaf = parseFloat(document.getElementById('etaf').value);
  var v = parseFloat(document.getElementById('v').value);
  var alpha = parseFloat(document.getElementById('alpha').value);
  var k0 = parseFloat(document.getElementById('k0').value);
  var k1 = parseFloat(document.getElementById('k1').value);

  // CONSTANTS
  var F = 96485;   // [=] C/mol, Faraday's constant
  var R = 8.3145; // [=] J/mol-K, ideal gas constant
  var T = 298.15;  // [=] K, temperature. Default = 298.15
  var f = F/(R*T); // [=] 1/V, normalized Faraday's constant at room temperature

  // SIMULATION VARIABLES
  var L  = 500;  // [=] number of iterations per t_k (pg 790). Default = 500
  var DM = 0.45; // [=] model diffusion coefficient (pg 788). Default = 0.45

  // DERIVED CONSTANTS
  var tk  = 2*(etai-etaf)/v;   // [=] s, characteristic exp. time (pg 790). In this case, total time of fwd and rev scans
  var Dt  = tk/L;              // [=] s, delta time (Eqn B.1.10, pg 790)
  var Dx  = math.sqrt(D*Dt/DM);     // [=] cm, delta x (Eqn B.1.13, pg 791)
  var j   = math.ceil(4.2*math.sqrt(L))+5; // number of boxes (pg 792-793). If L~200, j=65

  // REVERSIBILITY PARAMETERS
  var ktk    = k1*tk;           // dimensionless kinetic parameter (Eqn B.3.7, pg 797)
  var km     = ktk/L;           // normalized dimensionless kinetic parameter (see bottom of pg 797)
  var Lambda = k0/math.sqrt(D*f*v);  // dimensionless reversibility parameter (Eqn 6.4.4, pg. 236-239)

  // UPDATE REVERSIBILITY PARAMETERS
  document.getElementById("echemrev").value = Lambda.toExponential(3);
  document.getElementById("chemrev").value = km.toExponential(3);

  // CHEMICAL REVERSIBILITY WARNING
  if (km>0.1) {
    var warning = 'k_c*t_k/L equals '+ km.toString() +', which exceeds the upper limit of 0.1 (see B&F, pg 797)';
  } else {
    var warning = 'No warnings';
  }
  document.getElementById("chemrevwarn").value = warning;

  // PRE-INITIALIZATION
  var k = math.range(0,L+1);    // time index vector
  console.log(k);
  var t = k.clone();
  for(var i=0; i<k.length; i++) { // time vector
    t[i] *= Dt;
  }
  var eta1 = t.clone();
  var eta2 = t.clone();
  for(var i=0; i<k.length; i++) { // time vector
    eta1[i] = etai - v*t[i]; // overpotential vector, negative scan
    eta2[i] = etaf + v*t[i]; // overpotential vector, positive scan
  }
  console.log(t);

  // overpotential scan, both directions
  var eta = t.clone();
  var i = 0;
  var curr_eta = etai;
  while(curr_eta>etaf){
    eta[i] = curr_eta;
    i += 1;
    curr_eta = eta1[i];
  }
  eta[i] = etaf;
  i += 1;
  curr_eta = etaf;
  while(curr_eta<etai){
    eta[i] = curr_eta;
    i += 1;
    curr_eta = eta1[i];
  }
  console.log(eta);

  /*
  var Enorm = eta;
  for(var i=0; i<eta.length; i++) { // time vector
    Enorm[i] *= f; // normalized overpotential
  }
  var kf = Enorm;
  var kr = Enorm;
  for(var i=0; i<eta.length; i++) { // time vector
    kf[i] = k0*exp(  -alpha *n*Enorm[i]); // [=] cm/s, fwd rate constant (pg 799)
    kb[i] = k0*exp((1-alpha)*n*Enorm[i]); // [=] cm/s, rev rate constant (pg 799)
  }

  */
  var O = math.matrix(math.ones([L+1, j])); // [=] mol/cm^3, concentration of O
  var R = math.matrix(math.zeros([L+1, j])); // [=] mol/cm^3, concentration of O
  var JO = math.matrix(math.zeros([1,L+1])); // [=] mol/cm^2-s, flux of O at the surface

  /*
  // START SIMULATION
  // i1 = time index. i2 = distance index
  for(var i1=0; i1<L.length; i1++) {
      // Update bulk concentrations of O and R
      for(var i2=1; i2<j; i2++) {
        O(i1+1,i2) = O(i1,i2) + DM*(O(i1,i2+1)+O(i1,i2-1)-2*O(i1,i2));

        R(i1+1,i2) = R(i1,i2) + DM*(R(i1,i2+1)+R(i1,i2-1)-2*R(i1,i2)) ...
        - km * R(i1,i2);
      }

      // Update flux
      JO(i1+1)   = ( kf(i1+1).*O(i1+1,2) - kb(i1+1).*R(i1+1,2) ) ./ (1 + Dx/D*(kf(i1+1) + kb(i1+1)) );

      // Update surface concentrations
      O(i1+1,1) = O(i1+1,2) - JO(i1+1)*(Dx/D);
      R(i1+1,1) = R(i1+1,2) + JO(i1+1)*(Dx/D) - km*R(i1+1,1);
  }
  */
  // Calculate current density, Z, from flux of O
  var Z = JO.clone();
  for(var i=0; i<JO.length; i++) { // time vector
    Z[i] *= -n*F*JO[i]/10; // [=] A/m^2 -> mA/cm^2, current density
  }
  /*
  // PLOT RESULTS
  // Sometimes length(eta) = length(Z) + 1. If this is the case, truncate last value
  if length(eta) > length(Z)
    eta = eta(1:end-1);
  end
  */

  //var eta = [1, 2, 3, 4];
  //var Z = [C, randomWholeNum(), randomWholeNum(), randomWholeNum()];
  return [eta, Z];
}


function randomWholeNum() {return Math.floor(Math.random() * 20);}
