import React from 'react'
import {db} from "../../services/firebase";
import {AuthContext} from "../../components/AuthContext";

import Spinner from "../../components/Spinner"



const Recipe = () => {  
    const {userID, setRecipeCount} = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true)
    const [singleRecipe, setSingleRecipe] = React.useState(null)
    const [recipeTitle, setRecipeTitle] = React.useState(null)
    const [recipeId, setRecipeId] = React.useState(null)

    const fetchRecipe = (q) => {
        fetch(`/recipe/${q}`).then(res => res.json()).then(json=>{
            console.log("[SINGLE RECIPE]", json);
            setRecipeTitle(json.data.title)
            setSingleRecipe(json.data);
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

    const test = {"object": "keys" }

    console.log(test);

    if(loading){
        return <h1>Loading...</h1>
    }

    return ( recipeTitle ? (
        <div>
            {recipeTitle}
            <button onClick={() => addRecipe(recipeTitle, recipeId)}>Add this Recipe</button>
        </div>
        ) : <div>Test</div>
        // <Spinner/>
    ) 
}

export default Recipe



