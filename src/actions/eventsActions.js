import { toastr } from 'react-redux-toastr';
// import database from '../firebase/firebaseConfig';

export const createEvent = (eventObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();
        
        await firebase.ref('events').push({ ...eventObj })


        dispatch({ type: "CREATE_EVENT", payload: { event: eventObj } });
        
        toastr.success('Success!', 'Event has been created!');
    }
}

export const updateEvent = (eventId, eventObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();

        await firebase.ref(`events/${eventId}`).update({ ...eventObj })

        dispatch({ type: "UPDATE_EVENT", payload: { id: eventId, event: eventObj } });
        
        toastr.success('Success!', 'Event has been updated!');
    }
}

export const deleteEvent = (eventId) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();

        await firebase.ref(`events/${eventId}`).remove();

        dispatch({ type: "DELETE_EVENT", payload: { id: eventId } })
        
        toastr.error("Deleted", 'Event has been deleted!');
    }
}


export const fetchEvents = () => {
    return async function (dispatch, getState, { getFirebase }) {
        
        const firebase = getFirebase();

        console.log(firebase)

        
        const snapshot = await firebase.ref('events').once('value');
        
        const events = [];

        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.key)
            events.push({
                ...childSnapshot.val(),
                id: childSnapshot.key,
            })
        })

        dispatch({ type: "FETCH_EVENTS", payload: { events: events } });
    }
}
