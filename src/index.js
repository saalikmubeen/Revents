import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import './index.css';
import configureStore from './store/configureStore';
import ScrollToTop from './components/ScrollToTop';
import { rrfProps } from './store/configureStore';
import AuthIsLoaded from './components/AuthIsLoaded';

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
            <ScrollToTop />
            <ReduxToastr
                timeOut={5000}
                newestOnTop={false}
                preventDuplicates
                position="bottom-right"
                getState={(state) => state.toastr} // This is the default
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick/>
            <AuthIsLoaded>
                <App/>        
           </AuthIsLoaded>
        </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root'));
