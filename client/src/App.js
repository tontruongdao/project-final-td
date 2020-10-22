import React, { Component, useState, useRef } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import styled, {ThemeProvider } from 'styled-components';
import  GlobalStyles  from './components/GlobalStyles';
import { theme } from './components/THEMES';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';

import Burger from './components/Burger';
import Menu from './components/Menu';
import { useOnClickOutside } from './hooks';

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


    // Burger state
    const [open, setOpen] = useState(false);
    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

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
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
            <Router>

            <Nav ref={node}>
              <div>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />  
              </div>
            </Nav>

            {/* This will make certain route available only if you are authenticated, "Chat". */}
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
                <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
                <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
            </Switch>

            </Router>
          </>
      </ThemeProvider>
    );
  };

  const Nav = styled.div`
    border: solid red 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 60px;
  `

  export default App;