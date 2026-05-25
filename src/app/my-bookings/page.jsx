"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import PrivateRoute from "@/app/components/PrivateRoute";
import toast from "react-hot-toast";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const MyBookingsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "My Bookings | MediQueue";
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}`);
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      toast.success("Booking cancelled!");
    } catch (err) {
      toast.error("Failed to cancel booking!");
    }
    setConfirmId(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          My Booked Sessions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Total: {bookings.length} booking(s)
        </p>

        {bookings.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <p className="text-gray-400 text-lg">No bookings yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Book a session from the Tutors page.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-4 text-left">#</th>
                  <th className="px-5 py-4 text-left">Tutor</th>
                  <th className="px-5 py-4 text-left">Student</th>
                  <th className="px-5 py-4 text-left">Email</th>
                  <th className="px-5 py-4 text-left">Time</th>
                  <th className="px-5 py-4 text-left">Fee</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                {bookings.map((b, i) => (
                  <tr
                    key={b._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800 dark:text-white">
                        {b.tutorName}
                      </p>
                      <p className="text-blue-600 text-xs">{b.subject}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {b.studentName}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {b.userEmail}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {b.timeSlot}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      ${b.hourlyFee}/hr
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {b.status === "cancelled" ? "Cancelled" : "Confirmed"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {b.status === "cancelled" ? (
                        <span className="text-gray-400 text-xs">—</span>
                      ) : (
                        <button
                          onClick={() => setConfirmId(b._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl w-full max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold mb-2 dark:text-white">
              Cancel Booking?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleCancel(confirmId)}
                className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setConfirmId(null)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
};

export default MyBookingsPage;
