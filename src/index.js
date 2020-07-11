import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './components/Firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/style.scss"
import {createStore} from "redux";
import cartReducer from "./components/reducers/cartReducer"
import {Provider} from "react-redux";

require("dotenv").config()

const store = createStore(cartReducer)

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </FirebaseContext.Provider></Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
