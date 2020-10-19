import React from "react";
import "../css/App.css";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { chat_logo } from "../assets/images";

function Home() {
  return (
    <div className="home">
      <div className="home__section">
        <h1 className="home__pageTitle">Chat with Friends</h1>
        <img className="home__logo" src={chat_logo} alt="logo"></img>
        <h2>Coming Soon!</h2>
      </div>
      <div className="home__section">
        <h2 className="home__pageTitle">Not a Member?</h2>
        <Link
          className="home__buttons"
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >
          <h2 className="home__buttonLabel">Register</h2>
        </Link>
        <h2 className="home__pageTitle">Already a Member?</h2>
        <Link
          className="home__buttons"
          to="/login"
          style={{ color: "white", textDecoration: "none"}}
        >
          <h2 className="home__buttonLabel">Sign In</h2>
        </Link>
      </div>
    </div>
  );
}

export default Home;
