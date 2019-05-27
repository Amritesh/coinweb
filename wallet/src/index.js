import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import bootUp from './bootUp';
import UserInfoService from './services/UserInfoService';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
bootUp({
    loginRequired:false,
    appInitMethod:function(){
        window.infoService = new UserInfoService();
        ReactDOM.render(<App />, document.getElementById('root'));
    } 
});