import firebase from 'firebase'

// Firebase initial configuration.

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: ""
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();