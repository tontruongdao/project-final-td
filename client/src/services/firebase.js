import firebase from 'firebase'
require("dotenv").config();

// Firebase initial configuration.

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();