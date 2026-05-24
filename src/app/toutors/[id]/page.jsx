"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Clock, DollarSign, Users, Calendar, BookOpen, Layers } from "lucide-react";
import BookSessionModal from "@/app/components/BookSessionModal";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TutorDetailsPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(`${API}/tutors/${id}`);
        setTutor(res.data);
      } catch (err) {
        console.error("Failed to load tutor");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTutor();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!tutor) return <p className="text-center py-20">Tutor not found.</p>;

  const today = new Date();
  const sessionDate = new Date(tutor.sessionStartDate);
  const isDateRestricted = today < sessionDate;
  const isFullyBooked = tutor.totalSlot === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-2xl shadow-md overflow-hidden">

        {/* Header */}
        <div className="bg-blue-50 p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0">
            <Image src={tutor.photo} alt={tutor.tutorName} fill sizes="128px" className="object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800">{tutor.tutorName}</h1>
            <p className="text-blue-600 font-medium mt-1">{tutor.subject}</p>
            <span className="inline-block mt-2 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Available
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <DollarSign className="h-5 w-5" />, label: "Hourly Fee", value: `$${tutor.hourlyFee}` },
            { icon: <Users className="h-5 w-5" />, label: "Available Slots", value: tutor.totalSlot },
            { icon: <Calendar className="h-5 w-5" />, label: "Session Starts", value: new Date(tutor.sessionStartDate).toLocaleDateString() },
            { icon: <Clock className="h-5 w-5" />, label: "Time Slot", value: tutor.timeSlot },
            { icon: <Layers className="h-5 w-5" />, label: "Days", value: tutor.availableDays },
            { icon: <BookOpen className="h-5 w-5" />, label: "Experience", value: tutor.experience },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-blue-600 mt-0.5">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-semibold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Institution */}
        <div className="px-8 pb-4">
          <p className="text-gray-500 text-sm">
            Institution: <span className="text-slate-800 font-medium">{tutor.institution}</span>
          </p>
        </div>

        {/* Book Button */}
        <div className="px-8 pb-8">
          {isFullyBooked ? (
            <p className="text-red-500 font-medium">This session is fully booked.</p>
          ) : isDateRestricted ? (
            <p className="text-yellow-600 font-medium">
              Booking opens on {sessionDate.toLocaleDateString()}.
            </p>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Book Session
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <BookSessionModal tutor={tutor} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
}