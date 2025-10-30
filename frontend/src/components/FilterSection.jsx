import React, { useState } from "react";

const FilterSection = ({ onSearch }) => {
  const [weather, setWeather] = useState("");
  const [locationType, setLocationType] = useState("");
  const [budget, setBudget] = useState(1000);
  const [transport, setTransport] = useState("");
  const [duration, setDuration] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      weather,
      locationType,
      budget: Number(budget),
      transport,
      duration: Number(duration),
    });
  };

  return (
    <div className="bg-base-100 dark:bg-slate-900 dark:text-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto mt-[-50px] relative z-10 border dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Find Your Perfect Destination
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full border rounded-lg p-2 input input-bordered dark:bg-slate-800" // Added input-bordered
          >
            <option value="">Any</option>
            <option value="sunny">Sunny</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
            <option value="snowy">Snowy</option>
            <option value="mild">Mild</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            🏞️ Location Type
          </label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            className="w-full border rounded-lg p-2 input input-bordered dark:bg-slate-800"
          >
            <option value="">Any</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
            <option value="countryside">Countryside</option>
            <option value="historical">Historical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">✈️ Transport</label>
          <select
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="w-full border rounded-lg p-2 input input-bordered dark:bg-slate-800"
          >
            <option value="">Any</option>
            <option value="plane">Plane</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="car">Car</option>
          </select>
        </div>

        {/* Budget Input */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">
            Max Budget ($)
          </label>
          <input
            type="number"
            value={budget}
            min="100" // Optional: Set a minimum budget
            step="50" // Optional: Set step increment
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border rounded-lg p-2 input input-bordered dark:bg-slate-800"
            placeholder="e.g., 1000"
          />
        </div>

        {/* Duration Slider */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Duration ({duration} days)
          </label>
          <input
            type="range"
            min="1"
            max="21"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full range range-primary"
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1 day</span>
            <span>21 days</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 mt-4 text-center">
          <button type="submit" className="btn btn-primary px-8">
            Find Destinations
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
