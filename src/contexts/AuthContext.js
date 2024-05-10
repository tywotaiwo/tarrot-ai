import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,  // Ensure this is imported
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setError(''); // Clear errors on auth state change
            if (user) {
                const userProfile = await loadUserProfile(user.uid);
                setUser(userProfile);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe;
    }, []);

    const loadUserProfile = async (uid) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { uid, ...docSnap.data() };
        } else {
            return { uid };
        }
    };

    const createUserProfile = async (user, additionalData = {}) => {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (!snapshot.exists()) {
            const { email, displayName } = user;
            const createdAt = new Date();
            try {
                await setDoc(userRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                });
            } catch (error) {
                console.error("Error creating user document", error);
                setError('Failed to create user profile.');
            }
        }
        return loadUserProfile(user.uid);
    };

    const handleAuthError = (error) => {
        setError(error.message);
    };

    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await createUserProfile(userCredential.user);
        } catch (error) {
            handleAuthError(error);
        }
    };

    const registerWithEmail = async (email, password, firstName, lastName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfile(userCredential.user, { displayName: `${firstName} ${lastName}` });
        } catch (error) {
            handleAuthError(error);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider(); // Define provider here
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                await createUserProfile(result.user);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            handleAuthError(error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            error,
            loginWithEmail,
            registerWithEmail,
            signInWithGoogle,
            logoutUser,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
