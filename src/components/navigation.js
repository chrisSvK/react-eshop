import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from "../constants/routes"
import SignOutButton from "./SignOut";
import {AuthUserContext} from "./Session"

const Navigation = () => {
    return (
        <AuthUserContext.Consumer>
            {context =>
             context.authUser ? <NavigationAuth authUser={context.authUser} userName={context.userInfo && context.userInfo.username}/> : <NavigationNonAuth/>
            }
        </AuthUserContext.Consumer>
    );
};

const NavigationAuth = ({authUser, userName}) => (
    <nav>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.PRODUCTS}> Products</Link>
            </li>
            <li>{authUser.email}</li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </nav>
);

const NavigationNonAuth = () => (
    <nav>
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
    </nav>
);

export default Navigation;
