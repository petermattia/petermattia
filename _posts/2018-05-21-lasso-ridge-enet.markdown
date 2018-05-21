---
layout: post
categories: articles
title: Linear regression and regularization
date: 2018-05-21
description: Notes on regularization via ridge, lasso, and elastic net
tags: data-science
---

I recently learned about regularization from my manuscript co-author,
[Kristen Severson](https://kseverso.github.io).
Given my limited formal statistics background,
Kristen explained these concepts to me very clearly, so I thought I'd pay it forward.
Here is my attempt at explaining these concepts to non-statisticians.

### Motivation
#### Linear Regression

<p>
<img src="/img/lasso_ridge_enet/Victorian_houses_SF.jpg" style="display:block; margin-left: auto; margin-right: auto; height:300px;">
</p>

In linear regression, a typical objective is to minimize the
sum of squared errors (SSE) between the observed data and fitted model.
A [classic prediction task](http://www.r2d3.us/visual-intro-to-machine-learning-part-1/)
is to predict the price of property values in San Francisco based on *features*
such as number of bedrooms & bathrooms, year built, school district test scores,
etc.
Our objective, minimizing the SSE, can be expressed as follows:

YO YO YO

$$ $$

Each feature, $ x_i $, will have a weight, $ \beta_i $.

For complex modeling tasks with many available features (and finite data), this
single objective will generally lead to *overfitting*.
Let's look at a simple example (inspired by
[this post](https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-ridge-lasso-regression-python/))
to better understand overfitting.

#### Example: Polynomial fits to the sine function

YO YO YO

Comparing these three cases, we recognize that the SSE is minimized with the
9<sup>th</sup>-order polynomial fit.
However, we intuitively recognize that this fit should be somehow penalized for
its complexity. The question is: **how do we penalize complex fits?**

#### Regularization

In this contrived example, an intuitive penalty term is the total
number of features, since this . However, this formulation has two shortcomings:
some datasets may be best explained by many features, like the property value task,
and

A better penalty term is the *coefficient magnitudes*,
otherwise known as *regularization*.

$$ \beta = $$

Our objective function now has two components.
The relative importance of each of these objectives is controlled
with a parameter $ \lambda $.
We can tune lambda algorithmically by splitting our dataset into multiple
combinations of calibration and validation sets (cross-validation)

### What form should this penalty term take?

$ P(\beta) $ is often a [*norm*](https://en.wikipedia.org/wiki/Norm_(mathematics))
of the coefficients.
A norm is essentially a measure of vector distance.
The norm of a vector $ v $ is denoted by $ ||v|| $.
The generalized norm function is termed the *p-norm*, denoted by $ ||v||_p $:

$$ ||v||_p = \left( \sum_{k=1}^N |v_k|^p \right)^{1/p} $$

Two common norm functions are the [*1-norm*]()
, in which $p=1$:

$$ ||v||_1 = \left( \sum_{k=1}^N |v_k| \right) $$

and the [*2-norm*](), in which $p=2$:

$$ ||v||_2 = \left( \sum_{k=1}^N v_k^2 \right)^{1/2} $$

Due to the ubiquity of the 2-norm (also known as the Euclidian norm),
the subscript is commonly dropped from $ ||v||_2 $, leaving just $ ||v|| $.

The three types of regularization we are exploring use some form of this norm:
- **Ridge regression** uses the 2-norm
- **LASSO regression** uses the 1-norm
- **Elastic net regression** uses a weighted combination of both the 1-norm and 2-norm

#### Example
Let's return to our sine fit example. The below table lists
the SSE, 1-norm of coefficients, and 2-norm of coefficients for our three models:

<table style="width:50%; margin-left: auto; margin-right: auto;">
  <thead>
    <tr>
      <th>Model</th>
      <th>SSE</th>
      <th>1-norm of coefficients</th>
      <th>2-norm of coefficients</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td style="text-align:center">1<sup>st</sup> order polynomial</td>
  	  <td style="text-align:center">92.13</td>
      <td style="text-align:center">1.7074</td>
      <td style="text-align:center">1.3677</td>
    </tr>
    <tr>
      <td style="text-align:center">4<sup>th</sup> order polynomial</td>
      <td style="text-align:center">5.146</td>
      <td style="text-align:center">1.8316</td>
      <td style="text-align:center">1.3481</td>
    </tr>
    <tr>
      <td style="text-align:center">9<sup>th</sup> order polynomial</td>
      <td style="text-align:center">4.986</td>
      <td style="text-align:center">5.9101</td>
      <td style="text-align:center">2.4848</td>
    </tr>
  </tbody></table>

<br>

We can see that the 1<sup>st</sup> order polynomial model has high SSE but low
coefficient norms, while the 9<sup>th</sup> order polynomial model has low SSE
but high coefficient norms. The 4<sup>th</sup> order polynomial model
seems to strike a good balance between SSE and coefficient norm, given its
SSE near the 9<sup>th</sup> order model and norms near the 1<sup>st</sup> order
model.

Final model selection would be determined by the value of $\lambda$.
In this case, simply setting $\lambda = 1$ will result in the selection of
the 4<sup>th</sup> order model using either the 1-norm (LASSO regression)
or the 2-norm (ridge regression).

One question that may arise is: how do we set $\lambda$?
We can tune $\lambda$ algorithmically by splitting our dataset into multiple combinations
of train and test sets, a process termed *cross-validation*.
We will select a value of $\lambda$ that consistently results in similar
performance for both testing and training for any "slicing" of the dataset.

### Ridge, LASSO, and elastic net regression

The remainder of this post will discuss three common methods of regularization.
In the interest of brevity,
I will gloss over the details of what causes the differences between ridge and
LASSO regression in terms of feature selection.
[This source](https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-ridge-lasso-regression-python/#five)
offers a good explanation.

#### Ridge regression
In [ridge regression](https://en.wikipedia.org/wiki/Tikhonov_regularization),
the penalty term is the square root of the sum of squared coefficients (2-norm):

$$ P(\beta) = \left( \sum_{k=1}^N \beta_k^2 \right)^{1/2} $$

For reasons I won't discuss here,
all feature coefficients are nonzero in ridge regression, thus all
features are retained.
This property has advantages and disadvantages:
- **Advantages**: If features are correlated, ridge regression will more accurately distribute weights to grouped features. For example,
- **Disadvantages**: Models generated via ridge regression may be very complex.
In some applications (e.g. genomics), features can number in the millions.

#### LASSO regression
LASSO stands for "least absolute shrinkage and selection operator".
In [LASSO regression](https://en.wikipedia.org/wiki/Lasso_(statistics)), the penalty term is the
sum of the absolute value of the coefficients (1-norm):

$$ P(\beta) = \sum_{k=1}^N |\beta_k| $$

For reasons I won't discuss here, some feature coefficients may be zero
in LASSO regression, thus features are “selected”.
Thus, LASSO regression has the opposite pros and cons of ridge regression:
- **Advantages**: LASSO regression can reduce model complexity by entirely eliminating some features.
- **Disadvantages**: If features are correlated,
LASSO regression tends to arbitrarily select one feature from a group.

#### Elastic Net: Best of both worlds
The elastic net combines both ridge and LASSO to overcome the shortcomings of each.
Our penalty function is:

$$ P(\beta) = (1-\alpha)\left(\sum_{k=1}^N |\beta_k|\right) + \alpha\left( \sum_{k=1}^N \beta_k^2 \right)$$

or, more simply:

$$ P(\beta) = (1-\alpha)||\beta||_1 + \alpha||\beta||^2 $$

We now have an additional tuning parameter, $\alpha$.
$ \alpha $ represents the balance of the L1 and L2 norms,
or the LASSO and ridge penalty terms.
By appropriately setting $ \alpha $,
we can develop models that perform feature selection (via the 1-norm term) while
appropriately handling cases with correlated features (via the 2-norm term).
Note that the 2-norm term is squared.

This post merely scratches the surface of these topics.
For more details, check out
[this paper](https://web.stanford.edu/~hastie/Papers/B67.2%20(2005)%20301-320%20Zou%20&%20Hastie.pdf)
by the creator of the elastic net.

### Acknowledgements and references
Special thanks to Kristen again for her helpful explanations!
Other sources include:
- [*Elements of Statistical Learning* textbook](https://web.stanford.edu/~hastie/Papers/ESLII.pdf)
- [This paper by Trevor Hastie](https://web.stanford.edu/~hastie/Papers/B67.2%20(2005)%20301-320%20Zou%20&%20Hastie.pdf)
- [This tutorial from analyticsvidhya.com](https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-ridge-lasso-regression-python/)
