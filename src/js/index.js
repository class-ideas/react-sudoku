// Javascript Entry Point

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import MainContainer from './containers/main';
import Game from './containers/game';
import Intro from './containers/intro';

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={MainContainer}>
        <IndexRoute component={Intro}/>
        <Route path="play" component={Game}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app'))
