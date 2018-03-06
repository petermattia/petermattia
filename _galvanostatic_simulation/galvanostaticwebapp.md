---
layout: page
title: Galvanostatic simulator web app
categories: articles
description: A JavaScript web app for galvanostatic simulations, built with plotly.js
---

<html lang="en">
<head>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.16.3/math.min.js"></script>
    <script src="/assets/galv_sim.js" type="text/javascript"></script>

    <style>
      html, body, h1, h2, h3, h4, h5, h6 {
      font: 400 16px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    input[type=text] {
      padding: 2px 2px;
      margin: 2px 0;
      box-sizing: border-box;
    }
    /* Create two equal columns that floats next to each other */
    .column {
      float: left;
      width: 50%;
      padding: 10px;
    }

    /* Clear floats after the columns */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    </style>
</head>

<body>
  This app simulates a one-electron electrochemical
  reaction under galvanostatic control:

  $$ O + e^- \overset{k_f}{\underset{k_r}{\leftrightarrows}} R $$

  I discuss the science behind this simulation on
  <a href="/articles/2017/09/24/cyclic-voltammetry-web-app.html">this page</a>.
  I hope that this tool increases the accessibility of simple electrochemical simulations.
  Please contact me with any questions, comments, or suggestions!
  <br><br>
  To save an image and extract the <i>x-y</i> data, use the first two buttons
  in the toolbar.

  <br><br>
  <div id="galv_plot"><!-- Plotly chart will be drawn inside this DIV --></div>
  <br>
  $ C_O = $ <input type="text" id="conc" value="1"> $ \text{mol/cm}^3 $, initial concentration of $ O $ <br>
  $ D = $ <input type="text" id="D" value="1E-5"> $ \text{cm}^2 \text{/s} $, diffusion coefficient of both $ O $ and $ R $<br>
  $ j = $ <input type="text" id="j" value="1E0"> $ \text{A/m}^2 $, applied current <br>
  $ n = $ <input type="text" id="n" value="1">, $ e^- $ per reaction <br>
  $ \alpha = $ <input type="text" id="alpha" value="0.5">, charge transfer coefficient <br>
  $ k_0 = $ <input type="text" id="k0" value="1E-2"> $ \text{cm/s} $, electrochemical rate constant <br>
  $ L = $ <input type="text" id="L" value="1000">, simulation resolution <br>
  <br>

  <div class="row">
    <div class="column">
      Legend: <input type="text" id="legend" value="sim2"> <br>
      <br>
      <button id="addDataset" class="w3-btn w3-ripple w3-green">Add</button>
      <button id="removeDataset" class="w3-btn w3-ripple w3-green">Remove</button>
    </div>
    <div class="column">
      Simulation timescale,
      $ \tau = $ <input type="text" id="tau" value="0" class="field left" readonly> $ \text{s} $
      <br>
    </div>
  </div>
  <br><br>

  <script>
    galv_plotID = document.getElementById('galv_plot');

    // Initialize CV plot with IV curve generated using default values
    var result = galv_plot();
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
      title: 'Galvanostatic simulation',
      xaxis: {
        title: 'Voltage (V vs O/O<sup>-</sup>)',
        showgrid: true,
        zeroline: false
      },
      yaxis: {
        title: 'A(dQ/dV) (Ah/V)',
        showgrid: true,
        zeroline: false
      },
      displaylogo: false,
      hovermode: 'closest'
    };

    Plotly.newPlot('galv_plot', data, layout);

    // Add button
    document.getElementById('addDataset').addEventListener('click', function() {
      // Get legend
      legendlabel = document.getElementById('legend').value;

      // Run simulation
      var result = galv_plot();
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
      Plotly.newPlot('galv_plot', data, layout);

      // update legend text box
      var simnum = data.length + 1;
      document.getElementById('legend').value = 'sim' + simnum.toString();
    });

    // Remove button
    document.getElementById('removeDataset').addEventListener('click', function() {
        // remove data and update plot
        data.pop();
        Plotly.newPlot('galv_plot', data, layout);

        // update legend text box
        var simnum = data.length + 1;
        document.getElementById('legend').value = 'sim' + simnum.toString();
    });

  </script>
</body>
