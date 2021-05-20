import React, {useContext} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'

const Conversation = ({conversation, socketRef}) => {

    const {setCurrentRecipient} = useContext(ConversationsContext)

    // const connectToRoom = () => {
    //     socketRef.current.emit("join-room", null)
    // }

    return (
        <div className="conversation" onClick={() => {setCurrentRecipient(conversation.recipient); /*connectToRoom()*/}}>
            <h1>{conversation.recipient}</h1>
        </div>
    )
}

export default Conversation
