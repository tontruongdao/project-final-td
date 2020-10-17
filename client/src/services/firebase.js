import firebase from 'firebase'

// Firebase initial configuration.

const config = {
    apiKey: "AIzaSyAgjvqfSII-ZsivCQDGL0UKeBTcQibQeh4",
    authDomain: "chatty-8c1a7.firebaseapp.com",
    databaseURL: "https://chatty-8c1a7.firebaseio.com"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();