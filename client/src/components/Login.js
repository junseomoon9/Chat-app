import React, {useState, useEffect, useContext, useRef} from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {UsersContext} from '../context/UsersContext'
import {ConversationsContext} from '../context/ConversationsContext'
import ChatMenu from './ChatMenu'
import socketClient from "socket.io-client";
import {Link} from 'react-router-dom'

import axios from "axios"

const Login = () => {
    const SERVER = "http://127.0.0.1:3001"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successfulLogin, setSuccessfulLogin] = useState(false)
    const {users, setCurrentUser} = useContext(UsersContext)
    const {retrieveConversations, retrieveMessages} = useContext(ConversationsContext)
    const socketRef = useRef();
    


    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const login = (e) => {
        e.preventDefault()
        const credentials = {username: username, password: password}

        axios.post("http://localhost:3001/login", credentials)
        .then(res => {
            //localStorage.setItem('token', JSON.stringify(res.data.token))
            const user = {_id: res.data._id, name: res.data.name, username: res.data.username, email: res.data.email}
            setCurrentUser(user)
            socketRef.current = socketClient(SERVER);
            retrieveConversations(user)
            retrieveMessages()
            setSuccessfulLogin(true)
            console.log(res.data.name)
        }).catch(err => {
            
            console.log(err)
        })
        
    }

    if (successfulLogin){
        return (
            <ChatMenu socketRef={socketRef}/>
        )
    } else {
        return (
            
            <form onSubmit={login} className="login-container">
                <h1>Username</h1>
                <input onChange={handleUsernameChange} type="text"></input>
                <h1>Password</h1>
                <input onChange={handlePasswordChange} type="password"></input>
                <button onClick={login}>Login</button>
                <Link to="/signup"><p>Create an account</p></Link>
          
            </form>
            
        )
    }

    
}

export default Login
