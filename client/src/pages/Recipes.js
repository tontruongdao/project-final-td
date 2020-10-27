import React from 'react'
import {signout} from '../helpers/auth'

const Recipes = () =>{
    return(<div><h1>Recipes</h1><button onClick={signout}>Signout</button></div>)
}

export default Recipes