import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Helper function to extract error messages from axios errors.
const getErrorMessage = (error) =>
  error.response?.data?.message || 'An unexpected error occurred';

const Login = () => {
  // State for login form data
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  // State for login error message
  const [error, setError] = useState(null);
  // State for OTP and password reset feedback
  const [message, setMessage] = useState(null);
  // Flag to indicate if OTP has been sent (to show reset form)
  const [otpSent, setOtpSent] = useState(false);
  // OTP and new password fields for reset flow
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();

  // Update form state when inputs change
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handler for login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
      setMessage(null);
    }
  };

  // Handler for sending OTP for password reset
  const handleForgotPassword = async () => {
    if (!formData.identifier) {
      setError('Please enter your email to receive an OTP.');
      return;
    }
    try {
      await axios.post('/api/auth/forgot', { email: formData.identifier });
      setMessage('An OTP has been sent to your email. Please check your inbox.');
      setError(null);
      setOtpSent(true);
    } catch (err) {
      setError(getErrorMessage(err));
      setMessage(null);
    }
  };

  // Handler for resetting the password using OTP and new password
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('/api/auth/reset', {
        email: formData.identifier,
        otp,
        newPassword,
      });
      setMessage('Password has been reset successfully. You can now log in with your new password.');
      setError(null);
      // Optionally, reset the OTP form state and hide the reset section.
      setOtpSent(false);
      setOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {/* Login Input Fields */}
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        {/* Buttons for Login and Forgot Password */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Forgot Password
          </button>
        </div>

        {/* Reset Password Section (visible only after OTP is sent) */}
        {otpSent && (
          <div className="mt-6 mb-4 border-t pt-4">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <div className="mb-4">
              <label>OTP:</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded p-2 mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded p-2 mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full border rounded p-2 mt-1"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleResetPassword}
              className="bg-green-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Reset Password
            </button>
          </div>
        )}

        {/* Link to Registration */}
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
