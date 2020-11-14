import React, {useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {db} from "../../services/firebase";
import {AuthContext} from "../../components/AuthContext";
import { theme }  from "../../components/THEMES"
import Footer from "../../components/Footer"

import {test, steps} from './test'



const RecipeTest = () =>{

    const {userID, setRecipeCount} = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true)
    const [hasRecipe, setHasRecipe] = React.useState(null);

    const [recipeList, setRecipeList] = useState(null);

    function addRecipe(recipeName, numberID){
        const id = numberID.toString();
        const recipeObj = {recipeName, id}
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
        console.log("HERE!")
        db.ref(`/users/${userID}/MyRecipes`).on("value", snapshot => {
            const data = snapshot.val();
            console.log("DATA",data);
            if(data){
                const recipes = Object.keys(data);
                console.log("test id", test.id)
                if(recipes.includes(test.id.toString())) {
                    console.log("This recipe is already addded!");
                    setHasRecipe(true);
                } else {
                    console.log("You can add this recipe!")
                    setHasRecipe(false);
                }
                console.log("All The Recipes:", recipes);
            }
        })
    },[userID])

    return(
        <Wrapper>
            <SectionPrim>
                <Header>
                    <HeaderInfo>
                        <div>Cooking Time: {test.readyInMinutes}</div>
                        <div>Health Score: {test.healthScore}</div>
                    </HeaderInfo>
                    <div>
                        {/* {!hasRecipe && <button onClick={() => addRecipe(test.title, test.id)} >Add</button> }
                        <button onClick={() => readRecipe()}>Read</button>
                        {hasRecipe && <button onClick={() => removeRecipe(test.id)}>Remove</button> } */}
                        <Button disabled={hasRecipe} onClick={() => addRecipe(test.title, test.id)} >Add</Button>
                        <Button onClick={() => readRecipe()}>Read</Button>
                        <Button disabled={!hasRecipe} onClick={() => removeRecipe(test.id)}>Remove</Button>
                    </div>
                </Header>
                <div>
                    <h1>{test.title}</h1>
                    {test.extendedIngredients.map((ingredient) => {
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
        )
}

const Button = styled.button`
    &:hover:enabled {
        background: blue;
    }
    &:hover:disabled {
        background: red;
    }
`;

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
    url(${test.image});
    background-size: cover;

    display: flex;
    flex-direction: column;
    color: #011610a4;

`
const HeaderInfo = styled.div`
    display: flex;
`


const SectionSec = styled.div `

`

export default RecipeTest