import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import {Home} from './components/Home';

ReactDOM.render(
  <Router>
    <Route>
      <Route exact path="/" component={Home} />
      <Route path="/:subreddit" component={Home} />
    </Route>
  </Router>,
  document.getElementById('root'),
);
