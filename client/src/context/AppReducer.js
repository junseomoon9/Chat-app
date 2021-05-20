export default (state, action) => {
    switch (action.type) {
      case "SIGNUP_NEW_USER":
          return {
              ...state, 
              users: [action.payload, ...state.users]
          }
      case "SET_CURRENT_USERNAME":
          return {
              ...state,
              currentusername: action.payload
          }
      case "SET_CURRENT_RECIPIENT":
          return {
              ...state,
              currentRecipient: action.payload
          }
      case "CREATE_NEW_CONVERSATION":
          return {
              ...state,
              conversations: [action.payload, ...state.conversations]
          }
      case "ADD_NEW_MESSAGE":
          return {
            ...state,
            conversations: state.conversations.map(conversation => {
                if (conversation.recipient !== action.payload.recipient){
                    return conversation
                } else {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, action.payload.container]
                    }
                }
            })
          }
      default:
          return state
    }
}