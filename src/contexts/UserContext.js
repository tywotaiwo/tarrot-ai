import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile({
                        uid: user.uid,
                        displayName: docSnap.data().displayName,
                        memberSince: docSnap.data().createdAt.toDate().toDateString() // Adjust according to your date format
                    });
                }
            } else {
                setProfile(null);
            }
        };

        fetchUserProfile();
    }, [user]);

    return (
        <UserContext.Provider value={profile}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserContext);
