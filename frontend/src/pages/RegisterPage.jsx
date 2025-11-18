import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegisterPage = () => {
  // 1. Add fullName state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    // ... (other validations) ...

    setLoading(true);

    try {
      // 2. Send fullName to the backend
      const response = await axios.post("http://localhost:3000/api/register", {
        fullName: fullName,
        email: email,
        password: password,
      });

      setLoading(false);
      setSuccess(response.data.message);

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setPassword2("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-base-200 py-12">
        <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-base-content">
            Create Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* --- 3. ADDED FULL NAME FIELD --- */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-base-content"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="input input-bordered w-full mt-1"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* --- END OF NEW FIELD --- */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input input-bordered w-full mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input input-bordered w-full mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-base-content"
              >
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                className="input input-bordered w-full mt-1"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {/* ... (error and success messages) ... */}

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* ... (link to login) ... */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
