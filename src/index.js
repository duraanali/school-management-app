
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from "react-router-dom";
// import './index.css';


// import { render } from 'react-dom';
// import { Provider } from 'react-redux';

// import store from './store';
// import Page from './Page';

// const App = () => (
//     <Provider store={store}>
//         <Page />

//     </Provider>
// );

// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));