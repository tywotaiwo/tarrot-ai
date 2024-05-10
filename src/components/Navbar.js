import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { useUserProfile } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const userProfile = useUserProfile();
    const { logoutUser } = useAuth();

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-purple-800 text-white fixed w-full flex justify-between items-center ">
            <div className="text-lg cursor-pointer md:hidden p-4" onClick={toggleMenu}>
                &#9776; {/* Burger menu icon */}
            </div>
            <div className={`${isMenuOpen ? "flex" : "hidden"} absolute top-full left-0 w-full bg-purple-800 flex-col md:flex md:flex-row md:items-center md:justify-between z-10 shadow-lg`}>
                {userProfile ? (
                   <>
                   <div className="flex-grow flex flex-col md:flex-row md:justify-start space-y-2 md:space-y-0  p-4">
                       <span>Welcome, {userProfile.displayName}!</span>
                       <span>Member since: {new Date(userProfile.memberSince).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                       <span> | Balance: ${userProfile.balance || '0.00'}</span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center md:ml-auto space-y-2 md:space-y-0 md:space-x-2 mr-4 ml-4">
    <Link href="/add-funds">
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded text-center  ml-4">Add Funds</button>
    </Link>
    <button onClick={logoutUser} className="text-white px-6 py-2 rounded block md:mr-8 ml-4 transition duration-300 ease-in-out hover:bg-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
    Logout
</button>

</div>

               </>
                ) : (
                    <button onClick={() => setModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded block m-4">Login</button>
                )}
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </nav>
    );
};

export default Navbar;
