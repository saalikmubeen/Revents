

const modalReducer = (state = null, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { modalType: action.payload.modalType }
        case "CLOSE_MODAL":
            return null
        default:
            return state;
    }
}

export default modalReducer;