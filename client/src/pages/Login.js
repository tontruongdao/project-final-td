import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import { signin, signInWithGoogle } from "../helpers/auth";

import { theme } from "../../src/components/THEMES"

import Footer from "../components/Footer"

const Login = () =>{

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
            await signin(email, password);
          } catch (error) {
            setError(error.message)
          }
    }

    // Google Signin function
    const googleSignIn = async () => {
        setError(null)
        try {
            await signInWithGoogle();
          } catch (error) {
            setError(error.message)
          }
    }


    return(
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Text>Welcome back</Text>
          <div>
            <Input placeholder="Email" name="email" type="email" onChange={handleEmailChange} value={email}></Input>
          </div>
          <div>
            <Input placeholder="Password" name="password" onChange={handlePasswordChange} value={password} type="password"></Input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <Button type="submit">Login</Button>
            <div>Or</div>
            <Button onClick={googleSignIn} type="button">
            Sign up with Google
            </Button>
          </div>
          <hr></hr>
          <p>Create an account <StyledLink to="/signup">Signup</StyledLink></p>
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

const Text = styled.h1`
    color: ${theme.primaryLight};
    font-size: 2.0rem;
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
  margin-bottom: 2vh;
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

export default Login