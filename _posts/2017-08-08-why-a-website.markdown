---
layout: post
categories: articles
title: Why make a website?
date: 2017-08-08
description: Why I'm making a website as a grad student
tags: personal code
---
Why am I making a personal website? It's not very common for graduate students
in materials science (I don't know anyone else with one...). A few reasons:
* Start blogging, as a way to maintian writing skills (with some accountability).
I plan on posting a mix of science and personal content
* Develop a larger community for electrochemistry and materials science online---
I wish there were more resources when I started grad school
* Showcase some of my research
* Understand the Internet better (because it still blows my mind)
* Learn web technologies, specifically AWS and d3.js

The last one, in particular, was compelling enough for me to actually make this website.
After a summer of learning some both data science and software engineering
for my fast charging project (see [Research](/research)),
I'm beginning to become more interested in both, either as career options
or as critical components of a battery-testing-automation startup
(still in the works...).

In both chemical engineering and materials science, everyone uses MATLAB,
which I think is exceptional for routine scientific computing tasks.
I'm a big fan of MATLAB---it's great for engineers, particularly
students, who need to quickly analyze data and don't want to deal with
'CS stuff' like libraries, dependencies, etc.
But, of course, I recognize no serious software engineer would even think about
using it.
So this website will be partially an exercise in breaking out of my MATLAB
comfort zone.

Additionally, I've always been impressed with "pretty" data visualization,
and d3.js certainly appears to be up to the task. Check out the plot below,
which comes from [this tutorial](https://www.mattshwery.com/d3-js):

<figure class="final">
  <figcaption>d3.js example</figcaption>
</figure>

A long-term side project of mine will be converting my cyclic voltammetry
MATLAB app (see [Projects](/projects))
into a d3.js based app to gain better experience with web apps.

#### Making this website

In the process, I read a lot about how to make and host a website. There are plenty of options:
Wordpress with Dreamhost, Wordpress with AWS, Jekyll on Github, Jekyll on AWS, etc.
([Wordpress](https://www.wordpress.com) is a very common platform for blogs and personal sites, but it's
somewhat slow and clunky. [Jekyll](https://jekyllrb.com) is a newer 'static site generator',
which means it creates nice-looking, speedy websites from relatively simple text editor input.)
I decided to go with Jekyll on AWS S3, since it's the most difficult (relatively
speaking---it's wasn't actually "difficult")---meaning I'd learn the most from it.

It took about a full day to get everything where I wanted it to be---
overall pretty easy and kinda fun, but still longer than what I expected for
such a standard procedure.
In contrast, I was able to get a Wordpress site on AWS running in around 30 minutes.
I definitely wouldn't recommend this method to most people trying to create a
website, but it worked well for my purposes---I became more familiar with the
Terminal, Markdown, AWS S3, domain names, etc.

First post down---here's to what's next!

<style>
  svg {
    font: 10px sans-serif;
  }

  .foreground {
    fill: #2D6A99;
  }

  .background {
    fill: #eee;
  }
</style>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript">

  var n = 10,
      random = function() { return Math.floor(Math.random() * 100); },
      data = d3.range(n).map(random);

  var barChart = {
    init: function(el) {
      this.height = 80;
      this.width = 220;
      this.padding = 12;
      barWidth = Math.floor((this.width - (this.padding * (data.length - 1))) / data.length);
      barHeight = this.height;

      this.svg = d3.select(el).insert('svg', ':first-child')
        .attr('width', this.width)
        .attr("height", this.height);

      this.draw();
    },

    draw: function() {
      var self = this;

      this.meters = this.svg
        .append("g")
          .attr("class", "meter")
          .selectAll("rect")
            .data(data)
            .enter()
            .append('g')
              .attr("class", "bar");

      this.drawBar().attr("class", "background").attr("y", 0).attr("height", barHeight);
      this.drawBar().attr("class", "foreground").attr("y", barHeight).attr("height", 0);

      setInterval(function() {
        data = d3.range(n).map(random);
        self.update();
      }, 2000);
    },

    update: function () {
        var self = this;
        d3.selectAll("rect.foreground").each(self.animate);
    },

    animate: function (d, i) {
      var total = data[i];
      var bar = d3.select(this);
      if (barHeight - total != bar.attr("y")) {
        bar.transition().duration(1500).attr("height", total).attr("y", barHeight - total);
      }
    },

    drawBar: function () {
      var self = this;

      return this.meters.append("rect")
        .attr("x", function (d, i) {
          return i * (barWidth + self.padding);
        })
        .attr("width", barWidth);
    }
  }

  barChart.init('figure.final');
</script>
