import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import Pages from "../../../Pages";
import "../../../assets/css/paper-dashboard.min.css";
import "../../../assets/css/paper-dashboard.css";
import "../../../assets/demo/demo.css";
import {fetchSettings} from "../../../actions";
function Navigation(props) {
 
  const { settings } = props;

  useEffect(() => {
    props.dispatch(fetchSettings());
    
  }, []);
 
    return (
      <div
        className="sidebar"
        data-color={props.bgColor}
        data-active-color={props.activeColor}
      >
        <div className="logo">
 
          <a
            href="/AdminAccount/dashboard"
            className="simple-text logo-normal"
          >
                {settings.map((setting) => {
                    return (
                      <p>
                        {setting.school_name}
                      </p>
                    );
                  })}
          </a>
        </div>
        <div className="sidebar-wrapper" ref={props.sidebar}>
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


  const mapStateToProps = state => {
    return {
    settings: state.SettingsReducer.settings,

    };
  };
  
  export default connect(mapStateToProps)(Navigation);