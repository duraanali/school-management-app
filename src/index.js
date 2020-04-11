import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import {Router, Route, Switch } from "react-router-dom";
import FormikLoginForm from "./components/login/LoginForm";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css";
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


import PrivateRoute from './components/PrivateRoute';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={FormikLoginForm} />
        <PrivateRoute path="/"  />
      </Switch>
    </Router>
    </Provider>,
    document.getElementById("root")
  );