import React from 'react'
import {signout} from '../helpers/auth'

const MyRecipes = () =>{
    return(<div><h1>My Recipes</h1><button onClick={signout}>Signout</button></div>)
}

export default MyRecipes