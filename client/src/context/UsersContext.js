import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'
const initialState = {
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
}

export const UsersContext = createContext(initialState);

export const UsersProvider = props => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(state.users))
    }, [state])

    // actions
    const signupNewUser = user => {
        dispatch({type: "SIGNUP_NEW_USER", payload: user})
    }

    return (
        <UsersContext.Provider value={{users: state.users, signupNewUser}}>
            {props.children}
        </UsersContext.Provider>
    )
}