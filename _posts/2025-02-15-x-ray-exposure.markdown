---
layout: post
categories: articles
title: "Paper published: Impact of lab-scale X-ray exposure on batteries—and a love letter to MDPI"
date: 2025-02-15
description: The negligible impact of X-ray exposure on batteries, plus my experience publishing with MDPI
tags: publications science
---

I'm excited to announce that our paper, "Lab-Scale X-Ray Exposure Has No Measurable Impact on Lithium-Ion Battery Performance and Lifetime", has been published in [*Batteries*](https://www.mdpi.com/journal/batteries). You can read the paper [here](https://www.mdpi.com/2313-0105/11/2/73).

This study was led by [Glimpse](https://glimp.se)’s summer intern Jinhong.
The study was simple: we took a bunch of batteries, exposed them to X-rays for either 0 minutes (control group), 2 minutes, or 60 minutes, and then tested their performance.
We found no statistically significant difference in performance between the control group and the X-ray exposed groups.
This is a good thing, as it means that our CT scans are safe for batteries.
This very simple conclusion is the title of the manuscript.

<p>
<img src="/img/xray_exposure.pdf" style="display:block; margin-left: auto; margin-right: auto; width:300%;">
</p>

In some sense, this is a boring study.
But I still think the results are important as the impact of lab-scale beam damage hasn't been studied to the best of our knowledge.
It's "honest work", as Dave Brandt would say.

<p>
<img src="/img/honest-work-meme.webp" style="display:block; margin-left: auto; margin-right: auto;">
</p>

*Read the very cool story of Dave Brandt [here](https://www.npr.org/2023/05/30/1178378575/no-till-farming-legend-reddit-hero-honest-work)*

Yes, of course the results are impactful for our company, but we did the study as honestly as we could and, as a company, we were prepared for a different outcome.
In fact, purely from a marketing perspective, I was actually hoping that the 1-hour exposure group would show signs of beam damage, which would be yet another reason to use Glimpse’s fast and, by extension, low-dose CT scans.

Why did we publish this work? A few reasons:
1. In my view, publishing is a forcing function to really understand a topic. We did lots of simulations calculating absorbed doses, etc. that were really helpful for me to e.g., square away with the other beam damage papers.
2. Publishing is good for the careers of all involved. Obviously this paper won’t make or break anyone’s career, but it's especially nice for Jinhong and Amariah.
3. Publishing lends legitimacy to the results when we share this study with customers.
4. Publishing furthers the scientific record.
5. Perhaps motivated by a small dose of vanity :)

That said, publishing this work is entirely a side project for me.
I'm not an academic, I'm building a business, and I’m not at all interested in overoptimizing for journal prestige here.
This work is clearly not destined for *Nature* or *Science*. My primary journal selection criteria were:
1. Respectable journal
2. Open access (since the primary audience of this work is industry)
3. Small [APC](https://en.wikipedia.org/wiki/Article_processing_charge) (we’re a scrappy startup and APCs are a racket)
4. Fast handling process while still being legit (this paper isn’t worth a year-long review cycle)

Overall, this paper had quite the [unexpected journey](https://en.wikipedia.org/wiki/The_Hobbit:_An_Unexpected_Journey).
The first hint that something was amiss was that the preprint was rejected from [arXiv](https://arxiv.org).
No big deal, I instead posted it to [ECSarXiv](https://osf.io/r9vem/) with the intention of submitting to the *Journal of the Electrochemical Society* ([JES](https://iopscience.iop.org/journal/1945-7111)), the default “honest work” workhorse battery journal.
Not to brag but just to give context, I’ve coauthored 7 papers in JES including a [top 1% cited paper](https://doi.org/10.1149/1945-7111/ac6d13).

I then submitted the paper to JES.
It was sent to peer review and subsequently rejected. The editor recommended transfer to *ECS Advances*.
I then dutifully submitted to *ECS Advances*, where the paper was desk rejected as the manuscript is “not furthering electrochemical science”.
This was a disappointing outcome, but fair enough.

Now mind you, I’ve had the good fortune of only one real paper rejection in my life: our [*Nature Energy* machine learning paper](https://doi.org/10.1038/s41560-019-0356-8) was initially rejected from *Nature*.
(This paper just hit 2000 citations — their loss!).
With all due respect to the fine folks at *ECS Advances*, a rejection from this journal was not on my 2024 bingo card.

So here I’m at a crossroads.
I could drop the whole thing and leave the paper as a preprint, but publishing this feels like the right thing to do and shouldn’t be this hard dammit.
But where to go next?
I couldn’t think of a natural home for this sort of work.
I did a bit of random Googling and came across [*PLOS One*](https://journals.plos.org/plosone/s/journal-information), which publishes on the basis of rigor independent of novelty.
That sounded perfect for this type of work, except (a) the APC was a tad higher than I'd like and (b) the [median time to publication is >6 months](https://journals.plos.org/plosone/s/journal-information#loc-journal-timings).

While chatting with my good friend [Nick](https://search.asu.edu/profile/4008596) ([ASU](https://www.asu.edu) faculty member), I explained my predicament and he enthusiastically recommended [MDPI](https://www.mdpi.com)’s [*Batteries*](https://www.mdpi.com/journal/batteries).

I’d seen a few nice papers in *Batteries* before, especially from [Matthieu Dubarry](https://scholar.google.com/citations?hl=en&user=G7OkgLAAAAAJ&view_op=list_works&sortby=pubdate) whose work I highly admire, but admittedly I was initially skeptical of this journal's quality.
Isn’t MDPI a predatory publisher?
Turns out: not really.
In fact, the more I read, especially [this SO post](
https://academia.stackexchange.com/questions/5466/is-mdpi-a-reputable-academic-publisher), the more I started to like them and *Batteries* in particular. Reevaluating this journal in light of my criteria:
1. **Respectable journal:** *Batteries* has some solid papers and some crappy papers. Is it really all that different from any other journal? I know impact factor is a bad metric but *Batteries*'s impact factor is 4.5 vs. *Nature*-affiliated *Scientific Report*’s 3.5
2. **Open access (primary audience is industry):** Yes
3. **Minimal APC (we’re a scrappy startup):** It’s $3000 by default, which would have been too high for this side project. But Nick suggested emailing them asking for a fee waiver, and after a bit of back and forth they offered me a 100% fee waiver. (Sidebar on finances: Apparently they make [1-6% margin per paper](https://academia.stackexchange.com/a/163462). That’s battery production type margins! Even if they asked for a modest APC, I’d be comfortable paying. This seems better than paying Springer Nature or Elsevier given their [40% margins](https://tidsskriftet.no/en/2020/08/kronikk/money-behind-academic-publishing)!)
4. **Fast handling process while still being legit (this paper isn’t worth a year-long review cycle).** This is a big one for me. 6-9 month "time to publication" feels much slower than it should be IMO. Speed is a virtue, and frankly I don’t have much patience for waiting around weeks for the editor to send the paper out for review or for the typesetter to get back to me with minor formatting tweaks that they could make themselves. I see no shame, only pride, in supporting a journal that actively aims to reduce time to publication (provided manuscript quality does not significantly suffer).

Overall, I see MDPI as a “state school publisher”.
In the US at least, “state schools”, of which I am a proud alum, are designed for high quality and high accessibility.
*Nature* and *Science* are “Ivy League publishers”, designed for very high quality but low accessibility.
Sure, the average Ivy League grad might be a better hire than the average state school grad (legacy admissions, privilege, and grade inflation considerations aside), but there are way more state school grads, and that’s a virtue in its own right!
(Sidebar: see [this article on ASU](https://news.asu.edu/20221123-arizona-impact-20-years-look-president-crows-vision-accessibility-and-excellence-new), widely considered the leader in increasing the accessibility of higher education).
Similarly, more science put out into the world, faster, is strictly better in my book.
Furthermore, many authors publishing in MDPI journals are from developing countries, and thus these journals provide an avenue for more accessible, diverse scientific contributors.
Sure, some of these papers are low quality, but (a) it’s not all that hard to screen out low-quality papers and (b) peer review is a pretty bad screen for quality anyway.
I think it makes sense for peer review to be light touch (barring serious methodological concerns) for “state school journals” and then the work can stand or fall on its own merit once it’s out in the public.

I submitted my paper on December 17, submitted revisions on January 21, and the paper was published February 11.
I should mention — the [reviews](https://www.mdpi.com/2313-0105/11/2/73/review_report) were quite insightful and helpful, well above average in my experience!
I would be hard-pressed to believe that this journal is a paper mill given the quality of the reviews.
Aside from a few strange hand-signed forms, the overall process was professional, efficient and fairly painless overall.
Kudos, MDPI, for pushing the boundaries of scientific publishing, and I hope other journals follow your lead.