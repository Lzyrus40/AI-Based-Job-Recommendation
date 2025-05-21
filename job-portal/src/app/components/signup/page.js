"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

function Signuppage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: [],
    location: "",
    yearsOfExperience: "",
    preferredJobType: "any",
  });

  const [skillInput, setSkillInput] = useState("");
  const locationInputRef = useRef(null);

  // Add Google Places Autocomplete to location input
  useEffect(() => {
    if (!window.google || !locationInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
      types: ["(cities)"], // you can also use geocode, address, etc.
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setFormData((prev) => ({
        ...prev,
        location: place.formatted_address || place.name,
      }));
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (formData.skills.length < 7 && !formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data submitted:", formData);
    // TODO: Submit logic
    fetch("http://localhost:4000/api/v1/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
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
    <section className="max-w-3xl mx-auto bg-black/80 backdrop-blur-md rounded-3xl p-10 mt-16 text-cream shadow-lg border border-cream/20">
      <h2 className="text-3xl font-bold mb-8 text-center">Create Your Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        autoComplete="off"
      >
        <label className="flex flex-col text-sm font-semibold">
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
        </label>

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

        <label className="flex flex-col text-sm font-semibold">
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            ref={locationInputRef}
            onChange={handleChange}
            placeholder="Your city or region"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold md:col-span-2">
          Skills
          <input
            type="text"
            name="skillInput"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-cream/20 text-cream px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
          {formData.skills.length >= 7 && (
            <p className="text-xs text-red-400 mt-1">You can only add up to 7 skills.</p>
          )}
        </label>

        <label className="flex flex-col text-sm font-semibold">
          Years of yearsOfExperience
          <input
            type="number"
            name="yearsOfExperience"
            min="0"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            placeholder="0"
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold">
          Preferred Job Type
          <select
            name="preferredJobType"
            value={formData.preferredJobType}
            onChange={handleChange}
            className="mt-1 px-4 py-2 rounded-xl bg-black/50 border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream transition"
          >
            <option value="remote">remote</option>
            <option value="onsite">onsite</option>
            <option value="any">any</option>
          </select>
        </label>

        <button
          type="submit"
          className="md:col-span-2 mt-6 bg-white text-black font-semibold rounded-xl py-3 hover:bg-cream/90 transition"
        >
          Create Profile
        </button>
      </form>
      {/* Sign-in redirect link */}
      <p className="text-center text-sm mt-6 text-cream/80">
        Already have an Profile?{" "}
        <a
          href="/components/signin"
          className="text-cream underline hover:text-white font-semibold"
        >
          Log in
        </a>
      </p>
    </section>
  );
}

export default Signuppage;
