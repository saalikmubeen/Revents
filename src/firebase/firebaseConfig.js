import * as firebase from 'firebase';


export const firebaseConfig = {
    // your firebase config details
};


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase }

export default database;