import React, { useState } from "react";
import axios from "axios";

function Location({ item }) {
  const placeholderImage =
    "https://via.placeholder.com/400x200?text=Travel+Destination";

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSaveTrip = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to save a trip.");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await axios.post("http://localhost:3000/api/trips/save", item, {
        headers: {
          "x-auth-token": token,
        },
      });

      setIsSaving(true);
      alert("Trip saved!");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Could not save trip.";
      setSaveError(errorMsg);
      setIsSaving(false);
      alert(errorMsg);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border dark:border-gray-700 h-full flex flex-col">
      <figure className="h-48 overflow-hidden relative">
        <img
          src={item.image_url || placeholderImage}
          alt={item.destination_name || "Travel Destination"}
          className="w-full h-full object-cover"
        />

        <button
          className="btn btn-circle absolute top-2 right-2 
                     bg-black/30 hover:bg-black/50 border-none"
          onClick={handleSaveTrip}
          disabled={isSaving}
          aria-label="Save destination"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isSaving ? "fill-primary" : "stroke-white"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </figure>

      <div className="card-body flex flex-col flex-grow">
        <h2 className="card-title">
          {item.destination_name}
          {item.country && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({item.country})
            </span>
          )}
        </h2>
        <p className="text-sm flex-grow">{item.description}</p>
        <div className="card-actions justify-end mt-4">
          {item.estimated_budget && (
            <div className="badge badge-outline badge-accent">
              {item.estimated_budget} Budget
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Location;
