import { toastr } from "react-redux-toastr";
import { closeModal } from "./modalActions";
import {asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions';

export const loginUser = (email, password) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {

            dispatch({ type: 'AUTH_REQUEST' })

            const firebase = getFirebase();

            await firebase.auth().signInWithEmailAndPassword(email, password);

            dispatch(closeModal())

            dispatch({ type: "AUTH_SUCCESSFUL" });

        } catch (err) {
            dispatch({ type: "AUTH_ERROR", payload: { error: err.message } });
        }
        
    }
}

export const registerUser = (userObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch({ type: 'AUTH_REQUEST' })
            
            const firebase = getFirebase();

            await firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);


            const user = firebase.auth().currentUser;

            // updating user inside firebase auth
            await user.updateProfile({
                displayName: userObj.name
            })

            const newUser = {
                displayName: userObj.name,
                email: userObj.email,
                createdAt: Date.now()
            }

            //  saving user in firebase database;
            await firebase.ref(`users/${user.uid}`).set({ ...newUser });

            dispatch(closeModal())

             dispatch({ type: "AUTH_SUCCESSFUL" });
            
        } catch (err) {
             dispatch({ type: "AUTH_ERROR", payload: { error: err.message } });
        }
        
    }
}


export const logoutUser = () => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            const firebase = getFirebase();

            firebase.auth()

            await firebase.auth().signOut();

        } catch (err) {
            dispatch({ type: "AUTH_ERROR", payload: { error: err.message } });
        }
        
    }
}


export const socialLogin = (authProvider) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            const firebase = getFirebase()
            
            dispatch(closeModal());

            const user = await firebase.login({
                provider: authProvider,
                type: 'popup'
            })

            await firebase.ref(`users/${user.user.uid}`).set({
                displayName: user.profile.displayName,
                photoURL: user.profile.avatarUrl,
                email: user.profile.email,
                createdAt: Date.now()
            })

        } catch (err) {
             dispatch({ type: "AUTH_ERROR", payload: { error: err.message } });
        }
    }
}


export const updatePassword = (newPassword) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

            const firebase = getFirebase();

            const user = firebase.auth().currentUser;

            await user.updatePassword(newPassword)

            toastr.success("Success!", "Your password has been updated!");

            dispatch(asyncActionFinish())

        } catch (err) {
            toastr.error("Error!", err.message)
            dispatch(asyncActionError(err.message));
        }
    }
}



export const updateProfile = (user) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

            const firebase = getFirebase();
  
            // updates the user inside the firebase database;
            await firebase.updateProfile(user);

            toastr.success("Success!", "Your profile has been updated!");

            dispatch(asyncActionFinish())

        } catch (err) {
            toastr.error("Error!", "Error updating your profile!")
            dispatch(asyncActionError(err.message));
        }
    }
}



export const uploadProfilePhoto = (file, fileName) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            dispatch(asyncActionStart())

            const firebase = getFirebase();
            const user = firebase.auth().currentUser;

            const filePath = `${user.uid}/user_images/${Date.now()}-${fileName}`;
            
            // uploading file to firebase storage
            const storageRef = firebase.storage().ref()
            const uploadTask = storageRef.child(filePath).put(file, { contentType: 'image/*' });


            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, error => {
                toastr.error(error.message);
            }, async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                    // update user inside firebase database
                    await firebase.updateProfile({
                        photoURL: downloadURL
                    })

                    // updates user inside firebase auth
                    await user.updateProfile({
                        photoURL: downloadURL,
                    })

                    toastr.success("Success!", "Photo uploaded successfully!")

                    dispatch(asyncActionFinish())
    })
        } catch (err) {
            toastr.error("Error!", "Couldn't set your profile image.")
            dispatch(asyncActionError(err.message));
        }
    }
}