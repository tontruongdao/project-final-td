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
import MyRecipes from './pages/MyRecipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';

import Recipes from './pages/recipe/Recipes'
import Recipe from "./pages/recipe/Recipe";

import { auth } from './services/firebase';
import {AuthContext} from './components/AuthContext'

import Burger from './components/Burger';
import Menu from './components/Menu';
import { FiHome } from "react-icons/fi";
import { useOnClickOutside } from './hooks';


  // ########################## HOC WRAPPING COMPONENTS #################################
  // Wrapping components made available if user is authenticated
  function PrivateRoute({ component: Component, authenticated,  reroute ,...rest}) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: reroute, state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  function PublicRoute({ component: Component, authenticated, reroute, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
  // ##################################################################################
  const App = () => {

    const {authenticated, loading, email} = React.useContext(AuthContext)

    // Burger state
    const [open, setOpen] = useState(false);
    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

    // React.useEffect(() => {
    //   console.log("[Apps.js] Mounted");
    //   auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       setLoading(false);
    //       setAuthenticated(true);
    //     } else {
    //       setLoading(false);
    //       setAuthenticated(false);
    //     }
    //   });
    // }, []);
    return  (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
            <Router>

            <Nav ref={node}>
              <>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />  
                <a href="/"><FiHome size={40} color={"gray"}/></a>
                {/* <div>SearchBar</div> */}
                <h1>{email}</h1>
              </>
            </Nav>

            {/* This will make certain route available only if you are authenticated, "Recipes". */}
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/contact" component={Contact}></Route>
                <Route exact path="/about" component={About}></Route>
                <PrivateRoute exact path="/recipe/:id" authenticated={authenticated} component={Recipe} reroute={"/"}></PrivateRoute>
                <PrivateRoute exact path="/my-recipes" authenticated={authenticated} component={MyRecipes} reroute={"/"}></PrivateRoute>
                <PublicRoute exact path="/signup" authenticated={authenticated} component={Signup} reroute={"/"}></PublicRoute>
                <PublicRoute exact path="/login" authenticated={authenticated} component={Login} reroute={"/"}></PublicRoute>
                <PrivateRoute exact path="/:recipe" authenticated={authenticated} component={Recipes} reroute={"/"}></PrivateRoute>

            </Switch>

            </Router>
          </>
      </ThemeProvider>
    );
  };

  const Nav = styled.div`
    align-items: center;
    border: solid red 1px;
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 15px;
  `

  export default App;