// import events from '../eventsData';

const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_EVENTS":
            return [...action.payload.events]
        case "CREATE_EVENT": 
            return [...state, action.payload.event]
        case "UPDATE_EVENT":
            return state.map((event) => event.id === action.payload.id ? { ...event, ...action.payload.event } : event)
        case "DELETE_EVENT":
            return state.filter((event) => event.id !== action.payload.id)
        default: 
            return state
    }
}


export { eventsReducer };