import React, {useState, useContext, useEffect, useRef} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import socketClient from "socket.io-client";
import Message from './Message'

const ChatSection = ({socketRef}) => {
    
    const {currentRecipient, conversations, addNewMessage} = useContext(ConversationsContext)
    const {currentusername} = useContext(UsersContext)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const input = useRef();

    const handleInputChange = (e) => {
        setMessage(e.target.value)
        
    }

    const handleNewMessages = () => {
        const obj = conversations.find(el => el.recipient === currentRecipient)
        if (obj !== undefined){
            setMessages([...obj.messages])
        }
        console.log(currentRecipient)
    }

    useEffect(() => {
        handleNewMessages()
    }, [currentRecipient, conversations])

    useEffect(() => {
        socketRef.current.on('receive-message', ({username, message}) => {
            
            const envelope = {recipient: username, container: {username: username, message: message}}
            addNewMessage(envelope)
            
        })

        
    }, [socketRef])

    const handleNewMessage =   (e) => {
        e.preventDefault()
        
        const envelope = {recipient: currentRecipient, container: {username: currentusername, message: message}}
        //ADD NEW MESSAGE
        addNewMessage(envelope)
        handleNewMessages()
        socketRef.current.emit("send-message", {username: currentusername, message: message})
        
        setMessage("")
        input.current.value = ""
        
    }

    return (
        <div className="chat-section">
            <div className="messages-container">
                {messages.map(obj => (
                    <Message obj={obj}/>
                ))}
            </div>
            
            <form onSubmit={(e)=>handleNewMessage(e)} className="message-input-container">
                <input ref={input} onChange={handleInputChange} className="message-input" placeholder="Enter Message Here..."></input>
                <button className="message-input-btn" onClick={(e)=>handleNewMessage(e)}>Send</button>
            </form>
            
        </div>
    )
}

export default ChatSection
