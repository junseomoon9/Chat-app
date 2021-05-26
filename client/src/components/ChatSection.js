import React, {useState, useContext, useEffect, useRef} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import Message from './Message'
import axios from "axios"

const ChatSection = ({socketRef}) => {
    
    const {currentChatroom, conversations, addNewMessage} = useContext(ConversationsContext)
    const {currentUser} = useContext(UsersContext)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const input = useRef();

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const handleNewMessages = () => {
  
        const obj = conversations.find(el => el.number === currentChatroom)
        if (obj !== undefined){
            
            setMessages([...obj.messages])
        }
    }

    useEffect(() => {
        handleNewMessages()
    }, [currentChatroom, conversations])

    useEffect(() => {
        socketRef.current.on('receive-message', message => {
            
            addNewMessage(message)
        })
    }, [socketRef])

    const handleNewMessage =   (e) => {
        e.preventDefault()
        
        axios.post("http://localhost:3001/chat/newmessage", {chatroom: currentChatroom, author: currentUser._id, message_body: message})
        .then(res => {
            
            addNewMessage(res.data)
            
            handleNewMessages()
            setMessage("")
            input.current.value = ""

            socketRef.current.emit("send-message", res.data)
            
        }).catch(err => {
            console.log(err)
        })

           
        
    }

    return (
        <div className="chat-section">
            <div className="messages-container">
                {messages.map(message => (
                    <Message message={message}/>
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
