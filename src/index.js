import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import configureStore from './store/configureStore';
import ScrollToTop from './components/ScrollToTop';

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
