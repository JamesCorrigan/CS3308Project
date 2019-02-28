import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import Vacations from './components/vacations';
import SoundBoard from './components/sound';
export default (
  <Router history={browserHistory}>
    <Route path="/"  component={App}>
      <IndexRoute component={Home} />
      <Route path="#/vacations" component={Vacations} />
      <Route path="#/soundboard" component={SoundBoard} />
    </Route>
  </Router>
);
