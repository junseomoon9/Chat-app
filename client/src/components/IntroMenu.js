import React, {useState} from 'react'
import Login from './Login'
import Signup from './Signup'


const IntroMenu = () => {

    const [IntroMenu, setIntroMenu] = useState("Login")


    if (IntroMenu === "Login") {
        return (
            <div className="intro-menu"> 
                <Login setIntroMenu={setIntroMenu}/>
            </div>
        )
    } else if (IntroMenu === "Signup"){
        return (
            <div className="intro-menu"> 
                <Signup setIntroMenu={setIntroMenu}/>
            </div>
        )
    }
    
}

export default IntroMenu
