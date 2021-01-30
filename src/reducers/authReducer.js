import { auth } from "firebase"

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER":
            return { ...state, currentUser: action.payload.user }
        case "LOGIN":
            return { ...state, currentUser: action.payload.user }
        case "LOGOUT":
            return {}
        default:
            return state
    }
}


export default authReducer;