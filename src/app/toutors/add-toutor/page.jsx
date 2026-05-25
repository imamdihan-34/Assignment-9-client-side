"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import PrivateRoute from "../../components/PrivateRoute";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Bangla",
  "History",
  "ICT",
  "Accounting",
  "Other",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

export default function AddTutorPage() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tutorName: "",
    photo: "",
    subject: "",
    availableDays: "",
    timeSlot: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "",
  });
  useEffect(() => {
    document.title = "Add Tutor | MediQueue";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosSecure.post("/tutors", {
        ...form,
        hourlyFee: Number(form.hourlyFee),
        totalSlot: Number(form.totalSlot),
        userEmail: user?.email,
        userName: user?.displayName,
      });

      toast.success("Tutor added successfully!");
      setForm({
        tutorName: "",
        photo: "",
        subject: "",
        availableDays: "",
        timeSlot: "",
        hourlyFee: "",
        totalSlot: "",
        sessionStartDate: "",
        institution: "",
        experience: "",
        location: "",
        teachingMode: "",
      });
    } catch (err) {
      toast.error("Failed to add tutor!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold dark:text-white">
            Add a New Tutor
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Fill in the details to list a tutor on MediQueue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Tutor Name
              </label>
              <input
                name="tutorName"
                value={form.tutorName}
                onChange={handleChange}
                required
                placeholder="Full name"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Photo URL
              </label>
              <input
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="https://i.ibb.co/..."
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Select subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Available Days
              </label>
              <input
                name="availableDays"
                value={form.availableDays}
                onChange={handleChange}
                required
                placeholder="e.g. Sun - Thu"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Time Slot
              </label>
              <input
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                required
                placeholder="e.g. 5:00 PM - 8:00 PM"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Hourly Fee ($)
              </label>
              <input
                name="hourlyFee"
                type="number"
                min="0"
                value={form.hourlyFee}
                onChange={handleChange}
                required
                placeholder="e.g. 25"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Total Slots
              </label>
              <input
                name="totalSlot"
                type="number"
                min="1"
                value={form.totalSlot}
                onChange={handleChange}
                required
                placeholder="e.g. 10"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Session Start Date
              </label>
              <input
                name="sessionStartDate"
                type="date"
                value={form.sessionStartDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Institution
              </label>
              <input
                name="institution"
                value={form.institution}
                onChange={handleChange}
                required
                placeholder="e.g. BUET, DU"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Experience
              </label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                placeholder="e.g. 5 years"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. Dhaka, Mirpur"
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-sm dark:text-gray-300">
                Teaching Mode
              </label>
              <select
                name="teachingMode"
                value={form.teachingMode}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Select mode</option>
                {TEACHING_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Adding Tutor..." : "Add Tutor"}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}
