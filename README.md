# Reddit Image Browser

A small website to browse images posted on any subreddit.

# Installation

+ Clone this repository: `git clone ..`
+ `cd` into the cloned folder and run `npm install`.
+ Finally, run `npm run local` and access `localhost:3000` in your favorite browser

# Deploying to heroku

* Run `npm run deploy`
* You may need to change the production URL in `resolveApiUrl` in `webpack.config.js` to reflect your heroku app's name.

# Usage

There are two ways to use this app:
+ You can either access `localhost:3000/<a favorite subreddit of your choice>`, for example:
  + `localhost:3000/desktops` would present the hot images from the subreddit
  `www.reddit.com/r/desktops`
  + Or you can select a subreddit from the list presented in the top right corner.

# Contributing

You are free to contribute and I appreciate it! Just open a PR and I will gladly check it out.
