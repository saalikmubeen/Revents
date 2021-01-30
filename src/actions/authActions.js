import { toastr } from "react-redux-toastr";
import { closeModal } from "./modalActions";

export const loginUser = (email, password) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            const firebase = getFirebase();

            const user = await firebase.auth().signInWithEmailAndPassword(email, password);

            console.log(user);

            dispatch(closeModal())

        } catch (err) {
            console.log(err.message)
        }
        
    }
}

export const registerUser = (userObj) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
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
            
        } catch (err) {
            console.log(err.message)
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
            console.log(err.message)
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
            console.log(err);
        }
    }
}


export const updatePassword = (newPassword) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            const firebase = getFirebase();

            const user = firebase.auth().currentUser;

            await user.updatePassword(newPassword)

            toastr.success("Success!", "Your password has been updated!");

        } catch (err) {
            console.log(err.message);
        }
    }
}



export const updateProfile = (user) => {
    return async function (dispatch, getState, { getFirebase }) {
        try {
            const firebase = getFirebase();
  
            // updates the user inside the firebase database;
            await firebase.updateProfile(user);

            toastr.success("Success!", "Your profile has been updated!");

        } catch (err) {
            console.log(err.message);
        }
    }
}