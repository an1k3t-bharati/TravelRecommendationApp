import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* FIX: Use bg-base-100 for theme-aware background */}
      <main className="flex-grow pt-24 pb-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">
            Our Mission: AI-Driven Travel
          </h1>
          {/* Use text-base-content for theme-aware text */}
          <p className="text-base-content mb-6 leading-relaxed">
            Travel Gone Right was founded on the principle of making
            personalized travel effortless. We combine the power of the MERN
            stack with the intelligence of the Gemini API to analyze your unique
            preferences—from budget and duration to desired weather—and deliver
            tailored destination recommendations instantly.
          </p>
          <p className="text-base-content mb-6 leading-relaxed">
            Our goal is to move beyond generic travel guides. By integrating
            real-time AI processing with image search capabilities, we ensure
            every recommendation is not only relevant but also visually
            inspiring, helping you discover your next unforgettable journey.
          </p>

          {/* Use bg-base-200 for a theme-aware container */}
          <div className="bg-base-200 p-6 rounded-lg mt-10">
            <h3 className="text-2xl font-semibold text-base-content mb-3">
              Technology Stack
            </h3>
            <ul className="list-disc list-inside text-base-content">
              <li>**Frontend:** React with Tailwind CSS and Daisy UI</li>
              <li>
                **Backend:** Node.js and Express for routing and API
                orchestration
              </li>
              <li>**Database:** MongoDB for persistent user and trip data</li>
              <li>
                **AI Engine:** Google Gemini API for intelligent recommendations
              </li>
              <li>
                **Media:** Unsplash API for visually stunning destination images
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
