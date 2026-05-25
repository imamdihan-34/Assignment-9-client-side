
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { FiClock, FiDollarSign, FiMapPin, FiTarget } from "react-icons/fi";

const BookSessionModal = ({ tutor, closeModal, onBookingSuccess }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // ✅
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const studentName = form.studentName.value;
    const phone = form.phone.value;

    try {
      await axiosSecure.post("/bookings", { // ✅ axiosSecure দিয়ে
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        subject: tutor.subject,
        timeSlot: tutor.timeSlot,
        hourlyFee: tutor.hourlyFee,
        location: tutor.location,
        userEmail: user?.email,
        studentName,
        phone,
      });

      toast.success("Booking Confirmed!");
      onBookingSuccess();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book session!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl w-full max-w-lg shadow-xl">

        <h2 className="text-2xl font-bold mb-1 dark:text-white">Book Session</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Tutor: <span className="text-blue-600 font-semibold">{tutor.tutorName}</span> — {tutor.subject}
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="text"
            name="studentName"
            required
            placeholder="Your Name"
            className="w-full border p-3 rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="text"
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full border p-3 rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          {/* Tutor Info */}
          <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div className="flex items-center gap-2">
              <FiClock className="text-blue-500 shrink-0" />
              <span>Time: <span className="font-medium">{tutor.timeSlot}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-blue-500 shrink-0" />
              <span>Fee: <span className="font-medium">${tutor.hourlyFee}/hr</span></span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-blue-500 shrink-0" />
              <span>Location: <span className="font-medium">{tutor.location}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <FiTarget className="text-blue-500 shrink-0" />
              <span>Slots Left: <span className="font-medium text-green-500">{tutor.totalSlot}</span></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 w-full text-red-500 hover:underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookSessionModal;