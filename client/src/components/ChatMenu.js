import React from 'react'
import ChatSection from "./ChatSection"
import Conversations from "./Conversations"

const ChatMenu = () => {
    return (
        <div className="chat-menu">
            <div className="chat-menu-container">
                <Conversations/>
                <ChatSection/>
            </div>
                
        </div>
    )
}

export default ChatMenu
