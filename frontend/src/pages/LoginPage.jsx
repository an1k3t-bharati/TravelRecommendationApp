import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      setLoading(false);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* FIX: Use bg-base-200 for theme-aware background */}
      <main className="flex-grow flex items-center justify-center bg-base-200 py-12">
        {/* FIX: Use bg-base-100 for the card background */}
        <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
          {/* FIX: Use text-base-content for theme-aware text */}
          <h2 className="text-3xl font-bold text-center text-base-content">
            Sign in to Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                required
                className="input input-bordered w-full mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="text-sm text-center">
            {/* FIX: Use text-base-content for theme-aware text */}
            <span className="text-base-content">Don't have an account? </span>
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
