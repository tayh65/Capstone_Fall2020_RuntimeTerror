import React, { Component } from "react";
import "../css/App.scss";
import "../css/Home.scss";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    this.setState({ isLoggedIn: isLoggedIn });
    if (user != null) {
      this.setState({ user: user });
    }
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;
    let Section;
    if (isLoggedIn === "true") {
      Section = (
        <div
          className="home__profileSection"
          onClick={() => {
            this.props.clickLogout();
            alert("Logout Successful!");
            this.props.history.push("/login");
          }}
        >
          <i className="home__logoutIcon material-icons">power_settings_new</i>
          Logout
        </div>
      );
    } else {
      Section = (
        <div
          className="home__profileSection"
          onClick={() => {
            this.props.clickLogout();
            this.props.history.push("/login");
          }}
        >
          <i className="home__loginIcon material-icons">login</i>
          Login
        </div>
      );
    }
    return (
      <div className="home">
        <div className="home__header">
          <h1 className="home__pageTitle">MoChat</h1>
          <h2 className="home__welcomeMessage">Welcome back, {this.state.user.fname}</h2>
          {Section}
        </div>
        <div className="home__sectionContainer">
          <div className="home__section">
            <div className="home__subSection">
              <h2 className="home__subSectionTitle">Search for Friends!</h2>
              <i className="home__searchIcon material-icons">search</i>
              <p className="home__subSectionContent">
                MoChat allows you to connect with friends so that you will be
                able to join chatrooms with them!<br></br>
                Get started now by searching and adding friends to your
                personalized Friends List!
              </p>
              <div className="home__arrowSection">
                <a href="/search">
                  <i className="home__minimizeIcon material-icons">minimize</i>
                  <i className="home__arrowIcon material-icons">
                    arrow_right_alt
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="home__section">
            <div className="home__subSection">
              <h2 className="home__subSectionTitle">Join a Chatroom!</h2>
              <i className="home__searchIcon material-icons">chat</i>
              <p className="home__subSectionContent">
                MoChat offers different chatrooms to mingle with other coffee
                lovers!<br></br>
                Each new chatroom will provide a conversation topic to get
                things started.<br></br>
                Start chatting now!
              </p>
              <div className="home__arrowSection">
                <a href="/chat">
                  <i className="home__minimizeIcon material-icons">minimize</i>
                  <i className="home__arrowIcon material-icons">
                    arrow_right_alt
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="home__section">
            <div className="home__subSection">
              <h2 className="home__subSectionTitle">Manage your Profile!</h2>
              <i className="home__searchIcon material-icons">person</i>
              <p className="home__subSectionContent">
                Want to update your personal information? or keep track of your
                list of friends?<br></br>
                Navigate to your personal profile page to view and update your
                MoChat profile!
              </p>
              <div className="home__arrowSection">
                <a href="/profile">
                  <i className="home__minimizeIcon material-icons">minimize</i>
                  <i className="home__arrowIcon material-icons">
                    arrow_right_alt
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
