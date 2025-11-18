import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationList from "../components/DestinationList";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();

  const [destinations, setDestinations] = useState([]);
  const [sortedDestinations, setSortedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("popularity"); // Default sort

  // Get filter params from URL to display in the summary
  const weather = searchParams.get("weather");
  const locationType = searchParams.get("locationType");
  const maxBudget = searchParams.get("maxBudget");
  const duration = searchParams.get("duration");

  // 1. On page load, get URL params and fetch data
  useEffect(() => {
    const filters = {
      weather,
      locationType,
      transport: searchParams.get("transport"),
      maxBudget,
      duration,
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/recommend",
          filters
        );

        // --- FIX: Removed the mapping logic ---
        // We set the data directly from the API.
        // Location.jsx will handle the missing image_url.
        setDestinations(response.data);
        setSortedDestinations(response.data); // Init sorted list
      } catch (err) {
        setError("Failed to get recommendations. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // 2. When the sort order or data changes, re-sort the list
  useEffect(() => {
    let sorted = [...destinations];
    if (sortBy === "popularity") {
      // Sort by popularity, descending (10 is most popular)
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "cost_low") {
      sorted.sort((a, b) => a.estimated_budget - b.estimated_budget);
    } else if (sortBy === "cost_high") {
      sorted.sort((a, b) => b.estimated_budget - a.estimated_budget);
    }
    setSortedDestinations(sorted);
  }, [sortBy, destinations]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      {/* pt-16 to offset the fixed navbar */}
      <main className="flex-grow pt-16">
        {/* --- Attractive Header Section --- */}
        <div className="bg-base-200 py-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Left Side: Title and Search Summary */}
              <div>
                <h1 className="text-4xl font-bold text-base-content mb-2">
                  Your Adventure Awaits
                </h1>
                {/* Search Summary Text */}
                <p className="text-base-content/70">
                  Showing {destinations.length} results for a {duration}-day,
                  {weather !== "Any" && ` ${weather.toLowerCase()}`} trip
                  {locationType !== "Any" && ` (${locationType})`} with a $
                  {maxBudget} budget.
                </p>
              </div>

              {/* Right Side: Sorting Dropdown */}
              <div className="form-control w-full md:max-w-xs">
                <label className="label">
                  <span className="label-text text-base-content">Sort by</span>
                </label>
                <select
                  className="select select-bordered"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Most Popular</option>
                  <option value="cost_low">Price: Low to High</option>
                  <option value="cost_high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* --- RESULTS AREA --- */}
        <div className="container mx-auto px-4 py-16">
          {loading && (
            <div className="text-center py-20">
              <span className="loading loading-lg loading-spinner text-primary"></span>
              <p className="text-lg text-base-content mt-4">
                Generating your custom trip ideas...
              </p>
            </div>
          )}

          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <span>{error}</span>
              </div>
            </div>
          )}

          {!loading && !error && (
            <DestinationList destinations={sortedDestinations} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;
