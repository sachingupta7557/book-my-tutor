// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ResetPasswordTutor = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`/api/tutor/reset-password/${token}`, { newPassword });
//       setMessage(res.data.message);
//     } catch (error) {
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Tutor Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={e => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ResetPasswordTutor;


// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ResetPasswordTutor = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/reset-password/${token}`,
//         { newPassword }
//       );

//       if (data.success) {
//         toast.success('Password reset successful!');
//         setTimeout(() => {
//           navigate('/login');
//         }, 1500);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong!');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleReset}
//       className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
//     >
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200">
//         <h2 className="text-2xl font-bold text-center">Reset Tutor Password</h2>
//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full py-2 bg-primary text-white rounded-md hover:bg-indigo-600 transition"
//         >
//           Reset Password
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ResetPasswordTutor;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPasswordTutor = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tutor/reset-password/${token}`,
        { newPassword }
      );

      if (data.success) {
        toast.success('Password reset successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center">Reset Tutor Password</h2>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-indigo-600 transition"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordTutor;

