---
layout: post
categories: articles
title: Engineering confidence
date: 2023-01-05
description: Decision making under uncertainty
tags: science
---

I'm an empiricist at heart, but like any engineer, I use a variety of models at work and in life.
The basis of these models ranges from purely physical to entirely data-driven.
More interestingly, these models can live on a computer or in the mind of an engineer.
But the core questions for any model are: Can I trust it? If so, to what extent?

George Box famously claimed that "all models are wrong, but some are useful" ([Wikipedia](https://en.wikipedia.org/wiki/All_models_are_wrong), [original paper](https://doi.org/10.1080%2F01621459.1976.10480949)).
I love this quote, but it binarizes trust into "useful" and "non-useful" categorizations.
In reality, usefulness is a continuous function that depends on many aspects of the situation at hand.
Many models output [confidence intervals](https://en.wikipedia.org/wiki/Confidence_interval) or [prediction intervals](https://en.wikipedia.org/wiki/Prediction_interval), which offer some notion of model confidence and precision, but of course these interval metrics capture only readily-computable sources of error and often miss glaring but implicit sources of error.
For instance, error bars from a data-driven model to predict battery lifetime would not capture the domain knowledge of extrapolating well outside of the cell design or usage conditions of the training data.
These sources of error require domain expertise to accurately assess "model confidence".
Moreover, expert opinion on model confidence may vary from expert to expert.

I found some work from around 1980 that discusses these challenges quite elegantly. The authors first compiled a [NIST report](https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nbsir80-2053.pdf) (scan of a typewritten document!) and then summarized their findings into a [paper](https://doi.org/10.1016/0305-0548(81)90019-8). Some of my favorite quotes are below (emphasis mine):

> The phrase “model confidence” has a familiar and comforting ring to those involved in the development or use of decision (aiding) models. In general, one has an intuitive notion of what model confidence implies. When asked for a formal definition, its meaning is discovered to be felt rather than known, Some may think that “confidence” is a quality of a model and a rough equivalent of validity. **We emphasize model confidence not as an attribute of a model, but of the model user.** 

> It is clear that there is no single measure of model confidence or no absolute claim concerning the confidence that can be given a model or its outputs. For all but the simplest of decision models, we cannot expect to obtain statistical or numerical bases for statements of confidence. The situation is analogous to determining the confidence given to an expert witness in court. The judge and jury use criteria, usually of a qualitative nature, to determine the extent to which they let the expert’s testimony influence their decision. A decision maker is a judge faced with an expert witness — the analyst or model developer — who has a magic black-box of a model in the computer room. Sometimes, the reputation and presentation of the witness are assumed to be sufficient reason to accept the testimony. But the astute decision maker (or the astute Congressman) no longer is satisfied with the outputs unless model confidence has been established in terms of the decision maker’s criteria. What are these criteria? What form should they take? How consistent are they between decision makers and models? Given explicit criteria, how can an investigator "measure" a model's material to determine if the criteria are met? These are difficult questions to answer.

I highly recommend the [paper](https://doi.org/10.1016/0305-0548(81)90019-8) to any engineer working with models.

I believe that this challenge can be generalized to everyday life as well.
The controversy of any controversial topic arises because people have differences in trust levels for various mental models of how the world works.
Bitter political or religious disagreements occur because one group of people has high confidence in Mental Model A and low confidence in Mental Model B, while
another group has low confidence in Mental Model A and high confidence in Mental Model B.