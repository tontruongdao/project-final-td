import React from 'react'
import {db} from "../../services/firebase";
import {AuthContext} from "../../components/AuthContext";

const Recipe = () => {  
    const {userID} = React.useContext(AuthContext);
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
        db.ref(`users/${userID}/MyRecipes`).push(recipeObj);
    }

    React.useEffect(()=>{
        console.log("Recipe component is loaded");
        
    const url = window.location.pathname.split("/");
    // const recipeName = url[url.length-2];
    const id = url[url.length-1];
    console.log(url, id)
    // console.log(recipeName);
    setRecipeId(id)
    fetchRecipe(id)
    },[])

    console.log(singleRecipe)

    if(loading){
        return <h1>Loading...</h1>
    }

    return ( recipeTitle ? (
        <div>
            {recipeTitle}
            <button onClick={() => addRecipe(recipeTitle, recipeId)}>Add this Recipe</button>
        </div>
        ) : <h1>No recipe</h1>
    ) 
}

export default Recipe



// const Recipe = () => {

    // const [name, setName] = React.useState(null);

    // function addTest(){
    //     // creates new random endpoint containing your new object
    //     // db.ref("myRecipes").push({Test: "Test"})

    //     // Creates a custom endpoint for a new object collection
    //     // myRecipes/Truong
    //     // db.ref("myRecipes").child("Truong").set({Name: "Truong"});
    //     db.ref("myRecipes/Do").set({Name: "Do"});

    // }

    // function removeTest(){

    //     // remove an entire object endpoint
    //     db.ref("myRecipes").child("Bao").remove();

    // }

    // function updateTest(){

    //     // remove an entire object endpoint
    //     db.ref("myRecipes").child("Bao").update({Name: "Baotran"});

    // }
    
    // function readTest(){
    //     //
    //     db.ref("myRecipes").child("Truong").once("value", snapshot => {
    //         //
    //         const data = snapshot.val();
    //         //
    //         setName(data.Name);
    //         console.log("My data is:", data);
    //     })
    // }

    // React.useEffect(()=>{
    //     console.log("Single recipe component is loaded");
        // readTest();
    // },[])
    // Used turnery operator for logic.
    // return( <div>
        {/* <h1>This is a single Recipe</h1> */}
        {/* {name && <h1>Hi! I'm {name}</h1>} */}
        {/* <button onClick={(ev)=>addTest()}>Add Test</button>
        <button onClick={(ev)=>removeTest()}>Remove Test</button>
        <button onClick={(ev)=>updateTest()()}>Update Test</button> */}
        {/* <button onClick={(ev)=>readTest()}>Read Test</button>
        </div>); */}
// };
// export default Recipe;