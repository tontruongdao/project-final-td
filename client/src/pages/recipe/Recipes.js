import React from 'react'

const Recipes = () =>{

    const [loading,setLoading] = React.useState(true)
    const [recipe,setRecipe] = React.useState(null)
    const [recipeCategory, setRecipeCategory] = React.useState(null)

    const fetchRecipe = (q) => {
        fetch(`/recipe/${q}`).then(res => res.json()).then(json=>setRecipe(json.data.results)) 
        setLoading(false)
    }

    React.useEffect(()=>{
        console.log("Recipes component is loaded");
        
    const url = window.location.pathname.split("/");
    const recipeName = url[url.length-1];
    setRecipeCategory(recipeName);
    // console.log(recipeName);
        fetchRecipe(recipeName)
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }

    // Used turnery operator for logic.
    return( recipe ? (

        <div>
            {recipe.map(item => {
                return(
                <h1>
                    <a href={`/recipe/${recipeCategory}/${item.id}`}>{item.title}</a>
                </h1>
                )
            })}
            <button onClick={(event)=>fetchRecipe()}> 
                Send Request
            </button>
        </div>
    ) : <h1>No recipe</h1>
    ) 
};
export default Recipes