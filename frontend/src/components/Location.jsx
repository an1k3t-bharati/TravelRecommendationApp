import React from "react";

function Location({ item }) {
  const placeholderImage =
    "https://via.placeholder.com/400x200?text=Travel+Destination";

  return (
    <div className="card bg-base-100 shadow-xl border dark:border-gray-700 h-full flex flex-col">
      <figure className="h-48 overflow-hidden">
        <img
          src={item.image_url || placeholderImage}
          alt={item.destination_name || "Travel Destination"}
          className="w-full h-full object-cover"
        />
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
        <p className="text-sm flex-grow">{item.description}</p>{" "}
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
