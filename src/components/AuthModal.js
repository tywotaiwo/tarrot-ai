import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css'; // Import CSS module

const AuthModal = ({ isOpen, onClose }) => {
    const { signInWithGoogle, loginWithEmail, registerWithEmail, user, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    // Effect to close modal on successful login
    useEffect(() => {
        if (user) {
            onClose();  // If user is logged in, close the modal
        }
    }, [user, onClose]);

    if (!isOpen) return null;

    const handleLogin = () => loginWithEmail(email, password);
    const handleRegister = () => {
        registerWithEmail(email, password, firstName, lastName);
        setIsSignUp(false);  // Reset back to login view after registration
    };
    const handleGoogleSignIn = () => signInWithGoogle();

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                {error && <div className={styles.error}>{error}</div>} {/* Display error here */}
                {!user ? (
                    <>
                        {isSignUp ? (
                            <>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                />
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                />
                            </>
                        ) : null}
                        <input
                            className={styles.inputField}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {isSignUp ? (
                            <button className={`${styles.button}`} onClick={handleRegister}>Sign Up</button>
                        ) : (
                            <button className={`${styles.button}`} onClick={handleLogin}>Login</button>
                        )}
                        <button className={`${styles.button} ${styles.googleButton}`} onClick={handleGoogleSignIn}>
                            🌐 Sign in with Google
                        </button>
                        <button className={styles.button} onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                        </button>
                    </>
                ) : (
                    <button className={styles.button} onClick={onClose}>Close</button>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
