import React from "react";
import Location from "./Location";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DestinationList = ({ destinations }) => {
  var settings = {
    dots: true,
    infinite: destinations.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (!Array.isArray(destinations) || destinations.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((item, index) => (
        <Location key={index} item={item} />
      ))}
    </div>
  );
};

export default DestinationList;
