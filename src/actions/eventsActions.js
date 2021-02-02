import { toastr } from 'react-redux-toastr';


export const createEvent = (eventObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser

        const newEvent = {
            ...eventObj,
            hostUid: user.uid,
            hostedBy: user.displayName,
            hostPhotoURL: user.photoURL || null,
        }
        
        const docRef = await firebase.ref('events').push({ ...newEvent });

        await firebase.ref(`events/${docRef.key}/attendees/${user.uid}`).set({
            attendeeId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null,
            going: true, 
            host: true,
            joinDate: Date.now()
        })
        
        toastr.success('Success!', 'Event has been created!');
    }
}



export const updateEvent = (eventId, eventObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();

        await firebase.ref(`events/${eventId}`).update({ ...eventObj })
        
        toastr.success('Success!', 'Event has been updated!');
    }
}


export const joinEvent = (eventId) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        await firebase.ref(`events/${eventId}/attendees/${user.uid}`).set({
            attendeeId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null,
            going: true, 
            host: false,
            joinDate: Date.now()
        })

        toastr.success("Success", "Your place has been booked!");
    }
}

export const leaveEvent = (eventId) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        await firebase.ref(`events/${eventId}/attendees/${user.uid}`).remove();

        toastr.success("Success", "Your have left the event !");

    }
}


export const cancelEvent = (eventId, isCancelled) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();

        await firebase.ref(`events/${eventId}`).update({
            cancelled: isCancelled
        });

        toastr.success("Success", "Event cancelled successfully!");

    }
}


export const addComment = (eventId, text) => {
    return async function (dispatch, getState, { getFirebase }) {
        const firebase = getFirebase();
        
        const user = firebase.auth().currentUser;

        await firebase.ref(`comments/${eventId}`).push({
            text: text,
            userUid: user.uid,
            author: user.displayName,
            photoURL: user.photoURL,
            commentedAt: Date.now()
        })
    }
}