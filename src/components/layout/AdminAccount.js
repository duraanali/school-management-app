

import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import Topbar from "./topbar/Topbar";
import Footer from "./footer/Footer";
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


var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
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
          <Footer fluid />
        </div>
     
      </div>
    );
  }
}

export default Dashboard;
