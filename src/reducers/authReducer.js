
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "AUTH_REQUEST":
            return { loading: true }
        case "AUTH_SUCCESSFUL":
            return { loading: false }
        case "AUTH_ERROR":
            return { ...state,  error: action.payload.error, loading: false}
        default:
            return state
    }
}


export default authReducer;