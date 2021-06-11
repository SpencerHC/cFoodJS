import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    /* This function calls the initial react render of the app and starts the app */
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);