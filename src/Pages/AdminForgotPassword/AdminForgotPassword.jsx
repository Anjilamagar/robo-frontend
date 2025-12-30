import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

/**
 * Admin Forgot Password Page
 * 
 * This page allows administrators to reset their password using OTP verification.
 * 
 * Flow:
 * 1. Admin enters email → OTP sent to email
 * 2. Admin enters OTP → OTP verified, get reset token
 * 3. Admin enters new password → Password reset successfully
 * 
 * Security:
 * - Only users with role === "ADMIN" can use this endpoint
 * - Normal users are denied access
 */
const AdminForgotPassword = () => {
  const navigate = useNavigate();

  // Step management: 1 = email, 2 = OTP, 3 = reset password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  /**
   * Step 1: Request OTP for password reset
   * Sends OTP to admin's email
   */
  const handleRequestToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call admin forgot password endpoint
      await axios.post("http://localhost:5000/auth/admin/forgot-password", {
        email
      });

      // Move to OTP verification step
      setStep(2);

      toast.success("OTP sent to your email. Please enter it to continue.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 2: Verify OTP
   * Verifies the OTP and gets a reset token
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      // Verify OTP using the OTP verification endpoint
      const res = await axios.post("http://localhost:5000/otp/verify-otp", {
        email,
        otp,
        context: "RESET_PASSWORD" // Same context as user password reset
      });

      // Get reset token from response
      const token = res.data.resetToken;
      setResetToken(token);
      
      // Move to password reset step
      setStep(3);

      toast.success("OTP verified. You can now reset your password.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Invalid or expired OTP. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 3: Reset password
   * Resets admin password using the reset token
   */
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate password length
    if (passwords.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    // Validate passwords match
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Reset password using the reset token
      await axios.post("http://localhost:5000/auth/reset-password", {
        token: resetToken,
        newPassword: passwords.newPassword
      });

      toast.success("Password reset successful! Redirecting to admin login...");
      
      // Redirect to admin login page
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to reset password. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#2a2a3e",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(154, 109, 206, 0.15)"
          }
        }}
      />

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)]/90 to-[var(--color-primary-darker)]/95"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="flex justify-center mb-2">
            <img
              src="./logo.png"
              alt="Brand Logo"
              className="w-32 drop-shadow-[0_0_20px_var(--glow-primary)]"
            />
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-xl border border-[var(--color-primary-light)]">
            <h1 className="text-xl text-center font-semibold mb-1 text-[var(--color-text-primary)]">
              {step === 1
                ? "Admin Forgot Password"
                : step === 2
                ? "Verify OTP"
                : "Reset Password"}
            </h1>
            <p className="text-xs text-center text-[var(--color-text-secondary)] mb-4">
              {step === 1
                ? "Enter your admin email to receive an OTP"
                : step === 2
                ? "Enter the OTP sent to your email"
                : "Set a new password for your admin account"}
            </p>

            {/* Step 1: Enter Email */}
            {step === 1 && (
              <form onSubmit={handleRequestToken}>
                <label className="block mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  required
                  className="w-full px-3 py-2 mb-4 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-sm font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <label className="block mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP you received"
                  required
                  maxLength={6}
                  className="w-full px-3 py-2 mb-4 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-sm font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <label className="block mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  placeholder="Enter new password"
                  required
                  className="w-full px-3 py-2 mb-3 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                <label className="block mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))
                  }
                  placeholder="Confirm new password"
                  required
                  className="w-full px-3 py-2 mb-4 text-sm rounded-md border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-sm font-medium text-white bg-[var(--color-primary)] trigger transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <p className="text-center text-xs text-[var(--color-text-secondary)] mt-4">
              Remember your password?{" "}
              <Link
                to="/admin/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-lighter)] font-semibold transition-colors"
              >
                Back to Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminForgotPassword;


