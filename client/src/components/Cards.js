import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { theme }  from "./THEMES"

import pizzaImage from "../.pics/pizza.jpg"

const Card = (props) => {
    return(
        <Container>
            <Header image={props.image}>
                <h1> 
                    <span>
                    {props.text1}
                    </span>
                </h1>
            </Header>
  
            <Text>
                <ul>
                    <li>{props.text2}</li>
                    <li>{props.text3}</li>
                    <li>{props.text4}</li>
                    <li>{props.text5}</li>
                </ul>
            </Text>
            <ContainerLink to={props.link}>                
                <img src={props.logo} alt="logo"/>
            </ContainerLink>
        </Container>
    )
}

const Container = styled.div`
    text-align:center;
    background-color: #d3d2d270;
    min-width: 17vw;
    margin: 5vh 13vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    padding-right: 2vw;
    padding-left: 2vw;
    border-radius: 5px;
    box-shadow: 0 1.5rem 4rem gray;
    flex:1;
    position: relative;
    z-index: 1;

    transition: all 1s;

    &:hover {
        background-color: #14a87754;
        opacity:0.75;
    }
`
const Header = styled.div`
  width: 100%;
  height: 15vh;
  background: 
    linear-gradient(to right bottom, white, #7e7b7b25),
    url(${props =>props.image});
  background-size: cover;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
  position: relative;
  z-index: -1;

  & h1 {
    position:absolute;
    color: white;
    text-transform: uppercase;
    text-align: right;
    padding-top: 14%;
    top: 35%;
    right: 1vw;
    
    
    & span {
        background: ${theme.primaryLight};
        font-size: 1.5rem;
    }
}

`

const Text = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    color:gray;
    padding-bottom: 5vh;

    & ul {
        list-style: none;
        width: 75%;
        margin: 0 auto;
        padding-top:5vh;
        & li {
            
            font-size: 1.0rem;
            padding: 0.5rem;

            &:not(:last-child){
                border-bottom: 1px solid ${theme.primaryLight};
            }
        }

    }

`

const ContainerLink = styled(Link)`
    margin-top: 5vh;
`

export default Card

