import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {AuthContext} from "../AuthContext";
import {signout} from "../../helpers/auth";
import { bool } from 'prop-types';


const Menu = ({open, setOpen}) => {
  const {authenticated} = React.useContext(AuthContext);
    return (
      <StyledMenu open={open}>
        <Link to="/" onClick={()=> setOpen(false)}>
          Home
        </Link>
        {authenticated && <Link to="/my-recipes" onClick={()=> setOpen(false)}>
          My Recipes
        </Link>}
        {!authenticated && <Link to="/login" onClick={()=> setOpen(false)}>
          Login</Link>}
        <Link to="/about" onClick={()=> setOpen(false)}>
          About Us
          </Link>
        <Link to="/contact" onClick={()=> setOpen(false)}>
          Contact
          </Link>
        {authenticated && <LogoutButton onClick={()=> {
          setOpen(false)
          signout();
          }}>Sign Out</LogoutButton>}
      </StyledMenu>
    )
  }

  Menu.propTypes = {
    open: bool.isRequired,
  }

////////////////////////////////// 
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 10;
  border: solid green 1px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: lightgrey;
    }
  }
`;

const LogoutButton = styled.button`
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    background: transparent;
    border: none;
    text-align: left;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;}
    &:hover {
      color: lightgrey;
    }
`

export default Menu;