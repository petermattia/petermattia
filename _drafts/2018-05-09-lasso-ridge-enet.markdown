---
layout: post
categories: articles
title: Linear regression and regularization
date: 2018-05-09
description: Notes on regularization via ridge, lasso, and elastic net
tags: data-science
---

I recently learned a .

Here is my attempt at explaining these concepts to non-statisticians,
based on a recent group meeting presentation.

Motivation: Linear Regression and Regularization
- In linear regression, a possible objective is to minimize the sum of squared errors (SSE) between the observed data and fitted model
- Each feature, xi, will have a weight, Bi
- For complex modeling tasks with many available features (and finite data), this
single objective will generally lead to overfitting
- To avoid overfitting, we introduce a penalty term for coefficients with large
magnitudes, known as regularization
- We tune the two-part objective function (bias-variance tradeoff) with a parameter
lambda
- We can tune lambda algorithmically by splitting our dataset into multiple
combinations of calibration and validation sets (cross-validation)

### What form should this penalty term take?
#### Ridge regression
Sum of squared coefficients (L2 norm)

Due to form of regularization function, all coefficients are nonzero, thus all
features are retained

This can be good or bad
- Good if features are correlated, since ridge will more accurately distribute weights to grouped features
- Bad if goal is reduce model complexity, since features can number in the millions (e.g. genomics)

#### LASSO regression
Sum of absolute value of coefficients (L1 norm)

Due to form of regularization function, some coefficients may be zero
(sparse coefficient matrix), thus features are “selected”

This can be good or bad
- Good if goal is to reduce model complexity by reducing number of features
- Bad if features are correlated, since lasso tends to arbitrarily select one feature from a group

#### Elastic Net: Combines both ridge and lasso o We now have two tuning parameters:
- Lambda: Balance of error minimization and regularization (bias- variance tradeoff)
- Alpha: Balance of L1 and L2 norms, or ridge and lasso

Additional sources:
- https://web.stanford.edu/~hastie/TALKS/enet_talk.pdf
- https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-ridge-lasso- regression-python/
