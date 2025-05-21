import React, { useEffect, useState } from "react";

function AllJobListings() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/alljobs?page=${page}&limit=10`);
      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await res.json();
      setJobs(data.jobs);
      setCurrentPage(Number(data.currentPage)); // Fix: convert to number
      setTotalPages(Number(data.totalPages));   // Also ensure this is number
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p className="text-center text-cream">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section>
      <ul className="space-y-4">
        {jobs.map((job, index) => (
          <li
            key={job._id || index}
            className="p-4 rounded-xl bg-black/50 border border-cream/30 hover:bg-black/60 transition flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-cream/80">
                {job.company || "Unknown Company"} – {job.location}
              </p>
            </div>
            <button
              className="ml-4 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-cream/90 transition"
              onClick={() => alert(`Applying for ${job.title} at ${job.company || "the company"}`)}
            >
              Apply
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 text-cream">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-cream/30"}`}
        >
          Prev
        </button>
        <span className="px-3 py-1 rounded border border-cream/30">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-cream/30"}`}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default AllJobListings;
