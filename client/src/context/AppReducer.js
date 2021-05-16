export default (state, action) => {
    switch (action.type) {
      case "SIGNUP_NEW_USER":
          return {
              ...state, 
              users: [action.payload, ...state.users]
          }
      default:
          return state
    }
}