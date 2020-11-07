import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"

import pizza from "../.pics/pizza.jpg"
import hacker from "../.pics/hacker.jpg"

const Home = () => {

    return(
        <Wrapper>
            {/* <Img src={hacker} alt="hacker"/> */}
            <Header className="header"></Header>
            <ContainerWrapper>
                <PizzaContainer>
                    <ContainerLink to="/pizza">
                            Pizza
                    </ContainerLink>
                </PizzaContainer>
                <SandwichContainer>
                    <ContainerLink to="/sandwich">
                            Sandwich
                    </ContainerLink>
                </SandwichContainer>
                <RamenContainer>
                    <ContainerLink to="/ramen">
                            Ramen
                    </ContainerLink>
                </RamenContainer>
                <VeganContainer>
                    <ContainerLink to="/vegan">
                            Vegan
                    </ContainerLink>
                </VeganContainer>
            </ContainerWrapper>
        </Wrapper>)

};

// const Img = styled.img`
//   width: 100%;
//   height: 80vh;
//   margin-bottom: 9%;
//   /* clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); */
// `

const Header = styled.div`
align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95vh;
  background: 
    linear-gradient(to right bottom, white, #13664abd),
    url(${hacker});
  background-size: cover;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
  margin-bottom: 9%;
  position:relative;
  z-index: -1;
`

const Wrapper = styled.div`
    /* border: 5px solid red; */
    width: 95vw;
    margin: 0 auto;
`

const ContainerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 30vh;
`

const PizzaContainer = styled.div`
    background:url(${pizza});
    background-size:cover;
    background-position: center;
    color: white;
    flex:1;
`
const SandwichContainer = styled.div`
    background:url(${pizza});
    background-size:cover;
    background-position: center;
    color: white;
    flex:1;
`
const RamenContainer = styled.div`
    background:url(${pizza});
    background-size:cover;
    background-position: center;
    color: white;
    flex:1;
`
const VeganContainer = styled.div`
    background:url(${pizza});
    background-size:cover;
    background-position: center;
    color: white;
    flex:1;
`
const ContainerLink = styled(Link)`
    color: red;
`

export default Home