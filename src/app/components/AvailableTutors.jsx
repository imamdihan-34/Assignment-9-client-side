"use client";

import { useEffect, useState } from "react";
import TutorCard from "../components/ToutorCard";
import axios from "axios";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const AvailableTutors = ({ showAll = false }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

  
      const res = await axios.get(
        `http://localhost:5000/tutors?${params.toString()}`
      );
      setTutors(showAll ? res.data : res.data.slice(0, 6));
    } catch (err) {
      console.error("Failed to load tutors", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors();
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    fetchTutors();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white">
          Available Tutors
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our top-rated tutors and book sessions based on your learning
          goals and schedule.
        </p>
      </div>

      {showAll && (
        <div className="mb-10 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tutor by name..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl outline-none focus:border-blue-500 transition"
              />
            </div>
            <button type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium">
              Search
            </button>
          </form>

          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Start Date
              </label>
              <input type="date" value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl outline-none focus:border-blue-500" />
            </div>

            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                End Date
              </label>
              <input type="date" value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl outline-none focus:border-blue-500" />
            </div>

            <div className="flex gap-3">
              <button onClick={fetchTutors}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
                <FiFilter />
                Filter
              </button>
              <button onClick={handleReset}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-5 py-3 rounded-xl hover:bg-gray-300 transition">
                <FiX />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
          <p className="text-gray-400 text-lg">No tutors found.</p>
          <button onClick={handleReset}
            className="mt-4 text-blue-600 hover:underline text-sm">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableTutors;