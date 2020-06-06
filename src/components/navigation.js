import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from "../constants/routes"
import SignOutButton from "./SignOut";
import {AuthUserContext} from "./Session"

const Navigation = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth/>
            }
        </AuthUserContext.Consumer>
    );
};

const NavigationAuth = ({authUser}) => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>{authUser.email}</li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
            <li>
                <Link to={ROUTES.REGISTER}>Register</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;
