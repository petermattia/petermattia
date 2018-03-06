// Peter Attia
// galv_sim.js
// 03-05-2018
// MIT License

var galv_plot = function() {
  // Parse text field values entered by user
  var C = parseFloat(document.getElementById('conc').value);
  var D = parseFloat(document.getElementById('D').value);
  var j = parseFloat(document.getElementById('j').value);
  var n = parseFloat(document.getElementById('n').value);
  var alpha = parseFloat(document.getElementById('alpha').value);
  var k0 = parseFloat(document.getElementById('k0').value);
  var L = parseFloat(document.getElementById('L').value);

  // CONSTANTS
  var F = 96485;   // [=] C/mol, Faraday's constant
  var R = 8.3145; // [=] J/mol-K, ideal gas constant
  var T = 298.15;  // [=] K, temperature. Default = 298.15
  var f = F/(R*T); // [=] 1/V, normalized Faraday's constant at room temperature

  // DERIVED CONSTANTS
  var A = F*k0*C; // [=] A/m^2
  var B = (-2*j*k0) / (Math.pow(Math.PI*D,0.5)); // [=] A/m^2
  var c1 = -alpha*f;
  var c2 = (1-alpha)*f;
  console.log(n.toString());
  console.log(F.toString());
  console.log(D.toString());
  console.log(C.toString());
  console.log(j.toString());
  var tau = 0.9999 * Math.pow( n*F*Math.pow(Math.PI*D,0.5)*C / (2 * j) ,2);
  console.log(tau)

  // UPDATE SIMULATION PARAMETERS
  document.getElementById("tau").value = (tau/3600).toExponential(2);

  // PRE-INITIALIZATION
  var tlist = linspace(0,tau,L); //[=] s, time vector
  var V = zeros1D(L);
  var initGuess = 0.1;

  // START SIMULATION
  for(var i1=0; i1<L; i1++) {

    //JO[i1+1] = ( kf[i1+1]*O[i1+1][1] - kb[i1+1]*R[i1+1][1] ) / (1 + Dx/D*(kf[i1+1] + kb[i1+1]) );
    // Calculate potential
    var t = tlist[i1];
    var params = [A, B, c1, c2, t, j];
    V[i1] = fsolve(params);
  }

  // Calculate capacity, Q, from time and current: Q = It
  Q = math.eval('t./3600.*j',{t:tlist, j:j}); // [=] Ah/m^2

  console.log(V);
  console.log(Q);

  diffQ = diff(Q);
  diffV = diff(V);
  dQdV  = zeros1D(L-1);
  for (i1=0; i1<L-1; i1++){
    dQdV[i1] = diffQ[i1]/diffV[i1];
  }
  dQdV.splice(0,1);
  V.splice(0,1);
  V.splice(-1,1);

  return [V, dQdV];
}

///////////////// HELPER FUNCTIONS /////////////////

function zeros1D(rows){
  // makes a 1D array of 0s
  var arr = [];
  for (i1=0; i1<rows; i1++){
    arr[i1] = 0;
  }
  return arr;
}

function diff(arr){
  // takes the difference between subsequent elements in array
  var diffarr = [];
  for (i1=1; i1<arr.length; i1++){
    diffarr[i1] = arr[i1] - arr[i1-1];
  }
  return diffarr;
}

function linspace(a,b,n) {
    // From https://gist.github.com/joates/6584908
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

// Equation solver via Newton's method:
// From https://gist.github.com/TragicSolitude/796f2a1725e9abf13638

function fsolve(simParams){
  var precision = 0.0001;
  var prevGuess = 0;

  var A = simParams[0];
  var B = simParams[1];
  var c1 = simParams[2];
  var c2 = simParams[3];
  var t = simParams[4];
  //console.log(t.toString()); good here
  var j = simParams[5];

  return newtonsMethod(-0.1);

  function f(x) {
    //console.log(t.toString());
    //console.log((A + B*t^0.5).toString());
    return (A + B*Math.pow(t,0.5))*Math.exp(c1*x) + B*Math.pow(t,0.5)*Math.exp(c2*x) - j;
  }

  function derivative(f) {
    var h = 0.001;
    return function(x) { return (f(x + h) - f(x - h)) / (2 * h); };
  }

  function newtonsMethod(guess) {
    if (guess === null || guess === undefined) {guess = 0;}

    if (Math.abs(prevGuess - guess) > precision) {
      prevGuess = guess;
      var approx = guess - (f(guess) / derivative(f)(guess));
      return newtonsMethod(approx);
    } else {
      //prevGuess = 0;
      //console.log(guess.toString());
      return guess;
    }
  }
}
