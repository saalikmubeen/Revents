import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { eventsReducer } from '../reducers/eventsReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import thunk from 'redux-thunk';

import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { firebase }  from '../firebase/firebaseConfig';
import modalReducer from '../reducers/modalReducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        events: eventsReducer,
        toastr: toastrReducer,
        modal: modalReducer,
        firebase: firebaseReducer,
    }),
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase }))
    )
);


const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,  
    // useFirestormForProfile: true // Firestore for Profile instead of Realtime DB
}

export const rrfProps = {
firebase,
config: rrfConfig,
dispatch: store.dispatch
}

const configureStore = () => store;

export default configureStore;