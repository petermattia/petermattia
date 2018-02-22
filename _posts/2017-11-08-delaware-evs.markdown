---
layout: post
categories: articles
title: Electric vehicles in Delaware
date: 2017-11-08
description: Exploring electric vehicle purchases in Delaware using pandas and folium
tags: data-science
---

<p><a href="http://www.exoticspotter.com/tesla-model-s-newark-delaware-130588">
<img src="\img\delaware-EVs\de_tesla.jpg" style="display:block; margin-left: auto; margin-right: auto;">
</a></p>

As I was looking for data to use for practicing data analysis in Python,
I came across a dataset combining two of my favorite things:
Delaware and battery-powered vehicles.
This dataset, [State Rebates for Alternative-Fuel Vehicles](https://data.delaware.gov/Energy-and-Environment/State-Rebates-for-Alternative-Fuel-Vehicles/8z8z-di7f),
contains information on successful applicants for rebates issued by the state under the
[Delaware Clean Transportation Incentive Program](http://www.dnrec.delaware.gov/energy/pages/clean-transportation-incentives-home.aspx),
a recent program designed to encourage the purchase of "alternative fuel vehicles".
The dataset is maintained by the [Delaware Open Data Portal](https://data.delaware.gov).

In this post, I'll discuss the highlights from my analysis.
My primary interest is understanding trends in electric vehicle adaptation in Delaware.
I have a special interest in Teslas, so I often compare broader trends in
alternative fuel vehicle (AFV) purchases to the Tesla subset.

### Population statistics

#### Age

The below figure displays histograms of AFV consumer ages,
with the right plot binned by decade of life:

<img src="\img\delaware-EVs\age.svg" style="display:block; margin-left: auto; margin-right: auto;">

The age distribution is roughly Gaussian, centered on applicants in their 50s.

As an aside, I noticed that two of the most frequent ages are 50 and 65 years old.
Perhaps these consumers are doing what many Americans do when they turn 50 or 65:
purchasing a new car?

Here's the same plot for just Tesla consumers:

<img src="\img\delaware-EVs\age_tesla.svg" style="display:block; margin-left: auto; margin-right: auto;">

Tesla buyers skew younger, with a population distribution centered on
consumers in their 40s.
However, my mid-life crisis theory didn't hold for this data 😉.

#### Vehicle types, makes, and models

The most common alternative fuel vehicles in Delaware are plug-in hybrids:

<img src="\img\delaware-EVs\vehicle_types.svg" style="display:block; margin-left: auto; margin-right: auto;">

The propane vehicles are exclusively buses, meaning consumer rebates are
only for purchases of plug-in hybrids and electric vehicles.

The most common make of AFVs sold in Delaware is Ford...

<img src="\img\delaware-EVs\make.svg" style="display:block; margin-left: auto; margin-right: auto;">

...primarily due to their Fusion Energi and C-Max Energi models.

<img src="\img\delaware-EVs\models.svg" style="display:block; margin-left: auto; margin-right: auto;">

If we only look at battery-powered electric vehicles, Teslas are the most popular.

<img src="\img\delaware-EVs\electric_models.svg" style="display:block; margin-left: auto; margin-right: auto;">

### Spatial distribution of alternative fuel vehicles

Delaware, the 49<sup>th</sup> largest state in the country, has three counties:
New Castle, Kent, and Sussex.
New Castle is the most urban and suburban, and the most populous,
and is often considered a part of the Philadelphia metropolitan area.
Kent and Sussex counties are affectionately refered to as
["slower lower"](https://www.washingtonpost.com/wp-dyn/articles/A54428-2004May25.html)
due to their rural culture.
However, Sussex County is home to some of the East Coast's most popular
(and finest) beaches, so its coastal regions are fairly affluent.

Let's look at the distribution of AFVs and Teslas, by county:

<img src="\img\delaware-EVs\counties.svg" style="display:block; margin-left: auto; margin-right: auto;">

The trends in the third plot, the fraction of AFV purchases that are Teslas,
scales with affluence.

We can also normalize by the population in each county,
although the same trends still hold.

<img src="\img\delaware-EVs\counties_norm.svg" style="display:block; margin-left: auto; margin-right: auto;">

We can better understand these trends by
visualizing the geographic distribution of
alterative fuel vehicles by zip code, below:

<img src="\img\delaware-EVs\afv_norm_map.png" style="display:block; margin-left: auto; margin-right: auto;">

We don't observe major gradients between zip codes, but there is
certainly a higher concentration of AFVs in northern Delaware and the beaches.

The same map, just for Teslas:

<img src="\img\delaware-EVs\tesla_map.png" style="display:block; margin-left: auto; margin-right: auto;">

Here, we see starker differences between the more affluent zip codes of
northern Delaware and the beaches, and the rest of the state.

### Change in rebate policy

Effective November 1, 2016, Delaware changed its AFV rebate policy:

<table style="width:100%">
  <thead>
    <tr>
      <th>Type of Vehicle</th>
      <th><a href="http://www.dnrec.delaware.gov/energy/Pages/Clean-Transportation-July2015-October2016.aspx">
      Rebate amount under old policy</a></th>
      <th><a href="http://dnrec.alpha.delaware.gov/energy-climate/clean-transportation/vehicle-rebates/">
      Rebate amount under new policy</a></th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td style="text-align:center"> New Plug-in Hybrid Electric Vehicles </td>
      <td style="text-align:center"> $2,200 </td>
      <td style="text-align:center"> $1,500 </td>
    </tr>
    <tr>
      <td style="text-align:center"> New Battery Electric Vehicles </td>
      <td style="text-align:center"> $2,200 </td>
      <td style="text-align:center"> $3,500 </td>
    </tr>
    <tr>
      <td style="text-align:center"> New AFVs with MSRP >$60,000 </td>
      <td style="text-align:center"> $2,200 </td>
      <td style="text-align:center"> $1,000 </td>
    </tr>
  </tbody>
</table><br>

This policy increases the incentive to purchase non-luxury battery
electric vehicles;
interestingly, [every EV currently on the market except Teslas fall into
this category](http://www.dnrec.delaware.gov/energy/Documents/Transportation%20Program/Clean%20Transportation%20Updates/Vehicle%20List.pdf).
The logic is likely that Tesla buyers are wealthy enough - and interested
enough - to purchase a Tesla without a government subsidy.
The incentives for PHEVs is also reduced.

How does this change in policy affect sales of alternative fuel vehicles?
We can plot the change in purchases/month before and after the change in policy
for different vehicle types:

<img src="\img\delaware-EVs\policy_change_type.svg" style="display:block; margin-left: auto; margin-right: auto;">

On first glance, the affect looks massive! We see a 150% increase in the
sale of non-luxury electric vehicles.

We can also see which automakers benefitted the most:

<img src="\img\delaware-EVs\policy_change_make.svg" style="display:block; margin-left: auto; margin-right: auto;">

Not surprisingly, automakers that mostly make non-luxury electric vehicles
benefitted the most.

A fair question to ask is: is the increase in non-Tesla battery electric vehicles
due to the change in policy, or another factor like broader interest in
green vehicles, automaker marketing, etc?
We can't answer this question definatively without access to a few parallel
universes, but we can best estimate it by looking at trends in the sales
of different vehicle classes.
The red line represents when the new policy took effect.

<img src="\img\delaware-EVs\policy_change_trends.svg" style="display:block; margin-left: auto; margin-right: auto;">

Right after the new policy took effect, the rate of sales of PHEVs
and non-luxury EVs seems unchanged, and there's actually a slight
increase in the rate of Tesla sales!
This result indicates that the rebate had little immediate effect
on AFV sales;
in fact, the large increase in non-Tesla EVs came six months later,
in the summer of 2017.
However, it's possible that this future increase wouldn't have happened
without the more generous subsidy.
Bottom line is it's hard to say either way.

### Conclusions

Overall, I'm encouraged by what seems to be accelerating EV sales in Delaware.
If only we had better batteries...

### More information

The Jupyter notebooks for [data cleaning](https://nbviewer.jupyter.org/github/petermattia/Delaware-EVs/blob/master/Electric%20vehicles%20in%20Delaware%20-%20Data%20cleaning.ipynb?flush_cache=true)
and [data analysis](https://nbviewer.jupyter.org/github/petermattia/Delaware-EVs/blob/master/Electric%20vehicles%20in%20Delaware%20-%20Data%20analysis.ipynb?flush_cache=true), along with all files,
are in [this GitHub repository](https://github.com/petermattia/Delaware-EVs).
I used the
[numpy](http://numpy.org) (numerics),
[pandas](https://pandas.pydata.org) (data frames),
[folium](https://folium.readthedocs.io/en/latest/) (mapping),
[matplotlib](https://matplotlib.org) (plotting), and
[seaborn](https://seaborn.pydata.org) (plot formatting)
libraries extensively in this analysis.
