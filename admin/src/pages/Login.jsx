import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { TutorContext } from '../context/TutorContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(TutorContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (view === 'forgot') {
      try {
        const url = `${backendUrl}/api/tutor/forgot-password-tutor`;
        const { data } = await axios.post(url, { email });

        toast.success(data.message || 'Reset link sent!');
        setView('login');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to send reset link');
        console.log(err);
      }
      return;
    }

    
    try {
      const url = `${backendUrl}/api/${role.toLowerCase()}/login`;
      const { data } = await axios.post(url, { email, password });

      if (data.token) {
        if (role === 'Admin') {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          navigate('/admin-dashboard');
        } else {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          navigate('/tutor-dashboard');
        }
        toast.success(`${role} login successful!`);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {role} <span className="text-purple-600">{view === 'login' ? 'Login' : 'Forgot Password'}</span>
          </h2>
          <p className="text-sm text-gray-500">
            {view === 'login'
              ? 'Enter your email and password to sign in.'
              : 'Enter your tutor email to receive a reset link.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {view === 'login' && (
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {view === 'login' ? 'Login' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 space-y-2">
          {view === 'login' ? (
            role === 'Tutor' && (
              <p>
                Forgot Password?{' '}
                <span
                  className="text-purple-600 cursor-pointer hover:underline"
                  onClick={() => setView('forgot')}
                >
                  Click here
                </span>
              </p>
            )
          ) : (
            <p>
              Back to Login?{' '}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => setView('login')}
              >
                Click here
              </span>
            </p>
          )}

          <p>
            {role === 'Admin' ? 'Tutor Login?' : 'Admin Login?'}{' '}
            <span
              className="text-purple-600 cursor-pointer hover:underline"
              onClick={() => {
                setRole(role === 'Admin' ? 'Tutor' : 'Admin');
                setView('login');
              }}
            >
              Switch to {role === 'Admin' ? 'Tutor' : 'Admin'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
