"use client";
import React, { useState } from "react";
import Link from "next/link"; // use this only if you're using Next.js

function Signinpage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signin data submitted:", formData);
    // TODO: Add login logic
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success (e.g., redirect to login page)
        localStorage.setItem("authtoken",data.authtoken);
        window.location.href = "/components/JobsDashboard";        
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <section className="max-w-md mx-auto bg-black/80 backdrop-blur-md rounded-3xl p-10 mt-24 text-cream shadow-lg border border-cream/20">
      <h2 className="text-3xl font-bold mb-8 text-center">Log In to Your Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6"
        autoComplete="off"
      >
        <label className="flex flex-col text-sm font-semibold">
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@mail.com"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="********"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-white text-black font-semibold rounded-xl py-3 hover:bg-cream/90 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-cream/80">
        Don’t have an profile?{" "}
        <Link
          href="/components/signup"
          className="text-cream underline hover:text-white font-semibold"
        >
          Create one
        </Link>
      </p>
    </section>
  );
}

export default Signinpage;
