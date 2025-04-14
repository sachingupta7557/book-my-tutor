

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { TutorContext } from '../context/TutorContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(TutorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-4 border-b bg-white shadow-sm">
      {/* Left: Logo and Role */}
      <div className="flex items-center gap-3">
        <img
          className="w-14 sm:w-20 cursor-pointer hover:opacity-90 transition"
          src={assets.admin_logoo}
          alt="Logo"
        />
        <span className="text-xs sm:text-sm border border-gray-400 text-gray-600 px-3 py-1 rounded-full bg-gray-50">
          {aToken ? 'Admin' : 'Tutor'}
        </span>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="bg-primary text-white text-sm font-medium px-6 sm:px-10 py-2 rounded-full hover:bg-primary/90 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
