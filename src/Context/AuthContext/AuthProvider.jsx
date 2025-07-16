import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    const [loading, setLoading] = useState(true);
   
    


    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const SignInWithGoogle = ()=>{
        return signInWithPopup(auth, googleProvider)
    }

     const updateUserProfile = userprofile =>{
        return updateProfile(auth.currentUser, userprofile);
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
            

        })
        return ()=>{
            unSubscribe();
        }

    },[])

    const authInfo = {
        user,
        loading,
        setUser,
        createUser,
        loginUser,
        SignInWithGoogle,
        updateUserProfile,
        logOut,
        

    }
    return (

        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;