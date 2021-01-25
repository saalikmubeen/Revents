
export const createEvent = (eventObj) => {
    return {
        type: "CREATE_EVENT",
        payload: { event: eventObj }
    }
}

export const updateEvent = (eventId, eventObj) => {
    return {
        type: "UPDATE_EVENT",
        payload: { id: eventId, event: eventObj }
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: "DELETE_EVENT",
        payload: { id: eventId }
    }
}


