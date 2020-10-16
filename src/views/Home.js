import React from "react";
import "../css/App.css";
import "../css/Home.css"
import { Link } from "react-router-dom";
import { logo } from "../assets/images";

function Home() {
  return (
    <div className="home">
      <div className="home__section">
        <h1 className="home__pageTitle">Coffee Shop Name Here</h1>
        <img className="home__logo" src={logo} alt="logo"></img>
        <div className="home__form">
          <i class="home__icon material-icons">person</i>
          <input
            className="home__input"
            type="text"
            placeholder="Username"
          ></input>
          <i class="home__icon material-icons">lock</i>
          <input
            className="home__input"
            type="text"
            placeholder="Password"
          ></input>
          <div className="home__loginButton">Sign In</div>

          <Link
            className="home__registerButton"
            to="/register"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Register
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;
