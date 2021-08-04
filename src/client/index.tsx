import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';

import {Home} from './components/Home';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:subreddit?" component={Home} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
