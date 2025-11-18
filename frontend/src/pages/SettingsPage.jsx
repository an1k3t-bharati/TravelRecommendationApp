import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Frontend validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Please log in to change your password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: { "x-auth-token": token },
        }
      );

      setSuccess(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to change password. Please check your current password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* --- Hero Section for Settings --- */}
        <div
          className="relative bg-gradient-to-r from-primary to-accent py-20 text-white shadow-lg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay to darken image */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-4">
              Your Account Settings
            </h1>
            <p className="text-xl font-light opacity-90">
              Customize your experience and manage your security.
            </p>
          </div>
        </div>
        {/* --- Main Content Area --- */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* --- Sidebar Navigation --- */}
            <aside className="md:col-span-1">
              <ul className="menu bg-base-200 w-full rounded-box shadow-md p-4 space-y-2">
                <li className="menu-title text-base-content/70">
                  Account Management
                </li>
                <li>
                  <Link to="/profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="active text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 8v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2zm-6-3a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Password
                  </a>
                </li>
              </ul>
            </aside>
            {/* --- Main Settings Cards --- */}
            <div className="md:col-span-2 space-y-8">
              {/* --- 1. Change Password Card --- */}
              <div className="bg-base-200 p-8 rounded-lg shadow-xl border border-base-300">
                <h2 className="text-3xl font-bold text-base-content mb-8">
                  Change Your Password
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg font-medium">
                        Current Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your current password"
                      className="input input-bordered input-primary w-full"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg font-medium">
                        New Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password (min 6 characters)"
                      className="input input-bordered input-primary w-full"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg font-medium">
                        Confirm New Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="input input-bordered input-primary w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-error shadow-lg">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="alert alert-success shadow-lg">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{success}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full text-lg"
                      disabled={loading}
                    >
                      {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>{" "}
              {/* End Change Password Card */}
              {/* --- 2. NEW: Manage Profile Card --- */}
              <div className="bg-base-200 p-8 rounded-lg shadow-xl border border-base-300">
                <h2 className="text-3xl font-bold text-base-content mb-4">
                  Manage Profile
                </h2>
                <p className="text-base-content/70 mb-6">
                  Update your personal information, such as your full name and
                  email address.
                </p>
                <Link to="/profile" className="btn btn-outline btn-secondary">
                  Go to Profile
                </Link>
              </div>
              {/* --- 3. NEW: Danger Zone Card --- */}
              <div className="border border-error/50 rounded-lg shadow-xl">
                <div className="bg-error/10 p-8 rounded-t-lg">
                  <h2 className="text-3xl font-bold text-error">Danger Zone</h2>
                </div>
                <div className="bg-base-200 p-8 rounded-b-lg">
                  <p className="text-base-content/70 mb-6">
                    Once you delete your account, there is no going back. All
                    your saved trips and profile data will be permanently lost.
                  </p>
                  <button className="btn btn-error">Delete My Account</button>
                </div>
              </div>
            </div>{" "}
            {/* End Main Settings Cards */}
          </div>{" "}
          {/* End Grid */}
        </div>{" "}
        {/* End Container */}
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
