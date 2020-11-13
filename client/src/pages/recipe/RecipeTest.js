import React from 'react'
import styled, { keyframes } from 'styled-components'

import { theme }  from "../../components/THEMES"
import Footer from "../../components/Footer"

import {test, steps} from './test'



const RecipeTest = () =>{
    
    console.log(`test is: ${test.instructions}`)

    return(
        <Wrapper>
            <SectionPrim>
                <Header>
                    <HeaderInfo>
                        <div>Cooking Time: {test.readyInMinutes}</div>
                        <div>Health Score: {test.healthScore}</div>
                    </HeaderInfo>
                    <div>
                        <button>Add</button>
                    </div>
                </Header>
                <div>
                    <h1>{test.title}</h1>
                    {test.extendedIngredients.map((ingredient) => {
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
    url(${test.image});
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

export default RecipeTest