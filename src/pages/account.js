import React from 'react';

import {AuthUserContext, withAuthorization} from '../components/Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {context => (
            <div>
                <h1>Account: {context.userInfo && context.userInfo.username}</h1>
                <h2>Mail: {context.userInfo && context.userInfo.email}</h2>
            </div>
        )}
    </AuthUserContext.Consumer>

)


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
