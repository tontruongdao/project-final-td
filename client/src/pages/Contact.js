import React from 'react'
import styled from 'styled-components'

import Footer from "../components/Footer"
import construction2 from "../../src/.pics/construction2.jpg"

const Contact = () =>{
    return(
        <Wrapper>
            <Header>
                Under Construction
            </Header>
            <Footer/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 0 auto;
`

const Header = styled.div`
    height: 90vh;
    background: url(${construction2});
    background-size: cover;
    color: white;
    width: 95vw;

    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    text-transform: uppercase;
    letter-spacing: 5px;
`

export default Contact