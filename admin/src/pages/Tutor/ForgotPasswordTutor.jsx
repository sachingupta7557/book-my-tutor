// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPasswordTutor = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post(`${process.env.VITE_BACKEND_URL}/tutor/forgot-password`, { email });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response ? error.response.data.message : 'Something went wrong');
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Sending...' : 'Send Reset Link'}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPasswordTutor;

import { useState } from 'react'
import axios from 'axios'

export default function ForgotPasswordTutor() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/tutor/forgot-password-tutor', { email })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password (Tutor)</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      <p>{message}</p>
    </form>
  )
}









