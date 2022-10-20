import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
   

   const googleSignIn=(googleProvider)=>{
    return signInWithPopup(auth, googleProvider)
   }

   const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
   }
   
   const signIn=(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)
   }

   const profile=(name,photoURL)=>{
    return updateProfile(auth.currentUser, {
        displayName:name, photoURL: photoURL
      })
    
       
   }
   const logOut=()=>{
    return signOut(auth)
   }

   useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
    });
    return ()=>{
        unsubscribe();
    }
   },[])
   const authInfo = { user,googleSignIn,logOut,createUser,signIn,profile };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;