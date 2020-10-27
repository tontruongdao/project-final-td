import React from 'react'
import {Link} from 'react-router-dom'
import { signin, signInWithGoogle } from "../helpers/auth";

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


    return(<div>
        <form onSubmit={handleSubmit}>
          <h1>
            Login to
          <Link to="/"> Chef Hacker</Link>
          </h1>
          <p>Fill in the form below to login to your account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={handleEmailChange} value={email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={handlePasswordChange} value={password} type="password"></input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <button type="submit">Login</button>
            <p>Or</p>
            <button onClick={googleSignIn} type="button">
            Sign up with Google
            </button>
          </div>
          <hr></hr>
          <p>Create an account <Link to="/signup">Signup</Link></p>
        </form>

      </div>)
}

export default Login