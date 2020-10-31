import React from 'react'

const Pizza = () =>{

    const [loading,setLoading] = React.useState(true)
    const [recipe,setRecipe] = React.useState(null)

    const fetchRecipePizza = (q) => {
        fetch(`/recipe/${q}`).then(res => res.json()).then(json=>setRecipe(json.data.results)) 
        setLoading(false)
    }

    React.useEffect(()=>{
        console.log("Pizza component is loaded");
        fetchRecipePizza()
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
                    <a href={`/${item.id}`}>{item.title}</a>
                </h1>
                )
            })}
            <button onClick={(event)=>fetchRecipePizza()}> 
                Send Request
            </button>
        </div>
    ) : <h1>No recipe</h1>
    ) 
};
export default Pizza