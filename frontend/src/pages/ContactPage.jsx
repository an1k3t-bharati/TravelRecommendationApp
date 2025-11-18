import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* FIX: Use bg-base-100 for theme-aware background */}
      <main className="flex-grow pt-24 pb-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">
            Get In Touch
          </h1>
          <p className="text-center text-base-content mb-8">
            Have questions about your travel plans or need support with the app?
            We're here to help.
          </p>

          <div className="space-y-6">
            {/* Use bg-base-200 for theme-aware containers */}
            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-base-content mb-2">
                Technical Support
              </h3>
              <p className="text-base-content">
                Email: support@travelgoneright.com
              </p>
              <p className="text-base-content">Hours: Mon-Fri, 9am - 5pm GMT</p>
            </div>

            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-base-content mb-2">
                Partnerships & Media
              </h3>
              <p className="text-base-content">
                Email: partnerships@travelgoneright.com
              </p>
            </div>

            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-base-content mb-2">
                Our Office (Fictional)
              </h3>
              <p className="text-base-content">
                123 Travel Road, AI District, London, SW1A 0AA
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
