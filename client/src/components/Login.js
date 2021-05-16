import React, {useState, useContext} from 'react'
import {UsersContext} from '../context/UsersContext'
import ChatMenu from './ChatMenu'
const Login = ({setIntroMenu}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successfulLogin, setSuccessfulLogin] = useState(false)
    const {users} = useContext(UsersContext)

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
                    console.log("Successful Login")
                }
            }
        })
        
    }

    if (successfulLogin){
        return (
            <ChatMenu/>
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
