import React, {useState, useContext} from 'react'
import {UsersContext} from '../context/UsersContext'

const Signup = ({setIntroMenu}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signupNewUser} = useContext(UsersContext)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const signup = (e) => {
        e.preventDefault()
        const user = {username: username, password: password}
        signupNewUser(user)
    }
     
    return (
        <form onSubmit={signup} className="login-signup-container">
            <h1>Username</h1>
            <input onChange={handleUsernameChange} type="text"></input>
            <h1>Password</h1>
            <input onChange={handlePasswordChange} type="text"></input>
            <button onClick={signup}>Signup</button>
            <p onClick={() => setIntroMenu("Login")}>Login Page</p>
        </form>
    )
}

export default Signup
