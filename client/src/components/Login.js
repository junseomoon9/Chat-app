import React, {useState, useEffect, useContext, useRef} from 'react'
import {UsersContext} from '../context/UsersContext'
import ChatMenu from './ChatMenu'
import socketClient from "socket.io-client";

const Login = ({setIntroMenu}) => {
    const SERVER = "http://127.0.0.1:3001"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successfulLogin, setSuccessfulLogin] = useState(false)
    const {users, setCurrentUsername} = useContext(UsersContext)
    const socketRef = useRef();


    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const login = (e) => {
        e.preventDefault()
        const user = {username: username, password: password}
        users.forEach(obj => {
            if (obj.username === user.username) {
                if (obj.password == user.password) {
                    setSuccessfulLogin(true)
                    setCurrentUsername(user.username)
                    socketRef.current = socketClient(SERVER);
                    console.log("Successful Login")
                }
            }
        })
        
    }

    if (successfulLogin){
        return (
            <ChatMenu socketRef={socketRef}/>
        )
    } else {
        return (
            <form onSubmit={login} className="login-signup-container">
                <h1>Username</h1>
                <input onChange={handleUsernameChange} type="text"></input>
                <h1>Password</h1>
                <input onChange={handlePasswordChange} type="text"></input>
                <button onClick={login}>Login</button>
                <p onClick={ () => setIntroMenu("Signup")}>Create an account</p>
            </form>
        )
    }

    
}

export default Login
