import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const ProfilePage = () => {
  // State for user data
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  // State to toggle editing modes
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // State for Profile form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);
  const [successProfile, setSuccessProfile] = useState(null);

  // State for Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);
  const [successPassword, setSuccessPassword] = useState(null);

  const navigate = useNavigate(); // 2. Initialize navigate

  // Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingUser(false);
        setErrorUser("You must be logged in to view this page.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { "x-auth-token": token },
        });
        setUser(response.data);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
      } catch (err) {
        setErrorUser("Could not fetch user data.");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorProfile(null);
    setSuccessProfile(null);
    setLoadingProfile(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/update-profile",
        { fullName, email },
        { headers: { "x-auth-token": token } }
      );
      setUser(response.data);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setSuccessProfile("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      setErrorProfile(err.response?.data?.error || "Failed to update profile.");
    } finally {
      setLoadingProfile(false);
    }
  };

  // Handle Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorPassword(null);
    setSuccessPassword(null);

    if (newPassword !== confirmPassword) {
      setErrorPassword("New passwords do not match.");
      return;
    }
    // ... (other validations) ...

    setLoadingPassword(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        { currentPassword, newPassword },
        { headers: { "x-auth-token": token } }
      );
      setSuccessPassword(response.data.message);
      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorPassword(
        err.response?.data?.error || "Failed to change password."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  // --- 3. NEW: Handle Account Deletion ---
  const handleDeleteAccount = async () => {
    // Show a confirmation dialog
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete("http://localhost:3000/api/auth/delete-account", {
          headers: { "x-auth-token": token },
        });

        // Log the user out
        localStorage.removeItem("token");
        alert("Account deleted successfully.");
        navigate("/"); // Redirect to homepage
        window.location.reload(); // Refresh the app
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete account.");
      }
    }
  };

  // Custom Button Styles
  const btnPrimary =
    "w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400";
  const btnSecondary =
    "w-full py-2 px-4 rounded-lg text-gray-800 font-semibold shadow-md transition-colors duration-200 bg-gray-200 hover:bg-gray-300";
  const btnDanger =
    "py-2 px-5 rounded-lg text-white font-semibold shadow-md transition-colors duration-200 bg-red-600 hover:bg-red-700";

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-base-200 py-10 shadow-sm">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-base-content mb-2">
              {loadingUser
                ? "Loading Profile..."
                : user
                ? `Welcome, ${user.fullName}!`
                : "My Account"}
            </h1>
            <p className="text-base-content/70">
              Manage your profile, password, and account settings.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
          {loadingUser ? (
            <div className="text-center">
              <span className="loading loading-lg loading-spinner text-primary"></span>
            </div>
          ) : errorUser ? (
            <div className="alert alert-error">{errorUser}</div>
          ) : user ? (
            <>
              {/* --- 1. PROFILE CARD --- */}
              <div className="bg-base-200 p-8 rounded-lg shadow-xl border border-base-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-base-content">
                    Profile
                  </h2>
                  {!isEditingProfile && (
                    <button
                      onClick={() => {
                        setIsEditingProfile(true);
                        setErrorProfile(null);
                        setSuccessProfile(null);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Change
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    {/* ... (profile form) ... */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-medium">
                          Full Name
                        </span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-medium">
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    {errorProfile && (
                      <div className="alert alert-error text-sm">
                        {errorProfile}
                      </div>
                    )}
                    {successProfile && (
                      <div className="alert alert-success text-sm">
                        {successProfile}
                      </div>
                    )}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className={btnSecondary}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={btnPrimary}
                        disabled={loadingProfile}
                      >
                        {loadingProfile ? "Saving..." : "Save Profile"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {/* ... (static profile view) ... */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content/70">
                          Full Name
                        </span>
                      </label>
                      <p className="text-lg text-base-content font-medium">
                        {user.fullName}
                      </p>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content/70">
                          Email
                        </span>
                      </label>
                      <p className="text-lg text-base-content font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* --- 2. PASSWORD CARD --- */}
              <div className="bg-base-200 p-8 rounded-lg shadow-xl border border-base-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-base-content">
                    Password
                  </h2>
                  {!isEditingPassword && (
                    <button
                      onClick={() => {
                        setIsEditingPassword(true);
                        setErrorPassword(null);
                        setSuccessPassword(null);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Change
                    </button>
                  )}
                </div>

                {isEditingPassword ? (
                  <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                    {/* ... (password form) ... */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-medium">
                          Current Password
                        </span>
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input input-bordered w-full"
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input input-bordered w-full"
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    {errorPassword && (
                      <div className="alert alert-error text-sm">
                        {errorPassword}
                      </div>
                    )}
                    {successPassword && (
                      <div className="alert alert-success text-sm">
                        {successPassword}
                      </div>
                    )}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingPassword(false)}
                        className={btnSecondary}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={btnPrimary}
                        disabled={loadingPassword}
                      >
                        {loadingPassword ? "Saving..." : "Save Password"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="form-control">
                    {/* ... (static password view) ... */}
                    <label className="label">
                      <span className="label-text text-base-content/70">
                        Password
                      </span>
                    </label>
                    <p className="text-lg text-base-content font-medium">
                      **********
                    </p>
                  </div>
                )}
              </div>

              {/* --- 3. DELETE ACCOUNT CARD --- */}
              <div className="border border-error/50 rounded-lg shadow-xl">
                <div className="bg-error/10 p-8 rounded-t-lg flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-error">
                    Delete Account
                  </h2>
                </div>
                <div className="bg-base-200 p-8 rounded-b-lg">
                  <p className="text-base-content/70 mb-6">
                    Once you delete your account, there is no going back. All
                    your saved trips and profile data will be permanently lost.
                  </p>

                  {/* 4. CONNECTED THE BUTTON */}
                  <button onClick={handleDeleteAccount} className={btnDanger}>
                    Delete My Account
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info">User data not found.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
