import React from 'react'
import ChatSection from "./ChatSection"
import ChatSection1 from './ChatSection1'
import Conversations from "./Conversations"

const ChatMenu = ({socketRef}) => {
    return (
        <div className="chat-menu">
            <div className="chat-menu-container">
                <Conversations socketRef={socketRef}/>
                <ChatSection socketRef={socketRef}/>
            </div>
                
        </div>
    )
}

export default ChatMenu
