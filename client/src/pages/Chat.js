import React from 'react'
import {signout} from '../helpers/auth'

const Chat = () =>{
    return(<div><h1>Chat</h1><button onClick={signout}>Signout</button></div>)
}

export default Chat