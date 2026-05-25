import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-900">

      {/* 404 Number */}
      <h1 className="text-9xl font-black text-blue-600 mb-4">404</h1>

      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-lg">
        যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। হয়তো সরানো হয়েছে বা URL ভুল।
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        ← হোমে ফিরে যাও
      </Link>
    </div>
  );
}