import React from 'react';

import { auth } from '../services/firebase';

export const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {

    // Logic to verify if user is authenticated
    const [loading, setLoading] = React.useState(true);
    const [authenticated, setAuthenticated] = React.useState(false);
    const [email, setEmail] = React.useState(null);
    const [userID, setUserID] = React.useState(null);
    const [recipeCount, setRecipeCount] = React.useState(null)

    React.useEffect(() => {
        // console.log("[Apps.js] Mounted");
        auth().onAuthStateChanged((user) => {
        // console.log("[AuthContext.js] user profile", user);
          if (user) {
            setUserID(user.uid);
            setEmail(user.email);
            setAuthenticated(true);
            setLoading(false);
          } else {
            setUserID(null);
            setEmail("")
            setAuthenticated(false);
            setLoading(false);
          }
        });
      }, []);


    return(
        <AuthContext.Provider value={{authenticated, loading, email, userID, recipeCount, setRecipeCount}}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProvider;