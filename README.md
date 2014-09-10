Shrtn.ly
============
## Overview
***
At AppCorp, we're trying to build our own url shortener.

**Here is how we wanted it to work.**

1. Go to the site and enter the url you want shortened
2. Shrtn gives back a shortened url and keeps a record
3. Shrtn url redirects you to original URL when used
4. Shrtn keeps track of number of times the link has been clicked

***

**But there seems to be some problems :(**

* URLs don't seem to be saving anymore
* Saved URLs don't always work

**We are hoping you can fix these issues and get Shrtn back to normal**

***

**New Functionality**

We know it's early to talk about new functionality since the app is broken, but if you have some time after fixing it we'd love to see:

* Better stack tracking per each link click (ip address, date, browser)
* A better design (so boring right now)
* Another fun feature of your choice

***

**Getting Started**

We've provided a vagrant box for your convenience. Once you have [Vagrant](http://www.vagrantup.com/) and [node](http://nodejs.org/) installed, run:

vagrant up  
npm install  
npm start  
