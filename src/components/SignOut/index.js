import React from 'react';

import {withFirebase} from '../Firebase';
import Button from "react-bootstrap/Button";

const SignOutButton = ({firebase}) => (
    <div type={"button"} onClick={firebase.doSignOut}>
        <span className="material-icons">
exit_to_app
</span>Sign Out
    </div>

);

export default withFirebase(SignOutButton);
