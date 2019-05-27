/*global firebaseUser */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import bootParams from './bootParams';

function setUpUserData(user){
    window.firebaseUser = user;
    firebaseUser.ref = {};
    let userRef = firebase.database().ref('/users/' + firebaseUser.uid);
    firebaseUser.ref.addressList = userRef.child('addressList');
    firebaseUser.ref.notifications = userRef.child('notifications');
    firebaseUser.ref.userInfo = userRef.child('userInfo');
}

export default function bootUp(appToBoot){
    let defaultApp = firebase.initializeApp(bootParams.firebaseConfig);
    defaultApp.auth().onAuthStateChanged(function(user) {
        let redirectPathEnc = encodeURIComponent(window.location.href.slice(window.location.origin.length));
        if(!user & appToBoot.loginRequired) {
            debugger;
            window.location = '/login?redirectpath=' + redirectPathEnc;
        }
        else{
            user = user ? user : {
                displayName : 'Guest User',
                messagingKey : null,
                photoURL : null,
                uid : null
            };
            setUpUserData(user);
            appToBoot.appInitMethod();
        }
    });
}
