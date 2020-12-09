import React from 'react'
import styled, { keyframes } from 'styled-components'
import {Link} from "react-router-dom"

import { theme }  from "../components/THEMES"

import { db } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";

import hacker from "../.pics/hacker.jpg"
import mainLogo from "../.pics/chefHacker.png"

import pizzaLogo from "../.pics/pizza.png"
import ramenLogo from "../.pics/ramen.png"
import sandwichLogo from "../.pics/sandwich.png"
import veganLogo from "../.pics/vegan.png"

import pizzaImage from "../.pics/pizza.jpg"
import sandwichImage from "../.pics/sandwich.jpg"
import ramenImage from "../.pics/ramen.jpg"
import veganImage from "../.pics/vegan.jpg"

import Cards  from "../components/Cards"
import Footer from "../components/Footer"

import RecipeTest from "../pages/recipe/RecipeTest"

import TopRecipe from "../components/TopRecipe";

const Home = () => {


    //##################################### React Hooks ###############################

    const {userID, setRecipeCount} = React.useContext(AuthContext);

    const [recipeList, setRecipeList] = React.useState(null);

    //##################################### React Hooks ###############################

    //##################################### HELPERS ###############################

    function readRecipe(){

        db.ref(`/users`).on("value", snapshot => {

            const data = snapshot.val();

            if(data){
                const recipes = Object.values(data);
                setRecipeList(recipes);
                console.log("Here is my recipe list",recipes);
            }
        })
    }

    function compileData(){
        console.log("I compile data")
    }

    //##################################### HELPERS ###############################

    return(
        <Wrapper>
            {/* <Img src={hacker} alt="hacker"/> */}
            {/* <TopRecipe/> */}
            <Header>
                <LogoContainer>
                    <Logo src={mainLogo} alt="chefhacker"/>
                </LogoContainer>
                <HeaderTextContainer>
                    <HeaderText>
                        <HeaderTextPrim>Chef Hacker</HeaderTextPrim>
                        <HeaderTextSec>Cooking made easy for programmers</HeaderTextSec>
                    </HeaderText>
                </HeaderTextContainer>
            </Header>
            {/* <Link to="/test">test</Link>
            {userID && 
            <div>
                <button onClick={() => readRecipe()}>Read</button>
                <button onClick={() => compileData()}>CompileData</button>
            </div>
            } */}
            <SectionText>Our Favorites</SectionText>
            <ContainerWrapper>
                <Cards 
                    image={pizzaImage}
                    logo={pizzaLogo}
                    text1="Pizza"
                    text2="Classic"
                    text3="Tasty"
                    text4="Meaty"
                    text5="Difficulty: Moderate"
                    link="/pizza"    
                />
                <Cards 
                    image={sandwichImage}
                    logo={sandwichLogo}
                    text1="Sandwich"
                    text2="Time Saving"
                    text3="Crunchy"
                    text4="Meaty"
                    text5="Difficulty: Easy"
                    link="/sandwich"   
                />
            </ContainerWrapper>

            <ContainerWrapper>                    
                <Cards 
                    image={ramenImage}
                    logo={ramenLogo}
                    text1="Ramen"
                    text2="Umami taste!"
                    text3="Tasty"
                    text4="Meaty"
                    text5="Difficulty: Hard"
                    link="/ramen"   
                />
                <Cards 
                    image={veganImage} 
                    logo={veganLogo}
                    text1="Vegan"
                    text2="Environment-friendly"
                    text3="Low carbon footprint"
                    text4="!Meaty"
                    text5="Difficulty: Extreme"
                    link="/vegan"   
                />
            </ContainerWrapper>
            <Footer/>
        </Wrapper>)

};


const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 0 auto;
`
const LogoContainer = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* position: absolute; */
`

const Logo = styled.img`
    height: 20vh;
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
const moveInRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(90px)
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
    linear-gradient(to right bottom, white, #13664abd),
    url(${hacker});
  background-size: cover;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 75%);
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
  animation-delay: 0.5s;
`

const HeaderTextSec = styled.span`
  display: block;
  font-size: rem;
  letter-spacing: 17.4px;

  animation-name: ${moveInRight};
  animation-duration: 2s;
  animation-delay: 0.5s;
`

const SectionText = styled.h1`
    margin: auto;
    color: ${theme.primaryLight};
    text-transform: uppercase;
    width:50%;
    text-align: center;
    font-size: 2.5rem;
    padding-bottom: 15vh;
`

const ContainerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 30vh;
`

const PizzaContainer = styled.div`
    background-color: grey;
    min-width: 15vw;
    min-height: 60vh;
    margin: 5vh 12vw;
    padding: 15px 20px;

    flex:1;
    position: relative;
    z-index: 1;

`
const SandwichContainer = styled.div`
    background-color: grey;
    min-width: 15vh;
    min-height: 60vh;
    margin: 5vh 12vw;
    padding: 15px 20px;

    flex:1;
    position: relative;
    z-index: 1;

`
// const RamenContainer = styled.div`
//     background-color: grey;
//     margin: 5vh 10w;

//     flex:1;
//     position: relative;
//     z-index: 1;
//     width:20vw;
// `

// const VeganContainer = styled.div`
//     background-color: grey;
//     margin: 5vh 10vw;

//     flex:1;
//     position: relative;
//     z-index: 1;
// `

const ContainerLink = styled(Link)`
    color: black;
    text-decoration: none;
`

export default Home