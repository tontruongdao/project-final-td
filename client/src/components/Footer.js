import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

import mainLogo from "../.pics/chefHacker.png"

const Footer = () => {
  return (
    <Wrapper>
      <TopRow>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/careers">Careers</StyledLink>
        <StyledLink to="/about">About Us</StyledLink>
      </TopRow>
      <BottomRow>
        <Image src={mainLogo} alt="Logo" />
        <span>@ 2020 Chef Hacker All Rights Reserved</span>
      </BottomRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #d3d2d270;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 15vh;
  /* position: absolute; */
  width: 100%;
  color: #0a4431bd;
  margin-top: 5vh;

  padding-top: 3vh;
  padding-right: 10vw;
  padding-left: 10vw;

  @media (max-width: 1200px) {
    margin-top: 15px;
    margin-right: 10px;
    margin-left: 10px;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-flow: column wrap;
    /* background-color: pink; */
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const TopRow = styled.div`
  & a {
    padding: 0 10px;
    text-decoration: none;
    color: #0a4431bd;
    }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #0a4431bd

  & span {
    margin-top: 6px;
    color: #0a4431bd;
  }
`;

const Image = styled.img`
  margin-right: 20px;
  width: 50px;
`;

const StyledLink = styled(Link)`
  opacity: 0.70;
  letter-spacing: 2px;
  font-weight: bold;
  transition: 0.5s ease-in;
  text-decoration: none;

  :hover{
    opacity:1;
    text-decoration: none;
  }

`

export default Footer;