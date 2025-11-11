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
    <div className="container mx-auto p-8 bg-gray-800 rounded-lg shadow-xl -mt-16 relative z-10">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Find Your Perfect Destination
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Weather</span>
          </label>
          <select
            className="select select-bordered"
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
            <span className="label-text text-white">Location Type</span>
          </label>
          <select
            className="select select-bordered"
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
            <span className="label-text text-white">Transport</span>
          </label>
          <select
            className="select select-bordered"
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
            <span className="label-text text-white">Max Budget ($)</span>
          </label>
          <input
            type="number"
            placeholder="e.g., 1000"
            className="input input-bordered"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            min="100"
            step="50"
          />
        </div>

        <div className="form-control md:col-span-3 lg:col-span-2">
          <label className="label">
            <span className="label-text text-white">
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
          <div className="w-full flex justify-between text-xs px-2 text-white">
            <span>1 day</span>
            <span>21 days</span>
          </div>
        </div>

        <div className="form-control md:col-span-3 lg:col-span-3 lg:col-start-2">
          <button
            type="submit"
            className="btn btn-primary btn-block text-lg mt-6"
          >
            Find Destinations
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
