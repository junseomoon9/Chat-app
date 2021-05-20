import React, {useState, useContext, useEffect, useRef} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import socketClient from "socket.io-client";
import Message from './Message'

const ChatSection1 = ({socketRef}) => {
    
    const {currentRecipient, conversations, addNewMessage} = useContext(ConversationsContext)
    const {username} = useContext(UsersContext)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const input = useRef();

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        conversations.forEach(el => {
            if (el.recipient === currentRecipient) {
                setMessages([...el.messages])
                
            }
        })

        socketRef.current.on('send-message', ({username, message}) => {
            
            const envelope = {recipient: username, container: {username: username, message: message}}
            addNewMessage(envelope)
            
            conversations.forEach(el => {
                if (el.recipient === currentRecipient) {
                    setMessages([...el.messages])
                    
                }
            })
            console.log("message receieved")
            
        })

        socketRef.current.on("endmessage", ({socketid}) => {
            console.log(socketid + "has disconnected")
            
        })
    }, [currentRecipient])

    const handleNewMessage = async (e) => {
        e.preventDefault()
        
        const envelope = {recipient: currentRecipient, container: {username: username, message: message}}
        //ADD NEW MESSAGE
        addNewMessage(envelope)
        await socketRef.current.emit("message", {username: username, message: message})
        console.log("yot")
        setMessage("")
        input.current.value = ""

        conversations.forEach(el => {
            if (el.recipient === currentRecipient) {
                setMessages([...el.messages])
            }
        })
    }

    return (
        <div className="chat-section">
            <div className="messages-container">
                {messages.map(obj => (
                    <Message obj={obj}/>
                ))}
            </div>
            
            <form onSubmit={handleNewMessage} className="message-input-container">
                <input ref={input} onChange={handleInputChange} className="message-input" placeholder="Enter Message Here..."></input>
                <button className="message-input-btn" onClick={handleNewMessage}>Send</button>
            </form>
            
        </div>
    )
}

export default ChatSection1
