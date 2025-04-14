// import { useState } from 'react'
// import axios from 'axios'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post('/api/user/forgot-password', { email })
//       setMessage(res.data.message)
//     } catch (err) {
//       setMessage('Something went wrong.')
//     }
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full border p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button className="bg-blue-600 text-white py-2 px-4 rounded">
//           Send Reset Link
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   )
// }

// export default ForgotPassword


import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext'; // Import context

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { backendUrl } = useContext(AppContext); // Use backendUrl from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });

      if (data.success) {
        toast.success(data.message || 'Reset link sent to your email');
      } else {
        toast.error(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center justify-center'>
      <div className='p-8 border rounded-lg w-[350px] shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Forgot Password</h2>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full border p-2 rounded mb-4'
        />
        <button type='submit' className='w-full bg-primary text-white py-2 rounded'>
          Send Reset Link
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;

