import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { useUserProfile } from '../contexts/UserContext'; // Import useUserProfile
import {useAuth} from '../contexts/AuthContext'
import Link from 'next/link'; // To handle navigation
import styles from '../styles/Navbar.module.css'; // Import CSS module

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const userProfile = useUserProfile(); // Use userProfile from UserContext

    const { user, logoutUser } = useAuth();

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.menuIcon} onClick={toggleMenu}>
                &#9776;
            </div>
            <div className={`${styles.menu} ${isMenuOpen ? styles.show : ''}`}>
                {userProfile ? (
                    <>
                       <div className={styles.userInfo}>
                            Welcome, {userProfile.displayName}! | Member since: {new Date(userProfile.memberSince).toLocaleString('default', { month: 'long', year: 'numeric' })} | Balance: ${userProfile.balance || '0.00'}
                        </div>

                        <div>
                            <Link href="/add-funds" className={styles.button}>Add Funds</Link>

                         
                            <button onClick={logoutUser} className={styles.button}>Logout</button>
                        </div>
                    </>
                ) : (
                    <button onClick={() => setModalOpen(true)} className={styles.button}>Login</button>
                )}
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </nav>
    );
};

export default Navbar;
