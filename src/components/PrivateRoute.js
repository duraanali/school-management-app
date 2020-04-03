import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminAccount from "./layout/AdminAccount";
// requirements: R
// 1. It has the same API as `<Route />` - Have the same props
// 2. It renders a <Route /> and passes all the props through to it.

const PrivateRoute = () => (
    <Route
     
        render={props =>
            localStorage.getItem("token") ? (
                <AdminAccount {...props} />
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
);

export default PrivateRoute;

// ({ component, ...rest }) is shorthand for  👇
// const props = {
//   component: {},
//   exact: true,
//   path: '/protected',
//   render: null,
// }

// const component = props.component;
// const rest = {
//   exact: props.exact,
//   path: props.path,
//   render: props.render
// }
