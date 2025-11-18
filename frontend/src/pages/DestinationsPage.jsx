import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const DestinationCard = ({ title, description, path, imageClass }) => (
  // This component is fine, no changes needed
  <div className={`card bg-base-100 shadow-xl image-full h-80 ${imageClass}`}>
    <figure></figure>
    <div className="card-body justify-center items-center text-center">
      <h2 className="card-title text-3xl text-white drop-shadow-lg">{title}</h2>
      <p className="text-white drop-shadow-md">{description}</p>
      <div className="card-actions justify-end mt-4">
        <Link to={path} className="btn btn-primary">
          Explore Now
        </Link>
      </div>
    </div>
  </div>
);

const DestinationsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* FIX: Use bg-base-100 for theme-aware background */}
      <main className="flex-grow pt-24 pb-16 bg-base-100">
        <div className="container mx-auto px-4">
          {/* FIX: Use text-base-content for theme-aware text */}
          <h1 className="text-4xl font-extrabold text-center text-base-content mb-10">
            Discover Your Next Adventure
          </h1>
          {/* FIX: Use text-base-content for theme-aware text */}
          <p className="text-center text-lg text-base-content mb-12 max-w-3xl mx-auto">
            Browse travel ideas by mood, setting, or experience. Use the search
            on the Home page for personalized AI recommendations!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              title="Tropical Beaches"
              description="Sun, sand, and turquoise waters. Perfect for relaxation and snorkeling."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/beach/600/400')]"
            />
            <DestinationCard
              title="Vibrant Cities"
              description="Culture, cuisine, and history. Explore the world's most dynamic urban centers."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/city/600/400')]"
            />
            <DestinationCard
              title="Mountain Retreats"
              description="Fresh air, stunning views, and challenging hiking trails."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/mountain/600/400')]"
            />
            <DestinationCard
              title="Historic Wonders"
              description="Journey through time and discover ancient ruins and monuments."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/ruins/600/400')]"
            />
            <DestinationCard
              title="Budget Backpacker"
              description="Travel further, spend less. Ideas optimized for cost-effective journeys."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/backpack/600/400')]"
            />
            <DestinationCard
              title="Luxury Escapes"
              description="Indulge in five-star service and world-class accommodation."
              path="/"
              imageClass="bg-[url('https://picsum.photos/seed/luxury/600/400')]"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
