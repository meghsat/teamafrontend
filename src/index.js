import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import Login from "./components/login";
import Admin from './components/admin';
import * as serviceWorker from './serviceWorker';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <Routes>
        <Route exact path="/" element= { <App/> }/>
        <Route path="/login" element= { <Login/> }/>
        <Route path="/admin" element= { <Admin/> }/>
    </Routes>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
