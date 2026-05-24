"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
import Spinner from "../components/Spinner";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import axios from "axios"; // ✅ যোগ করলাম

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyTutorsPage() {
  const { user } = useContext(AuthContext);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTarget, setUpdateTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editData, setEditData] = useState({});

  // Server থেকে tutors আনো
  const fetchMyTutors = async () => {
    try {
      const res = await axios.get(`${API}/tutors/my-tutors?email=${user?.email}`);
      setTutors(res.data);
    } catch (err) {
      toast.error("Failed to load your tutors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyTutors();
    else setLoading(false);
  }, [user]);

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/tutors/${id}`);
      setTutors((prev) => prev.filter((t) => t._id !== id));
      toast.success("Tutor deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete tutor.");
    }
    setDeleteTarget(null);
  };

  // Edit শুরু
  const handleEditStart = (tutor) => {
    setUpdateTarget(tutor._id);
    setEditData({
      tutorName: tutor.tutorName,
      subject: tutor.subject,
      hourlyFee: tutor.hourlyFee,
      totalSlot: tutor.totalSlot,
    });
  };

  // Edit সেভ
  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`${API}/tutors/${id}`, editData);
      setTutors((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      setUpdateTarget(null);
      toast.success("Tutor updated successfully.");
    } catch (err) {
      toast.error("Failed to update tutor.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">My Tutors</h1>
          <p className="text-gray-500 mt-1">Manage tutors you have listed on MediQueue</p>
        </div>

        {tutors.length === 0 ? (
          <div className="text-center py-24 bg-white border rounded-2xl">
            <BookOpen className="h-14 w-14 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">No tutors listed yet</h2>
            <p className="text-gray-500 mt-2">Start by adding a tutor from the &quot;Add Tutor&quot; page.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-5 py-4 text-left">#</th>
                  <th className="px-5 py-4 text-left">Tutor</th>
                  <th className="px-5 py-4 text-left">Subject</th>
                  <th className="px-5 py-4 text-left">Fee/hr</th>
                  <th className="px-5 py-4 text-left">Slots</th>
                  <th className="px-5 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {tutors.map((tutor, i) => (
                  <tr key={tutor._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {tutor.photo && (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                            <Image src={tutor.photo} alt={tutor.tutorName} fill sizes="40px" className="object-cover" />
                          </div>
                        )}
                        <span className="font-medium">{tutor.tutorName}</span>
                      </div>
                    </td>

                    {updateTarget === tutor._id ? (
                      <>
                        <td className="px-5 py-4">
                          <input value={editData.subject}
                            onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                            className="border rounded-lg p-1 w-full" />
                        </td>
                        <td className="px-5 py-4">
                          <input value={editData.hourlyFee} type="number"
                            onChange={(e) => setEditData({ ...editData, hourlyFee: e.target.value })}
                            className="border rounded-lg p-1 w-20" />
                        </td>
                        <td className="px-5 py-4">
                          <input value={editData.totalSlot} type="number"
                            onChange={(e) => setEditData({ ...editData, totalSlot: e.target.value })}
                            className="border rounded-lg p-1 w-20" />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditSave(tutor._id)}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600">Save</button>
                            <button onClick={() => setUpdateTarget(null)}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-300">Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-4">{tutor.subject}</td>
                        <td className="px-5 py-4">${tutor.hourlyFee}</td>
                        <td className="px-5 py-4">{tutor.totalSlot}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditStart(tutor)}
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600">Edit</button>
                            <button onClick={() => setDeleteTarget(tutor._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">Delete</button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            onClose={() => setDeleteTarget(null)}
            onConfirm={() => handleDelete(deleteTarget)}
          />
        )}
      </div>
    </PrivateRoute>
  );
}