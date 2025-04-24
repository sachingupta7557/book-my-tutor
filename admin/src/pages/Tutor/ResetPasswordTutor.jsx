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

// import { useParams } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'

// export default function ResetPasswordTutor() {
//   const { token } = useParams()
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post(`/api/tutor/reset-password-tutor/${token}`, { password })
//       setMessage(res.data.message)
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error occurred')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Reset Password (Tutor)</h2>
//       <input
//         type="password"
//         placeholder="New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Reset Password</button>
//       <p>{message}</p>
//     </form>
//   )
// }

// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useContext } from 'react';
// import { AdminContext } from '../context/AdminContext';

// const ResetPasswordTutor = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AdminContext);
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const url = `${backendUrl}/api/tutor/reset-password-tutor/${token}`;
//       const { data } = await axios.post(url, { password });

//       toast.success(data.message || 'Password reset successfully!');
//       navigate('/'); // Redirect to login page
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Reset failed');
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
//         <form onSubmit={handleReset} className="space-y-4">
//           <input
//             type="password"
//             placeholder="Enter new password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//           >
//             {loading ? 'Resetting...' : 'Reset Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordTutor;




