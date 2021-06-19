// import React, { useContext, useReducer } from 'react'

// // Types 
// interface UserAuthState {
//     user: null | object
// }

// interface ContextProviderProps {
//     reducer: () => object | boolean,
//     initialState: UserAuthState,
//     children: React.FunctionComponent
// }

// // TODO reducer сделать серез mobx
// const initialState: UserAuthState = {
//     user: null
// }

// const actionType = {
//     SET_USER: 'SET_USER'
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case actionType.SET_USER:
//             return {
//                 ...state,
//                 user: action.user
//             }
//         default: return false
//     }
// }

// // Provider
// const AuthContext = React.createContext<object>({})

// export function AuthContextProvider({ reducer, initialState, children }: ContextProviderProps) {
//     return (
//         <AuthContext.Provider value={useReducer(reducer, initialState)}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// const useAuthContext = (): object => useContext(AuthContext)