import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';

//Importing store and history allows use of Router and Redux
import store, { history } from './store';
import App from './containers/App.js';
import './styles/index.css';


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Route path="/" component={App}/>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
