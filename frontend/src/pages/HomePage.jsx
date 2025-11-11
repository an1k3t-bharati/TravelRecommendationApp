import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import FilterSection from "../components/FilterSection.jsx";
import DestinationList from "../components/DestinationList.jsx";
import Footer from "../components/Footer.jsx";
import Location from "../components/Location.jsx";

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
    estimated_budget: "Medium",
    image_url: santoriniImage,
  },
];

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [weather, setWeather] = useState("Any");
  const [locationType, setLocationType] = useState("Any");
  const [transport, setTransport] = useState("Any");
  const [maxBudget, setMaxBudget] = useState(1000);
  const [duration, setDuration] = useState(7);

  useEffect(() => {
    setDestinations(trendingDestinations);
  }, []);
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setDestinations([]);

    try {
      const filterData = {
        weather: weather,
        locationType: locationType,
        transport: transport,
        maxBudget: maxBudget,
        duration: duration,
      };

      const response = await axios.post(
        "http://localhost:3000/api/recommend",
        filterData
      );

      const aiDestinations = response.data.map((dest) => ({
        ...dest,
        image_url: null,
      }));

      setDestinations(aiDestinations);
    } catch (err) {
      setError("Failed to get recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Banner />

        <FilterSection
          weather={weather}
          setWeather={setWeather}
          locationType={locationType}
          setLocationType={setLocationType}
          transport={transport}
          setTransport={setTransport}
          maxBudget={maxBudget}
          setMaxBudget={setMaxBudget}
          duration={duration}
          setDuration={setDuration}
          onSearch={handleSearch}
        />

        <div className="container mx-auto px-4 py-8">
          {loading && (
            <div className="text-center">
              <p>Loading AI recommendations...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DestinationList destinations={destinations} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
