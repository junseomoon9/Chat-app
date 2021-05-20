import React, {useState, useContext} from 'react'
import {ConversationsContext} from "../context/ConversationsContext"
import {FaTimes} from 'react-icons/fa'

const NewConversation = ({newConvoBtnClicked, handleNewConvoBtn}) => {

    const {createNewConversation, setCurrentRecipient} = useContext(ConversationsContext)

    const [recipientUsername, setRecipientUsername] = useState("")

    const handleUsernameChange = (e) => {
        setRecipientUsername(e.target.value)
    }

    const handleNewConversation = (e) => {
        e.preventDefault()
        const conversation = {recipient: recipientUsername, messages: []};
        createNewConversation(conversation)
    }

    return (
        (newConvoBtnClicked) ? (
        <div className="new-conversation">
            <div className="new-conversation-container">
                <FaTimes className="close-icon" onClick={handleNewConvoBtn}/>
                <form className="new-conversation-container-form" onSubmit={handleNewConversation}>
                    <h1>New Conversation</h1>
                    <div className="new-conversation-input">
                        <h2>Username:</h2>
                        <input type="text" onChange={handleUsernameChange}></input>
                    </div>
                    <button onClick={(e) => {handleNewConversation(e); handleNewConvoBtn(e); setCurrentRecipient(recipientUsername)}}>Create</button>
                </form>
            </div>
        </div>) : ""
    )
}

export default NewConversation
