

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordTutor = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tutor/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center">Tutor Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered tutor email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-indigo-600 transition"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordTutor;







