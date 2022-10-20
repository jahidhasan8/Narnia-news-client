import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
   const[loading,setLoading]=useState(true)

   const googleSignIn=(googleProvider)=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }

   const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
   }
   
   const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
   }

   const profile=(name,photoURL)=>{
    return updateProfile(auth.currentUser, {
        displayName:name, photoURL: photoURL
      })
   }

   const emailVerification=()=>{
    return sendEmailVerification(auth.currentUser)

   }
   const logOut=()=>{
    setLoading(true)
    return signOut(auth)
   }

   useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        if(currentUser=== null || currentUser.emailVerified){
            setUser(currentUser)

        }
        setLoading(false)
    });
    return ()=>{
        unsubscribe();
    }
   },[])
   const authInfo = { user,
    googleSignIn,
    logOut,
    createUser,
    signIn,
    profile,
    loading,
    setLoading,
    emailVerification };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;