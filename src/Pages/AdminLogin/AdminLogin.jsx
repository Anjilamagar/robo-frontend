import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Admin Login Page
 * 
 * This page allows administrators to log in using their email and password.
 * 
 * Features:
 * - Email and password authentication
 * - Role verification (only ADMIN users can access)
 * - JWT token storage in localStorage
 * - Error handling with user-friendly messages
 * - Remember me functionality
 * 
 * Security:
 * - Backend verifies admin exists, password matches, and role === "ADMIN"
 * - Normal users are denied access even if they know admin credentials
 */
const AdminLogin = () => {
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // UI state management
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle input field changes
   * Updates formData state when user types in email, password, or toggles remember me
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error message when user starts typing
    if (error) setError('');
  };

  /**
   * Handle form submission
   * Sends admin credentials to backend for verification
   * 
   * Backend verification:
   * 1. Checks if admin exists
   * 2. Verifies password using bcrypt
   * 3. Ensures role === "ADMIN"
   * 4. Denies normal users (role === "USER")
   * 5. Returns JWT token on success
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send POST request to admin login endpoint
      // Endpoint: POST /auth/admin/login
      const result = await axios.post('http://localhost:5000/auth/admin/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Admin login successful:', result.data);

      // Store token and user info based on remember me preference
      // localStorage: persists even after browser closes
      // sessionStorage: cleared when browser tab closes
      if (formData.rememberMe) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        localStorage.setItem('isAdmin', 'true'); // Flag to identify admin session
      } else {
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('user', JSON.stringify(result.data.user));
        sessionStorage.setItem('isAdmin', 'true');
      }

      // Show success message
      toast.success('Admin login successful! Redirecting...');

      // Redirect to admin dashboard (you can change this route)
      setTimeout(() => {
        navigate('/dashboard'); // Change to '/admin/dashboard' if you have a separate admin dashboard
      }, 1000);

    } catch (err) {
      console.error('Admin login error:', err);
      
      // Extract error message from response
      // Backend returns specific messages:
      // - "Invalid email or password" (401) - wrong credentials
      // - "Access denied. Admin privileges required." (403) - user is not admin
      // - "Email and password are required" (400) - missing fields
      const errorMessage = err.response?.data?.message || 'Admin login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast notification container */}
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

      <div 
        className="min-h-screen flex items-center justify-center p-4" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)]/90 to-[var(--color-primary-darker)]/95"></div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-1">
            <img
              src="./logo.png"
              alt="Brand Logo"
              className="w-32 mb-0 mt-0 drop-shadow-[0_0_20px_var(--glow-primary)]"
            />
          </div>

          {/* Admin Login Form Card */}
          <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-xl border border-[var(--color-primary-light)]">
            <h1 className="text-2xl text-center font-semibold mb-2 text-[var(--color-text-primary)]">
              Admin Login
            </h1>
            <p className="text-sm text-center text-[var(--color-text-secondary)] mb-6">
              Sign in to access admin panel
            </p>

            {/* Error message display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block mb-1 text-sm font-medium text-[var(--color-text-secondary)]">
                Admin Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your admin email"
                required
                className="w-full px-4 py-2 mb-4 rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />

              {/* Password Input */}
              <label className="block mb-1 text-sm font-medium text-[var(--color-text-secondary)]">
                Password
              </label>
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 pr-12 rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-[var(--color-primary-light)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <span className="ml-2 text-sm text-[var(--color-text-secondary)]">Remember me</span>
                </label>
                <Link 
                  to="/admin/forgot-password"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-lighter)] transition-colors font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging In...' : 'Admin Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-primary-light)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--color-surface)] text-[var(--color-text-secondary)]">OR</span>
              </div>
            </div>

            {/* Link to regular user login */}
            <p className="text-center text-sm text-[var(--color-text-secondary)]">
              Not an admin?{' '}
              <Link 
                to="/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-lighter)] font-semibold transition-colors"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

