import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationList from "../components/DestinationList";
import { Link } from "react-router-dom";

const SavedTripsPage = () => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedTrips = async () => {
      // 1. Get the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view saved trips.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 2. Call the protected API endpoint
        const response = await axios.get("http://localhost:3000/api/trips", {
          headers: {
            "x-auth-token": token, // Send the auth token
          },
        });

        // 3. Set the state with the saved trips
        setSavedTrips(response.data);
      } catch (err) {
        setError("Could not fetch saved trips. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTrips();
  }, []); // Runs once when the page loads

  // --- Helper content for loading/error/empty states ---
  let content;
  if (loading) {
    content = (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner text-primary"></span>
        <p className="text-lg text-base-content mt-4">
          Loading your saved trips...
        </p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="alert alert-error shadow-lg">
        <div>
          <span>{error}</span>
        </div>
      </div>
    );
  } else if (savedTrips.length === 0) {
    content = (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-base-content mb-4">
          You have no saved trips.
        </h2>
        <p className="text-base-content/70 mb-6">
          Start exploring and save your favorite destinations!
        </p>
        <Link to="/destinations" className="btn btn-primary">
          Explore Destinations
        </Link>
      </div>
    );
  } else {
    // 4. If we have trips, display them using the component you already built
    content = <DestinationList destinations={savedTrips} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* --- Header Section --- */}
        <div className="bg-base-200 py-10 shadow-sm">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-base-content mb-2">
              Your Saved Trips
            </h1>
            <p className="text-base-content/70">
              Here are the destinations you've bookmarked for future adventures.
            </p>
          </div>
        </div>

        {/* --- Results Area --- */}
        <div className="container mx-auto px-4 py-16">{content}</div>
      </main>

      <Footer />
    </div>
  );
};

export default SavedTripsPage;
