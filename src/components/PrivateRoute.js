import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// requirements: R
// 1. It has the same API as `<Route />` - Have the same props
// 2. It renders a <Route /> and passes all the props through to it.

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
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
