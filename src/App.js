import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/register/RegisterForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Route path="/" exact component={LoginForm} />
        <Route exact path="/RegisterForm" component={RegisterForm} />
      </header>
    </div>
  );
}

export default App;
