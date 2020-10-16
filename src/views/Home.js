import React from "react";
import "../css/App.css";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { logo2 } from "../assets/images";

function Home() {
  return (
    <div className="home">
      <div className="home__section">
        <h1 className="home__pageTitle">Chat with Friends</h1>
        <img className="home__logo" src={logo2} alt="logo"></img>
        <h2>Coming Soon!</h2>
      </div>
      <div className="home__section">
        <h2 className="home__pageTitle">Not a Member?</h2>
        <Link
          className="home__registerButton"
          to="/register"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Register
        </Link>
        <h2 className="home__pageTitle">Already a Member?</h2>
        <div className="home__loginButton">Sign In</div>
      </div>
    </div>
  );
}

export default Home;
