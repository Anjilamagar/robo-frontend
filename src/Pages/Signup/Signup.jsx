import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: signup form, 2: verify OTP
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      // Step 1: register user and send OTP
      const result = await axios.post('http://localhost:5000/auth/signup', {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      });

      console.log(result.data);

      // Success toast
      toast.success('Account created! OTP sent to your email.');

      // Go to OTP verification step
      setStep(2);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Please enter the OTP sent to your email');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/otp/verify-otp', {
        email: formData.email,
        otp,
        context: 'SIGNUP'
      });

      // On success, backend returns token and user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Email verified and account activated! 🎉');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || 'OTP verification failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#2a2a3e',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(154, 109, 206, 0.15)',
          },
          success: {
            iconTheme: {
              primary: '#9a6dce',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center p-4" 
           style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200)',

              
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)]/90 to-[var(--color-primary-darker)]/95"></div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* LOGO */}
          <div className="flex justify-center mb-0">
            <img
              src="./logo.png"
              alt="Brand Logo"
              className="w-32 drop-shadow-[0_0_20px_var(--glow-primary)]"
            />
          </div>

          {/* SIGNUP FORM */}
          <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-xl border border-[var(--color-primary-light)]">
            <h1 className="text-xl text-center font-semibold mb-1 text-[var(--color-text-primary)]">
              {step === 1 ? 'Signup' : 'Verify OTP'}
            </h1>
            <p className="text-xs text-center text-[var(--color-text-secondary)] mb-4">
              {step === 1
                ? 'Join us for an amazing shopping experience'
                : `We have sent an OTP to ${formData.email}. Please enter it to verify your email.`}
            </p>

            {step === 1 && (
              <form onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <label className="block mb-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-3 py-1.5 mb-3 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                {/* Email Input */}
                <label className="block mb-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-1.5 mb-3 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                {/* Password Input */}
                <label className="block mb-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  Password
                </label>
                <div className="relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full px-3 py-1.5 pr-10 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                {/* Confirm Password Input */}
                <label className="block mb-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  Confirm Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full px-3 py-1.5 pr-10 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                {/* Signup Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-sm font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <label className="block mb-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                  required
                  className="w-full px-3 py-1.5 mb-4 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-sm font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP & Continue'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-primary-light)]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[var(--color-surface)] text-[var(--color-text-secondary)]">OR</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs text-[var(--color-text-secondary)]">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-lighter)] font-semibold transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
