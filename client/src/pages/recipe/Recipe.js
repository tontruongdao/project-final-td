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
        fetch(`/recipe/${q}`).then(res => res.json()).then(json=>{
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
            <div>
                {recipeTitle}
                <div>{singleRecipe.id}</div>
                {/* <Button disabled={hasRecipe} onClick={() => addRecipe(recipeTitle, recipeId)}>Add this Recipe!</Button>                 */}
            </div>
            <SectionPrim>
                <Header image={singleRecipe.image}>
                    <HeaderInfo>
                        <div>Cooking Time: {singleRecipe.readyInMinutes}</div>
                        <div>Health Score: {singleRecipe.healthScore}</div>
                    </HeaderInfo>
                    <div>
                        <Button disabled={hasRecipe} onClick={() => addRecipe(recipeTitle, recipeId)}>Add this Recipe!</Button>   
                        <Button onClick={() => readRecipe()}>Read Recipe</Button>      
                        <Button disabled={!hasRecipe} onClick={() => removeRecipe(recipeId)}>Remove this Recipe</Button>   
                    </div>
                </Header>
                <div>
                    <h1>{singleRecipe.title}</h1>
                    {singleRecipe.extendedIngredients.map((ingredient) => {
                        return(
                            <ul>
                                <li >       
                                    - {ingredient.originalName}
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </SectionPrim>
            <SectionSec>
                <div>   
                    {steps.map((step) => {
                        return(
                            <ul>
                                <li >       
                                    {step.step}
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </SectionSec>
            <Footer/>
        </Wrapper>
        ) :  <Spinner/>
    ) 
}

const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 0 auto;
    min-height: 110vh;
`

const SectionPrim = styled.div `
    min-height: 50vh;
    display: flex;
    justify-content: space-between;

`

const Header = styled.div`
    width: 35%;
    height: 30vh;
    background: 
    linear-gradient(to right bottom, white, #01161036),
    url(${props => props.image});
    background-size: cover;

    display: flex;
    flex-direction: column;
    color: #011610a4;

`
const HeaderInfo = styled.div`
    display: flex;
`

const Button = styled.button`
    &:hover:enabled {
        background: blue;
    }
    &:hover:disabled {
        background: red;
    }
`;

const SectionSec = styled.div `

`

export default Recipe



