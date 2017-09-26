---
layout: page
title: Cyclic voltammetry web app
categories: articles
description: A Javascript web app for cyclic voltammetry simulations, built with plotly.js
---

<head>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="/assets/CVsim.js" type="text/javascript"></script>

    <style>
      html, body, h1, h2, h3, h4, h5, h6 {
      font: 400 16px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    input[type=text] {
      padding: 2px 2px;
      margin: 2px 0;
      box-sizing: border-box;
    }
    </style>
</head>

<body>

    I did a thing. Check it out here! <br>

    To study the concentration profiles, use the
    <a href="/cyclic_voltammetry_simulation/index.html">MATLAB version</a>
    of this app.

    <div id="CVplot"><!-- Plotly chart will be drawn inside this DIV --></div>
    <br>
    $ C = $ <input type="text" id="conc" value="1"> $ \text{mol/cm}^3 $, initial concentration of $ O $ <br>
    $ D = $ <input type="text" id="D" value="1E-5"> $ \text{cm}^2 \text{/s} $, diffusion coefficient <br>
    $ \eta_i = $ <input type="text" id="etai" value="0.2"> $ \text{V} $, initial overpotential <br>
    $ \eta_f = $ <input type="text" id="etaf" value="-0.2"> $ \text{V} $, final overpotential <br>
    $ \nu = $ <input type="text" id="v" value="1E-2"> $ \text{V/s} $, scan rate <br>
    $ \alpha = $ <input type="text" id="alpha" value="0.5">, charge transfer coefficient <br>
    $ k_0 = $ <input type="text" id="k0" value="1E-5"> $ \text{cm/s} $, electrochemical rate constant <br>
    $ k_1 = $ <input type="text" id="k1" value="1E-5"> $ \text{s}^{-1} $, chemical rate constant <br>
    <br>
    Legend: <input type="text" id="legend" value="sim2"> <br>

    <br>
    <button id="addDataset" class="w3-btn w3-ripple w3-green">Add</button>
    <button id="removeDataset" class="w3-btn w3-ripple w3-green">Remove</button>


    <br><br> Reversibility parameters: <br>
    $ \Lambda = $ <input type="text" id="echemrev" value="0" class="field left" readonly><br>
    $ k_1t_k = $ <input type="text" id="chemrev" value="0" class="field left" readonly><br>
    <textarea cols="50" id="chemrevwarn" value="" class="field left" readonly></textarea><br>

    <br><br>

    <script>
    CVplotID = document.getElementById('CVplot');

    // Initialize CV plot with IV curve generated using default values
    var result = CVplot();
    var xdata = result[0];
    var ydata = result[1];

    var trace1 = {
      x: xdata,
      y: ydata,
      type: 'scatter',
      mode: 'lines',
      name: 'sim1',
      line: {
        width: 3
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Cyclic Voltammetry simulation: EC mechanism',

      xaxis: {
        title: 'Overpotential (V)',
        showgrid: true,
        zeroline: false
      },

      yaxis: {
        title: 'Dimensionless current',
        showgrid: true,
        zeroline: false
      },
    };

    Plotly.newPlot('CVplot', data, layout);

    // Add button
    document.getElementById('addDataset').addEventListener('click', function() {
      // Get legend
      legendlabel = document.getElementById('legend').value;

      // Run simulation
      var result = CVplot();
      var xdata = result[0];
      var ydata = result[1];

      var newline = {
        x: xdata,
        y: ydata,
        type: 'scatter',
        mode: 'lines',
        name: legendlabel,
        line: {
          width: 3
        }
      };

      // add data and update plot
      data.push(newline);
      Plotly.newPlot('CVplot', data, layout);

      // update legend text box
      var simnum = data.length + 1;
      document.getElementById('legend').value = 'sim' + simnum.toString();
    });

    // Remove button
    document.getElementById('removeDataset').addEventListener('click', function() {
        // remove data and update plot
        data.pop();
        Plotly.newPlot('CVplot', data, layout);

        // update legend text box
        var simnum = data.length + 1;
        document.getElementById('legend').value = 'sim' + simnum.toString();
    });

    </script>
    </body>
