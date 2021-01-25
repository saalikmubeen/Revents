import events from '../eventsData';

const eventsReducer = (state = events, action) => {
    switch (action.type) {
        case "CREATE_EVENT": 
            return [...state, action.payload.event]
        case "UPDATE_EVENT":
            return state.map((event) => event.id === action.payload.id ? action.payload.event : event)
        case "DELETE_EVENT":
            return state.filter((event) => event.id !== action.payload.id)
        default: 
            return state
    }
}


export { eventsReducer };