import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; 

const ResetPassword = () => {
  const { token } = useParams();
  const { backendUrl } = useContext(AppContext); 
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, { 
        newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;

