import React from "react";
import "../css/App.scss";
import "../css/About.scss";
import { Component } from "react";
import { withRouter } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="about__section">
          <h1 className="about__pageTitle">About</h1>
          <div className="about__subSection">
            <div className="about__sectionContent">
              <p>
                One of the simple joys in life is to head down to one’s local
                coffee shop and enjoy a nice conversation with friends,
                coworkers, or even a friendly stranger.
                <br></br>
                However, during these pressing times of social distancing and
                self-quarantining, these moments are slowly slipping away from
                our lives.
                <br></br>
                The purpose of MoChat is a website that allows users to recreate
                these moments from the comfort of their home.
                <br></br>
                <p>
                  As a member of MoChat, you will be able to create your own
                  personal account where you can add to your list of friends or
                  even search for new friends. When joining chatrooms, you also
                  have the option of joining public rooms, or joining a private
                  chat room with a friend.
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(About);
