import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddTutor from './pages/Admin/AddTutor';
import TutorsList from './pages/Admin/TutorsList';
import { TutorContext } from './context/TutorContext';
import TutorDashboard from './pages/Tutor/TutorDashboard';
import TutorAppointments from './pages/Tutor/TutorAppointments';
import TutorProfile from './pages/Tutor/TutorProfile';

import ForgotPasswordTutor from './pages/Tutor/ForgotPasswordTutor';
import ResetPasswordTutor from './pages/Tutor/ResetPasswordTutor';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken} = useContext(TutorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes> 
          {/* Admin Route */}
          <Route path = '/' element={<></>}/> 
          <Route path = '/admin-dashboard' element={<Dashboard/>} />
          <Route path = '/all-bookings' element={<AllBookings/>} />
          <Route path = '/add-tutor' element={<AddTutor/>} />
          <Route path = '/tutor-list' element={<TutorsList/>} />

          {/* Tutor Route */}
          <Route path = '/tutor-dashboard' element={<TutorDashboard/>} />
          <Route path = '/tutor-appointments' element={<TutorAppointments/>} />
          <Route path = '/tutor-profile' element={<TutorProfile/>} />

          <Route path="/forgot-password-tutor" element={<ForgotPasswordTutor />} />
         <Route path="/reset-password-tutor/:token" element={<ResetPasswordTutor />} />
        

        </Routes>
      </div>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App