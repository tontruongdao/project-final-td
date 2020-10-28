import React, { Component, useState, useRef } from 'react';

import { auth } from '../services/firebase';

export const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {

    // Logic to verify if user is authenticated
    const [loading, setLoading] = React.useState(true);
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        console.log("[Apps.js] Mounted");
        auth().onAuthStateChanged((user) => {
          if (user) {
            setLoading(false);
            setAuthenticated(true);
          } else {
            setLoading(false);
            setAuthenticated(false);
          }
        });
      }, []);


    return(
        <AuthContext.Provider value={{authenticated, loading}}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProvider;