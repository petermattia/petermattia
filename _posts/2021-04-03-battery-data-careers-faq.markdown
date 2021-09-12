---
layout: post
categories: articles
title: Battery data careers FAQ
date: 2021-04-03
description: FAQ on battery data scientist careers
tags: science data-science personal
---

I've recently received a few requests to chat from students and other folks interested in Tesla, batteries, battery lifetime prediction, etc. I'm super excited to see the interest in this field! Although I'm unable to meet with everyone who reaches out, I'd like to address many of these thoughtful questions in a more scalable and accessible format.

While I feel entirely unqualified (through flattered!) to give career advice to people I don't know, I’m happy to share my experiences and let people glean from them what they'd like. I've addressed some of the most common questions here, with some editing so that my responses only reflect my experiences and are not blanket advice for others. Note that for obvious reasons I can't discuss my work at Tesla in depth.

### How did you get here?
I credit many other people for any success I've had, but the short summary of my short career is:
- My ChemE background gave me a solid foundation in both chemical sciences and programming (MATLAB)
- I started my PhD working on electrochemical characterization of SEI, which taught me the fundamentals of electrochemistry and working with battery cycling data
- Halfway through my PhD, we started a new project on fast charging optimization. Along the way, we realized that the dataset we had generated for this purpose worked really well for battery lifetime prediction via machine learning
- Thanks to [Kristen](https://kseverso.github.io), [Aditya](http://aditya-grover.github.io), and a few statistics and machine learning classes at Stanford (espeically [STATS216](https://explorecourses.stanford.edu/search?view=catalog&filter-coursestatus-Active=on&q=STATS%20216:%20Introduction%20to%20Statistical%20Learning&academicYear=20132014)), I learned the fundamentals of data analysis and machine learning while improving my Python programming skills
- By the end of my PhD, nealy all of my projects relied on both knowledge of battery degradation and fairly complex battery data analysis. I think this combination made me an attractive candidate to Tesla, which I joined immediately after graduation.

### Was a PhD worth it?
I think getting a PhD was one of the best decisions I’ll ever make. This is very cliche, but grad school taught me how to think. Also, being surrounded by people who nerd out over the same research topics is great, and I’ve made some of my closest friends through grad school. I’d 100% do it again.

That said, the battery industry looks quite different in 2021 vs. 2014. Batteries are booming, and the next 3-5 years will see huge growth. I imagine it’s similar to working on the Internet in 1995. If there was ever a time to join the battery industry, now would be it. If I were to start a PhD today knowing what I know now, I’d consider a topic that’s likely to start booming by the time I graduate.

### Why did you choose to work in industry instead of academia?
I've always been interested in solving "real" problems—that is, the problems that actually hold back technology development. While my PhD work was certainly on the applied side of academic battery research, I had a growing sense that I didn't really know the biggest challenges in the battery industry. To be frank, that sense was confirmed at Tesla. In short, I think it's nearly impossible to solve real problems without having to solve real problems. That may sound obvious—or worse, condescending—but what I mean is that all it takes is 1-2 incorrect assumptions about a problem to completely invalidate a proposed solution, and getting all the assumptions correct without actually having to solve the problem is hard.

To be clear, I think an academic environment is an amazing place to learn and train, and I certainly miss aspects of academia—namely, having the time to fully think through an issue and being able to freely discuss my work. However, I find working on real problems immensely satisfying.

### Could you tell me more about your current work? What is does your day-to-day routine look like?
I work on the Cell Qualification team. Our goal is to qualify cell designs for mass production. Without getting into specifics, my job is primarily to forecast different facets of battery lifetime using manufacturing data, lab data, and field data. I enjoy working at the interface of data producers (e.g., folks in the test labs) and consumers (e.g., program managers). 

### What's it like to work at Tesla?
I can only speak to the cell engineering team. Some observations after 1.5 years:
- You’re given a ton of responsibility on Day 1
- I find it very satisfying to work on problems close to customers
- The scale is staggering, and the vision even more so
- My colleagues are super sharp, hardworking, motivated, and friendly people 
- For a battery data nerd like me, it's hard to think of an employer with 10% as much variety and scale of battery data
- It moves fast—buckle up :)

### How can I get a job at Tesla?
The party line for hiring is "evidence of exceptional achievement". In other words, could you convince Elon why we should hire you in 2-3 bullet points? Of course, expectations are a function of your level of experience; candidates with all sorts of backgrounds (including junior candidates) are more than welcome. You can apply [here](https://www.tesla.com/cell-jobs); contact me directly if you’re interested in the cell qualification team. We’re growing fast!

[This slightly dated article](https://www.cnbc.com/2018/04/16/how-to-land-a-job-at-tesla.html) also has good advice.

### What kind of skills do people mainly look at while hiring for roles such as yours?
The ideal candidate has demonstrated proficiency in two technical competencies: batteries and data analysis (preferably in Python). I think this skill set is generalizable to most engineering fields today—having both domain expertise and strong data analysis skills is a killer combination. Of course, soft skills are also critical (communication, work ethic, collaborativeness, leadership, etc). 

### What advice would you give to anybody interested to get a step in the door in your field?
General advice: Work on meaningful projects with a similar skill set to the job you want. Convince your potential employer that you can hit the ground running on day 1 because you’ve already done this job before.

Specific advice: Learn batteries (preferably lithium-ion, preferably cell-level) and data analysis (preferably in Python) really well. Unfortunately, I'm not aware of any good resources for learning battery fundamentals; perhaps the best way is to intern in an academic lab or company. If you don't have access to battery data, you can use the [datasets we generated](https://data.matr.io/1/) (please excuse the shameless plug). My favorite textbook for introductory data science is [*An Introduction to Statistical Learning*](https://www.statlearning.com), which can be downloaded for free. However, there are countless resources for learning Python, data science, etc. My recommendation is to try a project that interests you; for instance, two of my early Python data analysis projects explored [Wikipedia](https://petermattia.com/articles/2017/10/14/kevin-bacon-and-wikipedia.html) and an [EV tax credit dataset](https://petermattia.com/articles/2017/11/08/delaware-evs.html).

### What societies or conferences do you recommend?
A full list of the conferences I have attended is available [here](/presentations). The [Gordon Research Conference](https://www.grc.org/batteries-conference/2018/) was my favorite battery conference. Overall, the rise in virtual conferences and talks has been a welcome trend for me since it makes it easy to attend as an industrial scientist.

I’m a member of the [Electrochemical Society](https://www.electrochem.org) since I think it’s the closest match to my field and because I support their [“Free the Science”](https://freethescience.org/about) initiative. 

### Summary
Hope this was helpful! Feel free to reach out with any additonal quesitons.
