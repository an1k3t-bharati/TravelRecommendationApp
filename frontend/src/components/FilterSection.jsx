import React from "react";

const FilterSection = ({
  weather,
  setWeather,
  locationType,
  setLocationType,
  transport,
  setTransport,
  maxBudget,
  setMaxBudget,
  duration,
  setDuration,
  onSearch,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FilterSection: Form submitted! Calling onSearch...");
    onSearch();
  };

  return (
    <div className="flex justify-center relative z-10 w-full px-4 pb-16">
      <div
        className="w-full max-w-5xl p-8 space-y-6 
        bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl 
        dark:bg-black/30  
        dark:border dark:border-white/20"
      >
        <h3
          className="text-3xl font-extrabold text-center 
          text-base-content"
        >
          Find Your Perfect Destination
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <div className="form-control">
            <label className="label">
              <span
                className="label-text font-semibold 
                text-base-content"
              >
                Weather
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            >
              <option>Any</option>
              <option>Warm</option>
              <option>Cold</option>
              <option>Temperate</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Location Type
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
            >
              <option>Any</option>
              <option>Beach</option>
              <option>City</option>
              <option>Mountains</option>
              <option>Countryside</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Transport
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option>Any</option>
              <option>Public Transport</option>
              <option>Rental Car</option>
              <option>Walking</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Max Budget ($)
              </span>
            </label>
            <input
              type="number"
              placeholder="e.g., 1000"
              className="input input-bordered w-full"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              min="100"
              step="50"
            />
          </div>

          <div className="form-control md:col-span-2 lg:col-span-full">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Duration ({duration} days)
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="21"
              className="range range-primary"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2 text-base-content">
              <span>1 day</span>
              <span>21 days</span>
            </div>
          </div>

          <div className="form-control md:col-span-2 lg:col-span-full pt-4">
            <button type="submit" className="btn btn-neutral btn-block text-lg">
              Find Destinations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSection;
