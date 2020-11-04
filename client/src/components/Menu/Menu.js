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
        {!authenticated && <Link to="/login" onClick={()=> setOpen(false)}>
          Login</Link>}

        <Link to="/about" onClick={()=> setOpen(false)}>
          About Us
          </Link>
        <Link to="/contact" onClick={()=> setOpen(false)}>
          Contact
          </Link>
        {authenticated && <button onClick={()=> {
          setOpen(false)
          signout();
          }}>Sign Out</button>}
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
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

export default Menu;