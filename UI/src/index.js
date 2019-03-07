import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//Importing store and history allows use of Router and Redux
import store, { history } from './store';
import App from './containers/App.js';
import './styles/index.css';

//ROOT OF THE REACT PROJECT.
//CHILD COMPONENT IS /containers/App.js
ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Route path="/" component={App}/>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
