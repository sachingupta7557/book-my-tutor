


import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TutorContext } from '../context/TutorContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(TutorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (view === 'forgot') {
      try {
        const url =
          state === 'Admin'
            ? `${backendUrl}/api/admin/forgot-password`
            : `${backendUrl}/api/tutor/forgot-password`;

        const { data } = await axios.post(url, { email });

        if (data.success) {
          toast.success('Reset link sent to email!');
          setView('login');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
        console.log(error);
      }

      return;
    }

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin login successful!');
          setTimeout(() => {
            navigate('/admin-dashboard');
          }, 1000);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/tutor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Tutor login successful!');
          setTimeout(() => {
            navigate('/tutor-dashboard');
          }, 1000);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-100 px-4"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {state}{' '}
            <span className="text-indigo-600">
              {view === 'login' ? 'Login' : 'Forgot Password'}
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {view === 'login'
              ? 'Welcome back! Please enter your credentials.'
              : 'Enter your email to receive a reset link.'}
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        {view === 'login' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg text-base font-semibold hover:bg-indigo-700 transition duration-300"
        >
          {view === 'login' ? 'Login' : 'Send Reset Link'}
        </button>

        <div className="text-center text-sm text-gray-600 space-y-2">
          {view === 'login' ? (
            <p>
              Forgot Password?{' '}
              <span
                onClick={() => setView('forgot')}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Back to Login?{' '}
              <span
                onClick={() => setView('login')}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}

          {state === 'Admin' ? (
            <p>
              Tutor Login?{' '}
              <span
                onClick={() => {
                  setState('Tutor');
                  setView('login');
                }}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{' '}
              <span
                onClick={() => {
                  setState('Admin');
                  setView('login');
                }}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
