import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import FilterSection from "../components/FilterSection.jsx";
import DestinationList from "../components/DestinationList.jsx";
import Footer from "../components/Footer.jsx";
import banner from "../assets/Banner.jpg";
import parisImage from "../assets/paris.jpg";
import kyotoImage from "../assets/kyoto.jpg";
import santoriniImage from "../assets/santorini.jpg";

const trendingDestinations = [
  // ... (your trending destinations array)
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
  // 2. REMOVED loading, error, and destinations state.
  //    This component now *only* manages the filter state.
  const [weather, setWeather] = useState("Any");
  const [locationType, setLocationType] = useState("Any");
  const [transport, setTransport] = useState("Any");
  const [maxBudget, setMaxBudget] = useState(1000);
  const [duration, setDuration] = useState(7);

  const navigate = useNavigate(); // 3. Initialize the navigate function

  // 4. NEW handleSearch function
  const handleSearch = () => {
    // Create a query string from the filter state
    const queryParams = new URLSearchParams({
      weather,
      locationType,
      transport,
      maxBudget,
      duration,
    }).toString();

    // Navigate to the results page with the query string
    navigate(`/results?${queryParams}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div
          className="relative bg-cover bg-center pt-24"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent"></div>
          <div className="relative z-10">
            <Banner />
            <FilterSection
              // Pass all state and the new search handler
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
          </div>
        </div>

        {/* 5. This list now *only* shows trending destinations */}
        <div className="bg-base-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-12">
              Trending Destinations
            </h2>
            <DestinationList destinations={trendingDestinations} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
