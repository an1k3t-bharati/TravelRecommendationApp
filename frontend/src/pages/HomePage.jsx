import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FilterSection from "../components/FilterSection";
import DestinationList from "../components/DestinationList";
import Footer from "../components/Footer";
import Location from "../components/Location";

import parisImage from "../assets/paris.jpg";
import kyotoImage from "../assets/kyoto.jpg";
import santoriniImage from "../assets/santorini.jpg";
const trendingDestinations = [
  {
    destination_name: "Paris",
    country: "France",
    description: "City of lights, known for its art, fashion and culture.",
    estimated_budget: "High",
    image_url: parisImage,
  },
  {
    destination_name: "Kyoto",
    country: "Japan",
    description:
      "Famous for its classical Buddhist temples, gardens, imperial palaces.",
    estimated_budget: "Medium",
    image_url: kyotoImage,
  },
  {
    destination_name: "Santorini",
    country: "Greece",
    description:
      "Iconic whitewashed villages clinging to cliffs above the Aegean Sea.",
    estimated_budget: "High",
    image_url: santoriniImage,
  },
];

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    setDestinations([]);
    console.log("Sending filters to backend:", filters);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recommend",
        filters
      );
      console.log("Received response from backend:", response.data);

      if (Array.isArray(response.data)) {
        setDestinations(response.data);

        document
          .getElementById("results-section")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Backend did not return an array:", response.data);
        setError("Received invalid data format from the server.");
        setDestinations([]);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Is the backend running?");
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 dark:bg-slate-900 dark:text-white">
      <Navbar />
      <main className="flex-grow pt-16">
        <Banner />
        <FilterSection onSearch={handleSearch} />

        <div
          id="results-section"
          className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-12 mb-12"
        >
          {loading && (
            <div className="text-center py-10">
              <span className="loading loading-lg loading-spinner text-primary"></span>
              <p>🌍 Finding destinations...</p>
            </div>
          )}
          {error && (
            <p className="text-center text-red-500 text-lg py-10">{error}</p>
          )}

          {!loading && !error && destinations.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Here's What We Found For You:
              </h2>
              <DestinationList destinations={destinations} />
            </>
          )}

          {!loading && !error && destinations.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg">
                Select your preferences above to discover amazing destinations!
              </p>
            </div>
          )}
        </div>

        <section className="py-12 bg-base-200 dark:bg-slate-800">
          <div className="max-w-screen-xl container mx-auto md:px-20 px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4">
                <div className="text-4xl mb-2">1️⃣</div>
                <h3 className="font-semibold text-lg mb-1">Set Filters</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your ideal weather, location, budget, and more.
                </p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">2️⃣</div>
                <h3 className="font-semibold text-lg mb-1">AI Magic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our smart AI analyzes your preferences to find perfect
                  matches.
                </p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">3️⃣</div>
                <h3 className="font-semibold text-lg mb-1">Explore!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get personalized destination recommendations instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {!loading && !error && destinations.length === 0 && (
          <section className="py-12">
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Trending Destinations
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingDestinations.map((item, index) => (
                  <Location key={`trending-${index}`} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
