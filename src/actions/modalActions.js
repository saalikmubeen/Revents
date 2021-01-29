export const openModal = (modalType) => {
    return {
        type: "OPEN_MODAL",
        payload: {
            modalType: modalType
        }
    }
}

export const closeModal = () => {
    return {
        type: "CLOSE_MODAL"
    }
}