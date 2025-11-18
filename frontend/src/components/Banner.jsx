import React from "react";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto px-6 flex flex-col justify-center text-center py-20 md:py-28">
      <div className="space-y-8">
        <h1
          className="text-4xl md:text-6xl font-extrabold 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-primary to-sky-400 
          drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] 
          animate-pulse-slow"
        >
          Let Curiosity Be Your Compass
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Discover amazing destinations tailored just for you. Tell us your
          preferences, and let our AI guide you to your next unforgettable
          adventure. Start exploring the world!
        </p>
      </div>
    </div>
  );
}

export default Banner;
