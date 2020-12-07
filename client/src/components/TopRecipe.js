import React from "react";
import styled from "styled-components"
import {db} from "../services/firebase";

const TopRecipe = () => {

    const [rankedItems, setRankedItems] =React.useState(null);

    function getTopRecipe() {
        try {
            db.ref("users").on("value", snapshot => {
                let recipes =[];
                let recipesObj = [];
                const data = snapshot.val();
                // console.log("This is my users data:",data)
                snapshot.forEach(snap =>{
                    // console.log(snap.val())
                    const userRecipes = Object.values(snap.val().MyRecipes);

                    userRecipes.forEach(recipe => recipes.push(recipe.recipeName));
                    userRecipes.forEach(recipe => recipesObj.push(recipe));
                    // userRecipes.forEach(recipe => recipesObj.push(recipe));
                    // console.log((userRecipes));
                })
                // here you want to rebuild recipes
                // console.log("All liked recipes:", recipes);

                let count = recipes.reduce((obj,val) =>{
                    obj[val] = (obj[val] || 0) + 1;
                    return obj;
                },{})

                // console.log("count", count)

                let sorted = Object.keys(count).sort((a,b)=> {
                    return count[b]-count[a];
                })
                // console.log("ranked ids", recipesObj);

                
                setRankedItems(sorted)
                // console.log("this is sorted array",sorted);
            })
        } catch(error) {
            throw error
        }
    }

    React.useEffect(()=> {
        getTopRecipe();
    },[])

    return(<ol>
        {rankedItems && rankedItems.map(item => {
            return <Rank>{item}</Rank>
        })}
    </ol>)
}

const Rank = styled.li`
    list-style-type: decimal;
`;

export default TopRecipe;