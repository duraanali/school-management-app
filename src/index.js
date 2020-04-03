import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import {Router, Route, Switch, Redirect } from "react-router-dom";
import FormikLoginForm from "./components/login/LoginForm"
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css";
import PrivateRoute from './components/PrivateRoute';

const hist = createBrowserHistory();
ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={FormikLoginForm} />
        <PrivateRoute path="/"  />} />
      </Switch>
    </Router>,
    document.getElementById("root")
  );