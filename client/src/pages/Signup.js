import React from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../helpers/auth'

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

    return(<div>
        <form onSubmit={handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/"> Chef Hacker</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={handleEmailChange} value={email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={handlePasswordChange} value={password} type="password"></input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <button type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>)
}

export default Signup