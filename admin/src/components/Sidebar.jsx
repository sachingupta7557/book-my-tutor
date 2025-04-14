// import React, { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { TutorContext } from '../context/TutorContext'

// const Sidebar = () => {

//     const { aToken } = useContext(AdminContext)
//     const {dToken} = useContext(TutorContext)
//     return (
//         <div className='min-h-screen bg-white border-r'>
//             {
//                 aToken && <ul className='text-[#515151] mt-5'>
//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/admin-dashboard'}>
//                         <img src={assets.home_icon} alt="" />
//                         <p className='hidden md:block'>Dashboard</p>
//                     </NavLink>

//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/all-bookings'}>
//                         <img src={assets.appointment_icon} alt="" />
//                         <p className='hidden md:block'>Bookings</p>
//                     </NavLink>

//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/add-tutor'}>
//                         <img src={assets.add_icon} alt="" />
//                         <p className='hidden md:block'>Add Tutor</p>
//                     </NavLink>

//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/tutor-list'}>
//                         <img src={assets.people_icon} alt="" />
//                         <p className='hidden md:block'>Tutors List</p>
//                     </NavLink>
//                 </ul>
//             }

// {
//                 dToken && <ul className='text-[#515151] mt-5'>
//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/tutor-dashboard'}>
//                         <img src={assets.home_icon} alt="" />
//                         <p className='hidden md:block'>Dashboard</p>
//                     </NavLink>

//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/tutor-appointments'}>
//                         <img src={assets.appointment_icon} alt="" />
//                         <p className='hidden md:block'>Appointments</p>
//                     </NavLink>

//                     {/* <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/add-tutor'}>
//                         <img src={assets.add_icon} alt="" />
//                         <p>Add Tutor</p>
//                     </NavLink> */}

//                     <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to = {'/tutor-profile'}>
//                         <img src={assets.people_icon} alt="" />
//                         <p className='hidden md:block'>Profile</p>
//                     </NavLink>
//                 </ul>
//             }

//         </div>
//     )
// }

// export default Sidebar

import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { TutorContext } from '../context/TutorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(TutorContext);

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-4 md:px-8 md:min-w-72 cursor-pointer text-sm transition-all ${
      isActive
        ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium'
        : 'hover:bg-gray-50 text-gray-600'
    }`;

  return (
    <div className="min-h-screen bg-white border-r shadow-sm">
      {aToken && (
        <ul className="mt-6 space-y-1">
          <NavLink className={navItemStyle} to="/admin-dashboard">
            <img src={assets.home_icon} alt="Dashboard" className="w-5" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={navItemStyle} to="/all-bookings">
            <img src={assets.appointment_icon} alt="Bookings" className="w-5" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>

          <NavLink className={navItemStyle} to="/add-tutor">
            <img src={assets.add_icon} alt="Add Tutor" className="w-5" />
            <p className="hidden md:block">Add Tutor</p>
          </NavLink>

          <NavLink className={navItemStyle} to="/tutor-list">
            <img src={assets.people_icon} alt="Tutors" className="w-5" />
            <p className="hidden md:block">Tutors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="mt-6 space-y-1">
          <NavLink className={navItemStyle} to="/tutor-dashboard">
            <img src={assets.home_icon} alt="Dashboard" className="w-5" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={navItemStyle} to="/tutor-appointments">
            <img src={assets.appointment_icon} alt="Appointments" className="w-5" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={navItemStyle} to="/tutor-profile">
            <img src={assets.people_icon} alt="Profile" className="w-5" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;



