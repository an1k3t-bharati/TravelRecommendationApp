import React from "react";
import banner from "../assets/Banner.jpg";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        {" "}
        <div className="order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-8">
            {" "}
            <h1 className="text-3xl md:text-4xl font-bold">
              Let <span className="text-primary">Curiosity</span> Be Your
              Compass
            </h1>
            <p className="text-md md:text-xl">
              Discover amazing destinations tailored just for you. Tell us your
              preferences, and let our AI guide you to your next unforgettable
              adventure. Start exploring the world!
            </p>
          </div>
        </div>
        <div className="order-1 w-full md:w-1/2 mt-10 md:mt-20 flex justify-center items-center">
          {" "}
          <img
            src={banner}
            className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
            alt="Scenic travel banner showing mountains and a lake"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
