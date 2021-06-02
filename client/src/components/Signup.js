import React, {useState, useContext} from 'react'
import {UsersContext} from '../context/UsersContext'
import {Link, Redirect} from 'react-router-dom'
import axios from "axios"

import signupimage from '../images/5267.jpg'

const Signup = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signedup, setSignedup] = useState(false)
    //const {signupNewUser} = useContext(UsersContext)

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const signup = (e) => {
        e.preventDefault()
        const user = {name: name, username: username, email: email, password: password}
        axios.post("http://localhost:3001/signup", user)
        .then(res => {
            setSignedup(true)
        }).catch(err => {
            console.log(err.response)
        })
        //signupNewUser(user)
    }
     
    return ( (!signedup) ? (
        <div className="intro-menu">
            <div className="container-s">
                <div className="signup-image-container">
                    <img className="signup-image" src={signupimage} alt="" />
                </div>

                <div className="signup-container-container">
                    <div className="title-signup-container">
                        <h2>Signup</h2>
                    </div>
                    <form onSubmit={signup} className="signup-container">
                        <h1>Name</h1>
                        <input onChange={handleNameChange} type="text"></input>
                        <h1>Username</h1>
                        <input onChange={handleUsernameChange} type="text"></input>
                        <h1>Email</h1>
                        <input onChange={handleEmailChange} type="text"></input>
                        <h1>Password</h1>
                        <input onChange={handlePasswordChange} type="password"></input>
                        <button onClick={signup}>Signup</button>
                        <Link to="/login"><p >Login Page</p></Link>
                    </form>
                </div>
                
            </div>
             
        </div>
        
        ) : (<Redirect from="/signup" to="/login" />)
    )
}

export default Signup
