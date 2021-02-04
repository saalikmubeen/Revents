import { toastr } from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions';


export const createEvent = (eventObj, history) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())
            
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

            await firebase.ref('activities').push({
                type: "New Event",
                hostedBy: user.displayName,
                title: eventObj.title,
                photoURL: user.photoURL || "/assets/images/user.png",
                timestamp: Date.now(),
                hostUid: user.uid,
                eventId: docRef.key
            });
        
            toastr.success('Success!', 'Event has been created!');
            
            dispatch(asyncActionFinish())

            history.push('/events');
        
        } catch (err) {
            dispatch(asyncActionError(err.message));
            
             toastr.error('Error!', err.message);
        }
    }
}



export const updateEvent = (eventId, eventObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart());

            const firebase = getFirebase();

            await firebase.ref(`events/${eventId}`).update({ ...eventObj })
        
            toastr.success('Success!', 'Event has been updated!');

            dispatch(asyncActionFinish())
        
        } catch (err) {
            toastr.error('Error!', err.message);
            dispatch(asyncActionError(err.message))
        }
    }
}


export const joinEvent = (eventId) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

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

            dispatch(asyncActionFinish())
        
        } catch (err) {
            toastr.error('Error!', err.message);
            dispatch(asyncActionError(err.message))
        }
    }
}

export const leaveEvent = (eventId) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())
        
            const firebase = getFirebase();
            const user = firebase.auth().currentUser;

            await firebase.ref(`events/${eventId}/attendees/${user.uid}`).remove();

            toastr.success("Success", "Your have left the event !");

            dispatch(asyncActionFinish())
        
        } catch (err) {
            toastr.error('Error!', err.message);
            dispatch(asyncActionError(err.message))
        }

    }
}


export const cancelEvent = (eventId, isCancelled) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

            const firebase = getFirebase();
            const user = firebase.auth().currentUser;

            const message = isCancelled ?
                'Are you sure you want to cancel this event?' :
                'This will reactivate the event, are you sure?'
        
            toastr.confirm(message, {
                onOk: async () => {
                    const docRef = firebase.ref(`events/${eventId}`);
                    await docRef.update({ cancelled: isCancelled });
                
                    docRef.once("value").then(async (snapshot) => {
                        const eventId = snapshot.key;
                        const event = snapshot.val();
                    
                        if (event.cancelled) {
                            await firebase.ref('activities').push({
                                type: "Cancel Event",
                                hostedBy: user.displayName,
                                title: event.title,
                                photoURL: user.photoURL || "/assets/images/user.png",
                                timestamp: Date.now(),
                                hostUid: user.uid,
                                eventId: eventId
                            });
                        }
                    })

                
                    toastr.success("Success", "Event cancelled successfully!");

                }
            })

            dispatch(asyncActionFinish())

        } catch (err) {
            toastr.error('Error!', err.message);
            dispatch(asyncActionError(err.message))
        }

    }
}


export const addComment = (eventId, text) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

            const firebase = getFirebase();
        
            const user = firebase.auth().currentUser;

            await firebase.ref(`comments/${eventId}`).push({
                text: text,
                userUid: user.uid,
                author: user.displayName,
                photoURL: user.photoURL,
                commentedAt: Date.now()
            })

            dispatch(asyncActionFinish())
            
        } catch (err) {
            toastr.error('Error!', err.message);
            dispatch(asyncActionError(err.message))
        }
    }
}