import React from 'react'
import styled from 'styled-components'
import {db} from "../../services/firebase";
import {AuthContext} from "../../components/AuthContext";
import { theme }  from "../../components/THEMES"

import Footer from "../../components/Footer"
import Spinner from "../../components/Spinner"



const Recipe = () => {  
    const {userID, setRecipeCount} = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true)
    const [singleRecipe, setSingleRecipe] = React.useState(null)
    const [recipeTitle, setRecipeTitle] = React.useState(null)
    const [recipeId, setRecipeId] = React.useState(null)
    const [steps, setSteps] = React.useState(null)

    const [hasRecipe, setHasRecipe] = React.useState(null);
    const [recipeList, setRecipeList] = React.useState(null);

    const fetchRecipe = (q) => {
        fetch(`/api/recipe/${q}`).then(res => res.json()).then(json=>{
            console.log("[SINGLE RECIPE]", json);
            setRecipeTitle(json.data.title)
            setSingleRecipe(json.data);
            setSteps(json.data.analyzedInstructions[0].steps)
            console.log(singleRecipe)
        }) 
        setLoading(false)
    }

    function addRecipe(recipeName, id){
        const recipeObj = {recipeName,id}
        // setRecipeCount(x=>x+1)
        db.ref(`users/${userID}/MyRecipes`).child(id).update(recipeObj);
        setHasRecipe(true);
    }

    function removeRecipe(id){

        // remove an entire object endpoint
        db.ref(`users/${userID}/MyRecipes/${id}`).remove();
        setHasRecipe(false);
        console.log("My removed data is", id);
    }

    function readRecipe(){

        db.ref(`/users/${userID}/MyRecipes`).on("value", snapshot => {

            const data = snapshot.val();

            if(data){
                const recipes = Object.values(data);
                setRecipeList(recipes);
                console.log("Here is my recipe list",recipes);
            }
        })
    }

    React.useEffect(()=>{
        // console.log("Recipe component is loaded");
        
    const url = window.location.pathname.split("/");
    // const recipeName = url[url.length-2];
    const id = url[url.length-1];
    // console.log(url, id)
    // console.log(recipeName);
    setRecipeId(id)
    fetchRecipe(id)

    db.ref(`/users/${userID}/MyRecipes`).on("value", snapshot => {
        const data = snapshot.val();
        console.log("DATA", data);
        if (data) {
            const recipes = Object.keys(data);
            console.log("test id", recipeId)
            if(recipes.includes(recipeId)) {
                console.log("This recipe is already addded!");
                setHasRecipe(true);
            } else {
                console.log("You can add this recipe!")
                setHasRecipe(false);
            }
            console.log("All The Recipes:", recipes);
        }
    })
    },[userID, recipeId])

    // console.log(singleRecipe)

    if(loading){
        return <h1>Loading...</h1>
    }

    return ( recipeTitle && singleRecipe && steps ? (

        <Wrapper >
            <SectionPrim>
                <FirstContainer>
                    <Image image={singleRecipe.image}/>
                    <ButtonContainer>
                        <Button disabled={hasRecipe} onClick={() => addRecipe(recipeTitle, recipeId)} >+</Button>
                        <Button style={{color: "#800020"}} disabled={!hasRecipe} onClick={() => removeRecipe(recipeId)}>-</Button>
                    </ButtonContainer>                   
                </FirstContainer>
                <SecondContainer>
                    <Title>{recipeTitle}</Title>
                    {singleRecipe.extendedIngredients.map((ingredient) => {
                    return(
                            <ul>
                                <Text>       
                                    - {ingredient.originalName}
                                </Text>
                            </ul>
                        )
                    })}
                </SecondContainer>
            </SectionPrim>
            <SectionSec>
                    <div>
                        <h2>Cooking Time: </h2>
                        <div>{singleRecipe.readyInMinutes}</div>                        
                    </div>
                    <div>
                        <h2>Health Score:</h2>
                        <div> {singleRecipe.healthScore}</div>
                    </div>
            </SectionSec>
            <SectionTrd>   
                {steps.map((step) => {
                    return(
                        <Instructions>
                            <InstructionsText >       
                                - {step.step}
                            </InstructionsText>
                        </Instructions>
                        )
                    })}
            </SectionTrd>
            <Footer/>
        </Wrapper>
        ) :  <Spinner/>
    ) 
}

const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 5vh auto;
    min-height: 110vh;
    border-radius: 5px;
`

const SectionPrim = styled.div `
    padding-top: 5vh;
    min-height: 50vh;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0.1rem 0.5rem ${theme.primaryLight};
`

const FirstContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Image = styled.div`
    
    margin-top: 5vh;
    margin-left: 5vw;
    width: 35vw;
    height: 50vh;
    background: url(${props => props.image});
    background-size: cover;
    box-shadow: 0 0rem 1rem gray;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: ${theme.primaryLight};

    @media (max-width: 768px) {
    margin-top: 1vh;
    margin-left: 1vw;
    width: 80%;
    height: 50vh;
    }

`
const ButtonContainer = styled.div`
    margin-left: 5vw;
    margin-bottom: 4vh;
    opacity: 0.75;
`


const Button = styled.button`
    border:none;
    background: none;
    margin-right: 2vw;
    margin-left: 2vw;
    transition: 0.5s ease-in;
    color: #04351a;
    font-size: 4rem;
    opacity: 0.5;

    &:hover:enabled {
        opacity: 1;
    }
    &:hover:disabled {
        /* background: red; */
    }
`;

const SecondContainer = styled.div`
    margin-left: 5vw;
    margin-right: 5vw;
    width: 40vw;
`

const Title = styled.h1`
    color: ${theme.primaryLight};
    font-size: 2rem;
    letter-spacing: 2px;
    padding-bottom: 5vh;
`

const Text = styled.li`
    color: gray;
    letter-spacing: 1px;
    word-wrap: break-word;
    margin-top: 0.5vh;
`

const SectionSec = styled.div `
    margin-top: 6vh;
    margin-bottom: 6vh;
    display:flex;
    justify-content: space-around;

    
    & h2 {
        font-size: 1.5rem;
        color: ${theme.primaryLight};
    }

    & div {
        color: gray;
        font-size: 1.2rem;
        text-align: center;
        font-weight: bold;
    }
`

const SectionTrd = styled.div`
    margin-bottom: 8vh;
`

const Instructions = styled.ul`
    padding-left: 5vw;
`

const InstructionsText = styled.li`
    color: ${theme.primaryLight};
    letter-spacing: 1px;
    word-wrap: break-word;
    margin-top: 1vh;
`

export default Recipe



