"use client";
import React, { useEffect, useState } from "react";
import AllJobListings from "./AllJobListings/page.js";
import AIRecommendations from "./AIRecommendations/page.js";
import { Briefcase, Sparkles, LayoutDashboard } from "lucide-react";

function JobsDashboard() {
  const [showAI, setShowAI] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const handleFindMatch = () => {
    setShowAI(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      console.log("No auth token found, redirecting to login");
      window.location.href = "/";
    } else {
      setIsAuthChecked(true);
    }

    return () => {
      console.log("Unmounting JobsDashboard component");
    };
  }, []);

  if (!isAuthChecked) {
    // Optional: Return a loading spinner or null while checking auth
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 mt-16 flex flex-col gap-10 text-cream">
      {/* Page Heading */}
      <div className="flex items-center gap-3">
        <LayoutDashboard size={32} className="text-cream" />
        <h1 className="text-4xl font-extrabold tracking-tight">Jobs Dashboard</h1>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* All Job Listings section */}
        <div className="lg:col-span-2 bg-black/80 border border-cream/20 backdrop-blur-md rounded-3xl p-8 text-cream shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase size={28} className="text-cream" />
              <h2 className="text-3xl font-bold tracking-tight">All Job Listings</h2>
            </div>
            <button
              onClick={handleFindMatch}
              className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition"
            >
              Find my match
            </button>
          </div>
          <AllJobListings />
        </div>

        {/* Conditionally render AI Recommendations */}
        {showAI && (
          <div className="bg-black/80 border border-cream/20 backdrop-blur-md rounded-3xl p-8 text-cream shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={28} className="text-yellow-400" />
              <h2 className="text-3xl font-bold tracking-tight">AI Recommendations</h2>
            </div>
            <AIRecommendations />
          </div>
        )}
      </div>
    </section>
  );
}

export default JobsDashboard;
