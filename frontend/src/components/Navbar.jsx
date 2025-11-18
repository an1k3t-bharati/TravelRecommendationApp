import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../appState/useTheme";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/destinations">Explore</Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link to="/saved-trips">Saved Trips</Link>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out 
        bg-base-100 text-base-content ${sticky ? "shadow-md" : ""}`}
    >
      <div className="navbar max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>

          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer text-primary"
          >
            Travel Gone Right
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end space-x-3">
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              className="toggle theme-controller"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full flex items-center justify-center bg-base-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                {/* --- SETTINGS LINK REMOVED --- */}
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm md:btn-md btn-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm md:btn-md btn-primary ml-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
