import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {signup} from '../helpers/auth'

import { theme } from "../../src/components/THEMES"

import Footer from "../components/Footer"

const Signup = () =>{

    const [email,setEmail]=React.useState("")
    const [error,setError]=React.useState(null)
    const [password,setPassword]=React.useState("")

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault() // Create a custom request on form
        setError(null)

        // This creates a new user.
        try {
            await signup(email, password);
          } catch (error) {
            setError(error.message)
          }
    }

    return(
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <HeaderText>Sign Up</HeaderText>
          <Text>Fill in the form below to create an account.</Text>
          <div>
            <Input placeholder="Email" name="email" type="email" onChange={handleEmailChange} value={email}></Input>
          </div>
          <div>
            <Input placeholder="Password" name="password" onChange={handlePasswordChange} value={password} type="password"></Input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <Button type="submit">Sign up</Button>
          </div>
          <p>Already have an account? <StyledLink to="/login">Login</StyledLink></p>
        </Form>
      <Footer/>
      </Wrapper>)
}

const Wrapper = styled.div`
    /* border: 5px solid red; */
    color: #032b21;
    width: 95vw;
    margin: 0 auto;
    height: 110vh;
`

const Form = styled.form`
  margin: 10vh auto;
  width: 25vw;
  height: 65vh;
  /* border: solid red 1px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 1rem 1rem ${theme.primaryLight};
`

const HeaderText = styled.h1`
    color: ${theme.primaryLight};
    font-size: 2.0rem;
    margin-bottom: 5vh;
`

const Text = styled.div`
  margin-bottom: 3vh;
`

const Input = styled.input`
  border: solid #9ca3a12d 1px;
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding: 2vh 3vw;
  font-size: 1.0rem;
  letter-spacing: 1px;
  border-radius: 5px;
  text-align:center;
`

const Button = styled.button`
  width: 18vw;
  border: solid #9ca3a12d 1px;
  margin-top: 2vh;
  margin-bottom: 5vh;
  padding: 2vh 3vw;
  font-size: 1.0rem;
  letter-spacing: 1px;
  border-radius: 5px;
  text-align:center;
  transition: 0.5s ease-in;

  :hover{
    background: ${theme.primaryLight};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #032b21;

  :hover{
    color: gray;
  }
`

export default Signup