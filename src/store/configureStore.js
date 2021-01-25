import { createStore, combineReducers } from 'redux';
import { eventsReducer } from '../reducers/eventsReducer';

const store = createStore(
    combineReducers({
        events: eventsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const configureStore = () => store;

export default configureStore;