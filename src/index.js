import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CookiesProvider} from 'react-cookie';
// import { createBrowserHistory } from 'history'
import {Provider} from 'mobx-react'
import Store from './store/store'
import { BrowserRouter } from 'react-router-dom';
// let history = createBrowserHistory();
const store = new Store();
ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
