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
        db.ref(`users/${userID}/MyRecipes`).push(recipeObj);
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
    },[])

    // console.log(singleRecipe)

    if(loading){
        return <h1>Loading...</h1>
    }

    return ( recipeTitle && singleRecipe && steps ? (

        <Wrapper >
            <div>
                {recipeTitle}
                <div>{singleRecipe.id}</div>
                <button onClick={() => addRecipe(recipeTitle, recipeId)}>Add this Recipe</button>                
            </div>
            <SectionPrim>
                <Header image={singleRecipe.image}>
                    <HeaderInfo>
                        <div>Cooking Time: {singleRecipe.readyInMinutes}</div>
                        <div>Health Score: {singleRecipe.healthScore}</div>
                    </HeaderInfo>
                    <div>
                        <button>Add</button>
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


const SectionSec = styled.div `

`

export default Recipe



