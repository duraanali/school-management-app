import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { Route } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import Pages from "../../../Pages";
import "../../../assets/css/paper-dashboard.min.css";
import "../../../assets/css/paper-dashboard.css";
import "../../../assets/demo/demo.css";

class Navigation extends React.Component {
  // verifies if routeName is the one active (in browser input)

  render() {
    
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <p
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              {/* <img src={logo} alt="react-logo" /> */}
            </div>
          </p>
          <a
            href="/"
            className="simple-text logo-normal"
          >
            Alif Cloud
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {Pages.map((prop, key) => {
             
              return (
                <li>
                <Route
                  path={prop.layout + prop.path}
                
                  key={key}
                />
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Navigation;