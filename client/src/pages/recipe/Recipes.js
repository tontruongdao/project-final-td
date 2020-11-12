import React from 'react'
import {Link} from 'react-router-dom'

import styled, { ThemeProvider, keyframes } from 'styled-components';
import { theme } from '../../components/THEMES';

import hacker from "../../.pics/restaurant.jpg"
import Spinner from "../../components/Spinner"
import Footer from "../../components/Footer"

const Recipes = () =>{

    const [loading,setLoading] = React.useState(true)
    const [recipe,setRecipe] = React.useState(null)
    const [recipeCategory, setRecipeCategory] = React.useState(null)

    const fetchRecipe = (q) => {
        // THIS IS BACKEND 
        fetch(`/recipe/category/${q}`).then(res => res.json()).then(json=>setRecipe(json.data.results)) 
        setLoading(false)
    }

    React.useEffect(()=>{
        console.log(`${recipeCategory}`);
        
    const url = window.location.pathname.split("/");
    const recipeName = url[url.length-1];
    setRecipeCategory(recipeName);
    console.log("[RECIPES.js]",recipeName);
        fetchRecipe(recipeName)
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }

    // Used turnery operator for conditiannal rendering.
    return( recipe ? (
        <Wrapper>
            <Header>
                <HeaderTextContainer>
                    <HeaderText>
                        <HeaderTextPrim>Recipes</HeaderTextPrim>
                    </HeaderText>
                </HeaderTextContainer>
            </Header>
            {recipe.map((item, i) => {
                return(
                    <Text>
                        <ul>
                            <li style={(i === recipe.length-1) ? {borderBottom:"none"} : {borderBottom: `solid gray 1px`}}>
                                <ContainerLink to={`recipe/${item.id}`}>
                                    {item.title}
                                </ContainerLink>
                            </li>
                        </ul>
                    </Text>
                // <h1>
                //     <Link to={`recipe/${item.id}`}>{item.title}</Link>
                // </h1>
                )
            })}
            <Footer/>
        </Wrapper>
    ) : <Spinner/>
    ) 
};

const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 0 auto;
`
const moveInLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-90px)
    }
    100% {
        opacity: 1;
        transform: translateX(0)
    }
`

const Header = styled.div`
  width: 100%;
  height: 95vh;
  background: 
    linear-gradient(to right bottom, white, #0504538f),
    url(${hacker});
  background-size: cover;
  clip-path: polygon(0 0, 100% 40%, 100% 85%, 0 80%);
  margin-bottom: 9%;
  position: relative;
  z-index: -1;
`
const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  /* background-color: red; */
  transform: translate(-50%, -40%);
`
const HeaderText = styled.h1`
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  color: #ffffff;
  text-transform: uppercase;
`
const HeaderTextPrim = styled.span`
  display: block;
  font-size: 4rem;
  letter-spacing: 35px;

  animation-name: ${moveInLeft};
  animation-duration: 2s;
  animation-delay: 1s;
`
const Text = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    color:gray;
    padding-bottom: 5vh;
    background: #dedee459;

    & ul {
        list-style: none;
        width: 75%;
        margin: 0 auto;
        padding-top:6vh;
        & li {
            margin: 1px;
            text-align:center;
            padding-bottom: 5vh;
        }
    }
`

const ContainerLink = styled(Link)`
    color: grey;
    text-decoration: none;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 30px;
    text-align: center;
    opacity: 0.5;
    transition: 0.8s ease-in;

    &:hover{
        color: ${theme.primaryLight};
        opacity: 1;
    }
`

export default Recipes