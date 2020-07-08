import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from "../constants/routes"
import SignOutButton from "./SignOut";
import {AuthUserContext} from "./Session"

const Navigation = () => {
    return (
        <AuthUserContext.Consumer>
            {context =>
                context.authUser ? <NavigationAuth authUser={context.authUser}
                                                   userName={context.userInfo && context.userInfo.username}/> :
                    <NavigationNonAuth/>
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
            <div className="dropdown">
                <button className="dropbtn">Čaj
                    &#9660;
                </button>
                <div className="dropdown-content">
                    <Link to={ROUTES.CIERNY}>Čierny</Link>
                    <Link to={ROUTES.ZELENY}>Zeleny</Link>
                    <Link to={ROUTES.OVOCNY}>Ovocny</Link>
                    <Link to={ROUTES.BYLINKOVY}>Bylinkovy</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Káva
                    &#9660;
                </button>
                <div className="dropdown-content">
                    <Link to={ROUTES.MLETA}>Mletá</Link>
                    <Link to={ROUTES.ZRNKOVA}>Zrnková</Link>
                    <Link to={ROUTES.KAPSULE}>Kapsule</Link>
                </div>
            </div>
            <li><Link to={ROUTES.PRISLUSENSTVO}>Príslušenstvo</Link></li>

            <div id={"nav-account"}>
                <li><Link to={ROUTES.ACCOUNT}>{authUser.email}</Link></li>

                    <SignOutButton/>

            </div>
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
