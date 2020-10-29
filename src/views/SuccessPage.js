import React from "react";
import "../css/App.scss";
import "../css/SuccessPage.css";
import { success_logo } from "../assets/images";
import { Component } from "react";
import { withRouter } from "react-router-dom";

class SuccessPage extends Component {
  render() {
    return (
      <div className="success">
        <div className="success__section">
          <h1 className="success__pageTitle">Success!</h1>
          <img className="success__logo" src={success_logo} alt="logo"></img>
          <a className="success__links" href="/login">
            <i className="success__icon material-icons">keyboard_backspace</i>
            Return to Login
          </a>
        </div>
      </div>
    );
  }
}
export default withRouter(SuccessPage);
