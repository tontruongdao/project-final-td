import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';

  // ########################## HOC WRAPPING COMPONENTS #################################
  // Wrapping components made available if user is authenticated
  function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
            <Redirect to="/chat" />
          )
        }
      />
    );
  }
  // ##################################################################################
  const App = () => {

    // Logic to verify if user is authenticated
    const [loading, setLoading] = React.useState(true);
    const [authenticated, setAuthenticated] = React.useState(false);
    React.useEffect(() => {
      console.log("[Apps.js] Mounted");
      auth().onAuthStateChanged((user) => {
        if (user) {
          setLoading(false);
          setAuthenticated(true);
        } else {
          setLoading(false);
          setAuthenticated(false);
        }
      });
    }, []);
    return  (
        <Router>
        {/* This will make certain route available only if you are authenticated, "Chat". */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    );
  };
  export default App;