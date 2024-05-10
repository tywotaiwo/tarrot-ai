import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserContext';

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { logoutUser } = useAuth();
    const userProfile = useUserProfile();

    return (
        <nav>
            {userProfile ? (
                <>
                    <div>Welcome, {userProfile.displayName}! Member since: {userProfile.memberSince}</div>
                    <button onClick={logoutUser}>Logout</button>
                </>
            ) : (
                <button onClick={() => setModalOpen(true)}>Login</button>
            )}
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </nav>
    );
};

export default Navbar;
