import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import Main from './../components/Main'
import Home from './../components/Home'
import SubredditSelector from './../components/SubredditSelector'

const Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="/:subreddit" component={Home} />
    </Route>
  </Router>
)

export default Routes
