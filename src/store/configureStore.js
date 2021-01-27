import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { eventsReducer } from '../reducers/eventsReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import thunk from 'redux-thunk';

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        events: eventsReducer,
        toastr: toastrReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

const configureStore = () => store;

export default configureStore;