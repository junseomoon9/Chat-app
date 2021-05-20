import React, {useContext} from 'react'
import {UsersContext} from '../context/UsersContext'
const Message = ({obj}) => {

    const {username} = useContext(UsersContext)
    if (obj.username === username) {
        return (
            <div className="message-blue">
                {obj.message}
            </div>
        )
    } else {
        return (
            <div className="message-red">
                {obj.message}
            </div>
        )
    }
    
}

export default Message
