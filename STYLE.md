## Personal touch
The code is written by the author who made several choices whether to include or not to include certain code. This immediately means that it's possible for the author to have an clear overview of what's exactly happening but I can happen that users/readers of the code don't immediately understand it. Therefore, this documents is written to explain certain things in the hope it makes it a bit better to understandd.


## Comments

Comments are made as much and as comprehensive as possible so possible users/readers of the code are able to see what's happening and why certain code is written down. Every loop, function or other beginning of a new piece of code is provided with a separate comment. This can make the lines of code within a file a bit longer than necessary, but it's all been done to make sure that every decision is explained as much and clear as possible.


## Newlines

Every new piece of code is started on a new line of code with a blank one between the new one and previous piece of code. Again, this adds up to a lot of codelines in a file, but it makes the structure and overview smooth and clean in my opinion.


## Functions

Some functions tend to have pretty long names, but this is been done to make sure that it's clear to see what the function is doing or retrieving (in case it's called to retrieve data). Therefore, the function itself as well as the comments are describing what's happening which makes it pretty straightforward to understand.


## Files

Separate files have been made for all the visualizations in which only that specific visualization is being executed. All the files contain two pieces of code: one for a new graph and one for updating the existing graph in case it's called once more.
Furthermore, all the files are combined and called upon in one files which is called 'main.js' and this one is executing all the functions on the website. Also, a file called 'helpers.js' is made just because it's causing the rest of the files clean and straight to the point, because in this file there are several functions which retrieve the right data for the right visual when they're called (via a dropdown, slider of click). Again, this makes the rest of the code smooth, clean and easy to read.


## Folders

Folders are made for different purposes. One is for example for all the javascript files, another one for css, html etc. This keeps programming languages together in one file and separated from other languages.


## Options

The option which the user would like to see is retrieved in a function and passed on to the functions which retrieve the correct data. This is done so functions can be called multiple times with several different inputs so is saves a lot of double coding.
