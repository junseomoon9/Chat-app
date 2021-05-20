import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

const initialState = {
    currentRecipient: "",
    conversations: localStorage.getItem('conversations') ? JSON.parse(localStorage.getItem('conversations')) : []
}

export const ConversationsContext = createContext(initialState);


export const ConversationsProvider = props => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        localStorage.setItem('conversations', JSON.stringify(state.conversations))
    }, [state])

    function createNewConversation(conversation) {
        dispatch({type: "CREATE_NEW_CONVERSATION", payload: conversation})
    }

    function addNewMessage(message) {
        dispatch({type: "ADD_NEW_MESSAGE", payload: message})
    }
    
    function setCurrentRecipient(username) {
        dispatch({type: "SET_CURRENT_RECIPIENT", payload: username})
    }

    return (
        <ConversationsContext.Provider value={{conversations: state.conversations, currentRecipient: state.currentRecipient, createNewConversation, setCurrentRecipient, addNewMessage}}>
            {props.children}
        </ConversationsContext.Provider>
    )

}