"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import PrivateRoute from "@/app/components/PrivateRoute";
import toast from "react-hot-toast";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ studentName: "", phone: "" });

  // Server থেকে bookings আনো
  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(`${API}/bookings?email=${user.email}`);
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user?.email) fetchBookings();
  }, [user]);

  // Cancel
  const handleCancel = async (id) => {
    try {
      await axios.delete(`${API}/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled!");
    } catch (err) {
      toast.error("Failed to cancel booking!");
    }
  };

  // Edit শুরু
  const handleEditStart = (booking) => {
    setEditId(booking._id);
    setEditData({ studentName: booking.studentName, phone: booking.phone });
  };

  // Edit সেভ
  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`${API}/bookings/${id}`, editData);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );
      setEditId(null);
      toast.success("Booking updated!");
    } catch (err) {
      toast.error("Failed to update booking!");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <PrivateRoute>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-500 mb-8">Total: {bookings.length} booking(s)</p>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-lg">No bookings yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white border rounded-2xl p-6 shadow-sm">

                {editId === b._id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <p className="font-bold text-blue-600">{b.tutorName} — {b.subject}</p>
                    <input
                      type="text"
                      value={editData.studentName}
                      onChange={(e) => setEditData({ ...editData, studentName: e.target.value })}
                      className="w-full border p-2 rounded-xl outline-none focus:border-blue-500"
                      placeholder="Student Name"
                    />
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full border p-2 rounded-xl outline-none focus:border-blue-500"
                      placeholder="Phone Number"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditSave(b._id)}
                        className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{b.tutorName}</h3>
                      <p className="text-blue-600 text-sm">{b.subject}</p>
                      <p className="text-gray-500 text-sm mt-1">👤 {b.studentName}</p>
                      <p className="text-gray-500 text-sm">📞 {b.phone}</p>
                      <p className="text-gray-500 text-sm">🕒 {b.timeSlot}</p>
                      <p className="text-gray-500 text-sm">💰 ${b.hourlyFee}/hr</p>
                      <p className="text-gray-400 text-xs mt-1">Booked: {new Date(b.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditStart(b)}
                        className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default MyBookingsPage;