import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';

import Navigation from "./components/navigation"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

function App() {
    return (
        <div className="App">
            <Router>
                <Navigation/>
                <hr/>
                <Route exact path={ROUTES.HOME} component={HomePage}/>
                <Route path={ROUTES.LOGIN} component={LoginPage}/>
                <Route path={ROUTES.REGISTER} component={RegisterPage}/>
            </Router>
        </div>
    );
}

export default App;
