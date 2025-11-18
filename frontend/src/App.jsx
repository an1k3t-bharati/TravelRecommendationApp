import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResultsPage from "./pages/ResultsPage";
import SavedTripsPage from "./pages/SavedTripsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/saved-trips" element={<SavedTripsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
