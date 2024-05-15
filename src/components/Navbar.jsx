import React, { useState } from 'react';
import logoImage from '../assets/logo.jpeg';
import "../index.css";


const Navbar = ({handleSignOut})=>{
    const settings = ["Logout"];
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (action) => {
        handleCloseUserMenu(); // Close the menu
        if (action === "Logout" && handleSignOut) {   
        handleSignOut(); 
        }
    };

    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <img
                        className="logo"
                        width="135"
                        height="37"
                        src={logoImage}
                        title="All Events in City"
                        alt="All events in City logo"
                    />
                </div>
                <div className="relative">
                    <button onClick={handleOpenUserMenu} className="rounded-full">
                        <span className="sr-only">Open user menu</span>
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    </button>
                    {anchorElUser && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black">
                            {settings.map((setting) => (
                                <button
                                    key={setting}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMenuItemClick(setting)}
                                >
                                    {setting}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Navbar;
