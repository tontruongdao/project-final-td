import React, { Component, useState, useRef } from 'react';

import { auth } from '../services/firebase';

export const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {

    // Logic to verify if user is authenticated
    const [loading, setLoading] = React.useState(true);
    const [authenticated, setAuthenticated] = React.useState(false);
    const [email, setEmail] = React.useState(null);
    const [userID, setUserID] = React.useState(null);

    React.useEffect(() => {
        // console.log("[Apps.js] Mounted");
        auth().onAuthStateChanged((user) => {
        console.log("[AuthContext.js] user profile", user);
          if (user) {
            setUserID(user.uid);
            setEmail(user.email);
            setLoading(false);
            setAuthenticated(true);
          } else {
            setUserID(null);
            setEmail("")
            setLoading(false);
            setAuthenticated(false);
          }
        });
      }, []);


    return(
        <AuthContext.Provider value={{authenticated, loading, email, userID}}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProvider;