import React from "react";
import Location from "./Location";

const DestinationList = ({ destinations }) => {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No destinations found. Try adjusting your search filters!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Location key={destination.destination_name} item={destination} />
      ))}
    </div>
  );
};

export default DestinationList;
