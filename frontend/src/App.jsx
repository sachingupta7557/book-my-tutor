import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tutor from './pages/Tutor';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import MyBookings from './pages/MyBookings';
import MyProfile from './pages/MyProfile';
import Booking from './pages/Booking';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <ToastContainer position='top-center' autoClose={2000} />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tutor' element={<Tutor />} />
        <Route path='/tutor/:speciality' element={<Tutor />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/mybookings' element={<MyBookings />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/booking/:wonId' element={<Booking />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;



