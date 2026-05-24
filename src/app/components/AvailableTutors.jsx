"use client";

import { useEffect, useState } from "react";
import TutorCard from "../components/ToutorCard";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const AvailableTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${API}/tutors`);
        setTutors(res.data);
      } catch (err) {
        console.error("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white">Available Tutors</h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our top-rated tutors and book sessions
          based on your learning goals and schedule.
        </p>
      </div>

      {tutors.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No tutors available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableTutors;