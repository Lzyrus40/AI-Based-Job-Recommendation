import React from "react";

function AIRecommendations() {
  const recommendedJobs = [
    { title: "Machine Learning Engineer", confidence: "95%" },
    { title: "React Developer", confidence: "89%" },
     { title: "Node js Developer", confidence: "93%" },
  ];

  const fetchrecommendedJobs = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/recommendedjobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    });

    const data = await response.json();

    if (data.success) {
      setRecommendedJobs(data.recommendations);
    } else {
      console.error("Failed to fetch recommended jobs");
    }
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
  }
};

  fetchrecommendedJobs();

  return React.createElement(
    "ul",
    { className: "space-y-4" },
    recommendedJobs.map((job, index) =>
      React.createElement(
        "li",
        {
          key: index,
          className:
            "p-4 rounded-xl bg-black/50 border border-cream/30 hover:bg-black/60 transition flex justify-between items-center",
        },
        React.createElement(
          "div",
          null,
          React.createElement("h3", { className: "text-lg font-semibold" }, job.title),
          React.createElement(
            "p",
            { className: "text-sm text-cream/70" },
            `Match Confidence: ${job.confidence}`
          )
        ),
        React.createElement(
          "button",
          {
            className:
              "ml-4 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-cream/90 transition",
            onClick: () => alert(`Applying for ${job.title}`),
          },
          "Apply"
        )
      )
    )
  );
}

export default AIRecommendations;
