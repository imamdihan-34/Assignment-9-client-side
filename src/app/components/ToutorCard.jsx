"use client";
import Link from "next/link";
import { MapPin, Clock, DollarSign } from "lucide-react";

const TutorCard = ({ tutor }) => {
  const { _id, tutorName, photo, subject, hourlyFee, location, timeSlot } = tutor;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col gap-4">
      {/* Photo & Name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200 shrink-0">
  <img 
    src={photo || "https://placehold.co/64x64"} 
    alt={tutorName} 
    className="w-full h-full object-cover" 
  />
</div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{tutorName}</h3>
          <p className="text-blue-600 text-sm font-medium">{subject}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>{timeSlot}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-blue-500" />
          <span>${hourlyFee} / hour</span>
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/toutors/${_id}`}
        className="mt-auto text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default TutorCard;