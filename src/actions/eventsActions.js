import { toastr } from 'react-redux-toastr';

export const createEvent = (eventObj) => {
    return function (dispatch) {
        
        dispatch({ type: "CREATE_EVENT", payload: { event: eventObj } });
        
        toastr.success('Success!', 'Event has been created!');
    }
}

export const updateEvent = (eventId, eventObj) => {
    return function (dispatch) {
        dispatch({ type: "UPDATE_EVENT", payload: { id: eventId, event: eventObj } })
        
        toastr.success('Success!', 'Event has been updated!');
    }
}

export const deleteEvent = (eventId) => {
    return function (dispatch) {
        dispatch({ type: "DELETE_EVENT", payload: { id: eventId } })
        
        toastr.error("Deleted", 'Event has been deleted!');
    }
}


