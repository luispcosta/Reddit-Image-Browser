import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import {Main} from './components/Main';
import {Home} from './components/Home';

ReactDOM.render(
  <Router>
    <Route path="/" component={Main}>
      <Route exact path="/" component={Home} />
      <Route path="/:subreddit" component={Home} />
    </Route>
  </Router>,
  document.getElementById('root'),
);
