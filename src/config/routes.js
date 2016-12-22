import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import Main from './../components/Main'

const Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
)

export default Routes
