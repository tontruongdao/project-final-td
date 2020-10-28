import React from 'react'

const Home = () =>{

    const [loading,setLoading] = React.useState(true)
    const [recipe,setRecipe] = React.useState(null)

    const fetchRecipePizza = () => {
        fetch("/recipe/pizza").then(res => res.json()).then(json=>setRecipe(json.data.hits)) 
        setLoading(false)
    }

    React.useEffect(()=>{
        console.log("Home component is loaded");
        fetchRecipePizza()
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }

    // Used conditionnal rendering.
    return( recipe ? (

        <div>
            {recipe.map(item => {
                return(
                <h1>{item.recipe.label}</h1>
                )
            })}
            <button onClick={(event)=>fetchRecipePizza()}> 
                Send Request
            </button>
        </div>
    ) : <h1>No recipe</h1>
    ) 
};
export default Home