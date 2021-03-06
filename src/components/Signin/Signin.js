import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase";

import SigninForm from "./SigninForm";

import * as routes from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: {
    message: ""
  }
};

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.context.dispatch({
      type: "CHANGE_ACTIVE",
      payload: "Login"
    });

    this.props.context.dispatch({
      type: "SHOW_ARROW"
    });
  }

  componentWillUnmount() {
    this.props.context.dispatch({
      type: "HIDE_ARROW"
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div>
        <SigninForm
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          {...this.state}
          btnText="Log In"
        />
      </div>
    );
  }
}

export default withRouter(SignIn);
