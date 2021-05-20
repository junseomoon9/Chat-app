import React, {useState, useContext} from 'react'
import NewConversation from './NewConversation'
import {ConversationsContext} from '../context/ConversationsContext'
import Conversation from './Conversation'

const Conversations = ({socketRef}) => {

    const [newConvoBtnClicked, setNewConvoBtnClicked] = useState(false)

    const handleNewConvoBtn = (e) => {
        e.preventDefault()
        setNewConvoBtnClicked(!newConvoBtnClicked)
    }

    

    const {conversations} = useContext(ConversationsContext)

    return (
        <div className="conversations">
            <div className="conversations-header">
                <h1>Junseo Moon</h1>
                <button onClick={handleNewConvoBtn}>New Convo</button>
            </div>
            <NewConversation newConvoBtnClicked={newConvoBtnClicked} handleNewConvoBtn={handleNewConvoBtn}/>
            {conversations.map(conversation => (
                <Conversation conversation={conversation} socketRef={socketRef}/>
            ))}
        </div>
    )
}

export default Conversations
