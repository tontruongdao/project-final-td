import React, { useState, useRef } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import styled, {ThemeProvider } from 'styled-components';
import  GlobalStyles  from './components/GlobalStyles';
import { theme } from './components/THEMES';
import { db, auth } from './services/firebase'

import Home from './pages/Home';
import MyRecipes from './pages/MyRecipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';

import Recipes from './pages/recipe/Recipes'
import Recipe from "./pages/recipe/Recipe";

import RecipeTest from "./pages/recipe/RecipeTest";

import { AuthContext } from './components/AuthContext'

import Burger from './components/Burger';
import Menu from './components/Menu';
import { FiHome } from "react-icons/fi";
import { IoIosRestaurant } from "react-icons/io";
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

    const {authenticated, email, userID, recipeCount, setRecipeCount, loading} = React.useContext(AuthContext)

    // Burger state
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

    React.useEffect(() => {
        // console.log("My userid is:", userID)
        db.ref(`/users/${userID}/MyRecipes`).on("value", snapshot => {
                // "snapshop is the unformated database, val returns the actual data."
                const data = snapshot.val();
                if(data){
                  const countOfRecipes = Object.values(data).length;
                  setCount(countOfRecipes);
                  // console.log("Here is my count",countOfRecipes);
                } else {
                  setCount(0)
                }
              })
    }, [userID]);

    return  (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
            <Router>
            <Nav ref={node}>
              <>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />  
                <Link to="/"><FiHome size={40} color={theme.primaryLight}/></Link>
                {/* <div>SearchBar</div> */}
                
                <div>
                {!authenticated && 
                  <LoginLink to="/login">Login</LoginLink>
                }

                {authenticated && 
                  <NavUser to="/my-recipes">
                    <IoIosRestaurant size={40} color={theme.primaryLight}/>
                    <Count >{count}</Count>
                  </NavUser>
                }
                </div>
              </>
            </Nav>

            {/* This will make certain route available only if you are authenticated, "Recipes". */}
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/#" component={Contact}></Route>
                <Route exact path="/#" component={About}></Route>
                <Route exact path="/test" component={RecipeTest}></Route>
                <PrivateRoute exact path="/my-recipes" authenticated={authenticated} component={MyRecipes} reroute={"/"}></PrivateRoute>
                <PrivateRoute exact path="/recipe/:id" authenticated={authenticated} component={Recipe} reroute={"/"}></PrivateRoute>
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
    /* border: solid red 1px; */
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 15px;
    position: sticky;
    top:0;
    background: none;
  `

  const NavUser = styled(Link)`
    display:flex;
    justify-content:center;
    align-items: center;
    text-decoration: none;
  `
  const Count = styled.span`
    color: ${theme.primaryLight};

  `
  const LoginLink = styled(Link)`
    color: ${theme.primaryLight};
    font-size: 1.2rem;
    text-decoration: none;
  `
  export default App;