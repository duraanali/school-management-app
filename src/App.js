import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import Students from './components/pages/students/Students';
import Admins from './components/pages/admins/Admins';

import Topbar from "./components/layout/topbar/Topbar"
import Container from 'react-bootstrap/Button';
import FormikStudentEdit from './components/pages/students/StudentEdit';


function App() {
  return (
    <Container>


      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/registerform" component={RegisterForm} />

    </Container>
  );
}

export default App;
