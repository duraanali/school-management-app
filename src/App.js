import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/PrivateRoute'
import RegisterForm from './components/register/RegisterForm';
import Dashboard from './components/pages/Dashboard';
import Students from './components/pages/students/Students'
import Admins from './components/pages/admins/Admins'
import Teachers from './components/pages/teachers/Teachers'
import Classes from './components/pages/classes/Classes'
import Parents from './components/pages/parents/Parents'


function App() {
  return (
    <div>


      <Route exact path="/" component={LoginForm} />
      <Route exact path="/registerform" component={RegisterForm} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/students" component={Students} />
      <PrivateRoute exact path="/admins" component={Admins} />
      <PrivateRoute exact path="/teachers" component={Teachers} />
      <PrivateRoute exact path="/classes" component={Classes} />
      <PrivateRoute exact path="/parents" component={Parents} />


    </div>
  );
}

export default App;
