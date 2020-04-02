---
layout: post
categories: articles
title: Visualizing COVID-19 growth
date: 2020-04-01
description: Visualizations illustrating the growth of COVID-19
tags: science data-science
---

We're wrapping up one of the most unique months of our lives,
and indeed one of the most unique months of global history.
As I've been trying to wrap my head around news of the COVID-19 pandemic,
I found it challenging to contextualize many of the numbers.
I couldn't find a source that compared multiple views of the same information,
which I often find is the best way to understand a dataset.

So, I made my own visualizations from publicly-available data.
To be clear, I have little background in anything related to the modeling of 
infectious diseases, and as a result I do not try to draw much out of the data.
However, I have found these visualizations helpful in my own understanding of
the spread of the pandemic.

I'd also be remiss to not mention some of the many caveats with this data and analysis:
the number of reported cases obviously does not include the large number of
unreported cases and is dependent on the levels of testing in that country;
many people have questioned the accuracy of reported numbers from some countries;
and country-level views of population density miss important factors related to
local population density and transmissibility.

The data was obtained from the [ECDC](https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide) on April 1, 2020.
The selected countries were chosen fairly arbitrarily based on how frequently
I've seen them in the news.
All code is contained in
[this GitHub repository](https://github.com/petermattia/covid-19-growth);
the primary analysis notebook is [here](https://github.com/petermattia/covid-19-growth/blob/master/covid-19.ipynb).
The interactive plots were created using [Altair](https://altair-viz.github.io/index.html).

## Cases

Of course, note that the number of reported cases is not the number of actual cases.
The number of reported cases varies widely depending on testing practices and other factors.

#### Total cases

{% include_relative /covid-19/Total_cases.html %}

Some observations:
- China's officially reported numbers have encountered
[widespread skepticism](https://time.com/5813628/china-coronavirus-statistics-wuhan/).
My understanding is that this is attributed to
the combination of an overall low number of cases and the changing
definitions of a COVID-19 case.
This skepticism certainly does not seem unwarranted given the odd shape of the curve and its low magnitude.
- The number of cases in all selected countries except China and South Korea
is still rapidly increasing.
- Japan has a shockingly low number of cases, given how often I heard about
its outbreak.
- The US growth is very steep...it seems obvious to me that it's way too early
to consider relaxing restrictions.

#### Total cases, normalized

{% include_relative /covid-19/Total_cases_per_1_million_people.html %}

- Using China's officially reported numbers, the number of cases barely registers
when looking at the number of cases in the population as a whole.
- Spain and Italy stand out for their high density of cases,
despite not having aggressive testing.
- Iran has notably slower growth than the other countries with an
exponentially-growing number of cases.

#### Total cases, normalized, starting with day of first reported case

{% include_relative /covid-19/Total_cases_per_1_million_people_days.html %}

I'm not sure if "days since *first* reported case" is quite the right approach
(as opposed to days until some critical mass of cases is achieved),
but I was curious to see the results.

- The trajectories of Italy and Spain are very close.
- Again, Iran's growth is notably slower, which is especially surprising given
how early its outbreak occured.
- Using the date of the first reported case as the starting point,
the number of cases in the US takes off the latest relative to other countries.

#### Daily cases

{% include_relative /covid-19/Daily_cases.html %}

- China's spike on Feb 13 is likely an artifact of a changing definition of a positive case.
- Based on officially reported numbers, China, Japan, and South Korea appear to
have completely stopped the spread of the virus.
- The number of daily cases in Italy, Spain, and Germany appears to be leveling off.
However, it's hard to say given the noise in the data.

#### Daily cases, normalized

{% include_relative /covid-19/Daily_cases_per_1_million_people.html %}

- It's shocking how well the virus has been contained by the East Asian countries
(again, at least according to the officially reported numbers)
- I can't help but notice the strangeness of Iran's trend: the number of daily
cases reached a plateau, and only now is starting to accelerate.

## Deaths

Given the massive human cost of COVID-19 to date,
I'm wary of trivializing the deaths by treating the statistics as an analysis exercise.
However, I believe it's important to properly understand the magnitude of the
problem at hand.

#### Total deaths

{% include_relative /covid-19/Total_deaths.html %}

- COVID-19 has already killed more Americans than 9/11, and by most estimates
[it's just getting started](https://www.nbcnews.com/news/world/white-house-issues-stark-coronavirus-death-toll-estimate-n1173716). (In my opinion, we are not overreacting.)
- These death tolls are also likely underreported,
perhaps by [up to a factor of 20 in China](https://www.rfa.org/english/news/china/wuhan-deaths-03272020182846.html).
- The death tolls in Italy and Spain are enormous, especially considering
the 1-month timescale.
 
#### Total deaths, normalized

{% include_relative /covid-19/Total_deaths_per_1_million_people.html %}

The death tolls in Italy and Spain are brought into sharp relief when normalized
by their total population.

#### Total deaths, normalized, starting with day of first reported case

{% include_relative /covid-19/Total_deaths_per_1_million_people_days.html %}

- Iran's trend is again surprisingly linear so far.
- Germany's rise is much later than that of Italy and Spain,
which is surprising to me given their proximity.

#### Daily deaths

{% include_relative /covid-19/Daily_deaths.html %}

- Today was the first day that the death toll was larger in the US
than any other country. For context, 
[6800 Americans die per day on average](https://www.cdc.gov/healthreport/publications/compendium.pdf).
900 additional deaths corresponds to a 13% increase in the daily number of
deaths.
However, this statistic is masked by the fact that
many of the US deaths are concentrated in areas like New York City.
- The current number of daily deaths in Italy, Spain, and the US are comparable.
However, the current number of daily cases is much lower in the US.

#### Daily deaths, normalized

{% include_relative /covid-19/Daily_deaths_per_1_million_people.html %}

While the daily number of cases was leveling off in Spain and Italy,
the daily number of deaths does is still increasing.

#### Cumulative death rate (case mortality rate)

{% include_relative /covid-19/Cumulative_death_rate.html %}

- I'm confident that Iran's initial 100% case mortality rate is an artifact of a lack of testing.
- Zooming in on the bottom-right of the plot, we see that
the case mortality rates differ by an order of magnitude.
Germany is at around 1%, while Italy is close to 12%.
All of these numbers are certainly upper bounds on the case mortality rate.
Given [Germany's extensive testing](https://www.ft.com/content/6a8d66a4-5862-4937-8d53-b2d10794e795),
its numbers are likely more accurate.
- What's most surprising to me is that the case mortality rate is *increasing*
for Italy and Spain.
Is this just an artifact of a focus on treatment, and lack of testing, given the medical crisis?
- The case mortality rate peaked at 7% in the US in early March and has been
largely decreasing since. I assume that this decrease is a result of the
extensive testing that has taken place since.

## Exponential fits

I attempted to fit both the number of cases and the number of deaths to
an exponential ($y = Ae^{Bt}$) to compare growth rates.
I limited the data from the East Asian countries to only the period with the
exponential rise (i.e. before the trend plateaus).

Overall, the fits are decent but not perfect.
Instead of making a more complex fit and/or overintepreting the results,
I decided to show my results without additional interpretation.
I suspect two (of many) issues with this analysis are
(1) the use of date of the first case as the starting point
(use a number representing critical mass instead?)
and (2) the inconsistencies arising from measuring the growth in both the true
number of cases and the increased diagnostic testing.

#### Cases

<p>
<img src="/img/covid-19/fits_Total_cases_per_1_million_people.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>



#### Deaths

<p>
<img src="/img/covid-19/fits_Total_deaths_per_1_million_people.svg" style="display:block; margin-left: auto; margin-right: auto;">
</p>



## Conclusions

This analysis gave me a better understanding of the challenges in reporting
on, and confronting, this pandemic.
The data reveals clear issues in the reporting of cases and deaths by different countries.
The number of reported cases is certainly underestimated -- but
the degree of the underestimation is a major source of uncertainty.
Making dramatic and unprecedented policy decisions is challenging enough as is,
but making these decisions correctly without accurate data seems near impossible.
I'm sure that the magnitude of the uncertainty
(combined with the magnitude of the worst-case scenario, of course)
played a major role in deciding on our current course of action.

Here's to a speedy recovery for both everyone currently ill with COVID-19
--- and to our world as we know it.
