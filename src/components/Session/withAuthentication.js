import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
                userInfo: null
            };
        }

        componentDidMount() {
            console.log("MAUNTUJEM")
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ?  (this.setState({ authUser }))
                    : this.setState({ authUser: null });
                this.props.firebase.userInfo(authUser.uid).then(result => {
                    this.setState({userInfo: result})
                    console.log(result.username)
                })
            });
        }

        componentWillUnmount() {
            console.log("UNMO")
            this.listener();
        }

        render() {
            return (
                // <AuthUserContext.Provider value={{state: this.state}}>
                <AuthUserContext.Provider value={this.state}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;
