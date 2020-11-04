import React from 'react'
import {Link} from 'react-router-dom'

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
        console.log("Recipes component is loaded");
        
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
        <div>
            {recipe.map(item => {
                return(
                <h1>
                    <Link to={`recipe/${item.id}`}>{item.title}</Link>
                </h1>
                )
            })}
        </div>
    ) : <h1>No recipe</h1>
    ) 
};
export default Recipes