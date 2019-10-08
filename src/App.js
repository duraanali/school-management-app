import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import Students from './components/pages/students/Students';
import Admins from './components/pages/admins/Admins';
import Teachers from './components/pages/teachers/Teachers';
import Classes from './components/pages/classes/Classes';
import Parents from './components/pages/parents/Parents';
import Navigation from "./components/pages/header/Navigation";
import StudentAdd from "./components/pages/students/StudentAdd"
import ParentAdd from "./components/pages/parents/ParentAdd"
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/register/RegisterForm';
import FormikClassesAdd from './components/pages/classes/ClassesAdd';
import FormikTeacherAdd from './components/pages/teachers/TeacherAdd';
import FormikAdminAdd from './components/pages/admins/AdminAdd';
import FormikClassesEdit from './components/pages/classes/ClassesEdit';

import FormikStudentEdit from './components/pages/students/StudentEdit';


function App() {
  return (
    <div>


      <Route exact path="/" component={LoginForm} />
      <Route exact path="/registerform" component={RegisterForm} />

      <PrivateRoute exact component={Navigation} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/students" component={Students} />
      <PrivateRoute exact path="/admins" component={Admins} />
      <PrivateRoute exact path="/teachers" component={Teachers} />
      <PrivateRoute exact path="/classes" component={Classes} />
      <PrivateRoute exact path="/parents" component={Parents} />

      <PrivateRoute exact path="/studentadd" component={StudentAdd} />
      <PrivateRoute exact path="/parentadd" component={ParentAdd} />
      <PrivateRoute exact path="/classesadd" component={FormikClassesAdd} />
      <PrivateRoute exact path="/teacheradd" component={FormikTeacherAdd} />
      <PrivateRoute exact path="/adminadd" component={FormikAdminAdd} />



      <PrivateRoute  path="/classesedit/:id" component={FormikClassesEdit} />

      <PrivateRoute exact path="/studentedit/:id" component={FormikStudentEdit} />

    </div>
  );
}

export default App;
