import React, {useContext} from 'react'
import {UsersContext} from '../context/UsersContext'
const Message = ({message}) => {

    const {currentUser} = useContext(UsersContext)

    

    if (message.author === currentUser._id) {
        return (
            <div className="message-container-blue">
                <div className="message-blue">
                    <h1>{message.message_body}</h1>
                </div>
            </div>
            
        )
    } else {
        return (
            <div className="message-container-red">
                <div className="message-red">
                    <h1>{message.message_body}</h1>
                </div>
            </div>
            
        )
    }
    
}

export default Message
