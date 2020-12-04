import React from "react";
import "./css/App.scss";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import SuccessPage from "./views/SuccessPage";
import ChatRoomsPage from "./views/ChatRoomsPage";
import Chat from "./views/Chat";
import CreateChatRoom from "./views/CreateChatRoom"
import Search from "./views/Search";
import NavBar from "./components/NavBar.component";
import { Redirect } from "react-router-dom";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: "",
      isLoggedIn: true,
      user: {},
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    //let token = "";
    if (user !== null) {
      this.setState({ user: user });
      this.setState({ isLoggedIn: true });
    } else {
      localStorage.setItem("isLoggedIn", false);
      this.setState({ isLoggedIn: false });
    }
  }

  setUserState = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    this.setState({ user: user });
    this.setState({ isLoggedIn: true });
  };

  logout = () => {
    this.setState({
      sessionToken: "",
      user: {},
      isLoggedIn: false,
    });
    localStorage.clear();
  };

  render() {
    let isLoggedIn = this.state.isLoggedIn;

    return (
      <div className="App">
        <Router>
          <NavBar clickLogout={this.logout} />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/home" />
              }
            />
            <Route path="/home">
              <Home isLoggedIn={isLoggedIn} clickLogout={this.logout} />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/profile">
              <Profile setUser={this.setUserState} />
            </Route>
            <Route path="/register">
              <Register clickLogout={this.logout} />
            </Route>
            <Route path="/login">
              <Login setUser={this.setUserState} />
            </Route>
            <Route path="/success">{<SuccessPage />}</Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/chatrooms"><ChatRoomsPage/></Route>
            {/* <Route path="/chat">{Chat}</Route> */}
            <Route path="/chat/:id?" id="***"><Chat/></Route>
            <Route path="/create_room"><CreateChatRoom/></Route>
          </Switch>
        </Router>
        <div className="App__divider"></div>
      </div>
    );
  }
}

export default App;
