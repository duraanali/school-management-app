

import React from "react";
// javascript plugin used to create scrollbars on windows
import { Route, Switch } from "react-router-dom";
import Topbar from "./topbar/topbar";
import Footer from "./footer/footer";
import Navigation from "./sidebar/Navigation";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import "../../assets/css/paper-dashboard.min.css";
import "../../assets/css/paper-dashboard.css";
import "../../assets/demo/demo.css";
import AllPages from "../../Pages";
import FormikStudentEdit from "../pages/students/StudentEdit";
import FormikStudentAdd from "../pages/students/StudentAdd";
import FormikParentEdit from "../pages/parents/ParentEdit";
import FormikParentAdd from "../pages/parents/ParentAdd";
import FormikTeacherEdit from "../pages/teachers/TeacherEdit";
import FormikTeacherAdd from "../pages/teachers/TeacherAdd";
import FormikClassesEdit from "../pages/classes/ClassesEdit";
import FormikClassesAdd from "../pages/classes/ClassesAdd";
import FormikSettingsEdit from "../pages/settings/SettingsEdit";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
    
        <Navigation
          {...this.props}
          AllPages={AllPages}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
 
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Topbar {...this.props} />
          <Switch>
            {AllPages.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Route path="/studentedit/:id"  component={FormikStudentEdit} />
          <Route path="/studentadd/"  component={FormikStudentAdd} />
          <Route path="/parentedit/:id"  component={FormikParentEdit} />
          <Route path="/parentadd/"  component={FormikParentAdd} />
          <Route path="/teacheredit/:id"  component={FormikTeacherEdit} />
          <Route path="/teacheradd/"  component={FormikTeacherAdd} />
          <Route path="/classesedit/:id"  component={FormikClassesEdit} />
          <Route path="/classesadd/"  component={FormikClassesAdd} />
          <Route path="/settingsedit/:id"  component={FormikSettingsEdit} />
          <Footer fluid />
        </div>
     
      </div>
    );
  }
}

export default Dashboard;
