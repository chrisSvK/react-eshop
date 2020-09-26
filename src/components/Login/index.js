import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { RegisterLink } from "../Register/index";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const LoginPage = () => (
  <div>
    <h1>Log In</h1>
    <LoginForm />
    <RegisterLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LoginFormBase extends Component {
  constructor(props) {
    super();

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="register">
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            autoComplete="off"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <button disabled={isInvalid} type="submit">
            Log In
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default LoginPage;

export { LoginForm };
