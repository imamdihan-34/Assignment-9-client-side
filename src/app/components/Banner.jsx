"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src="https://i.ibb.co.com/R4v1k8NG/banner.webp"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6"
        >
          ✦ Smart Online Learning Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Upgrade your learning <br /> experience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-gray-300 text-lg"
        >
          Book expert tutors easily and improve your academic performance quickly.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link href="/toutors">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl font-semibold transition">
              Explore Tutors
            </button>
          </Link>

          <Link href="/auth/register">
            <button className="border border-white text-white px-7 py-3 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition">
              Become a Tutor
            </button>
          </Link>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs"
      >
        <span>scroll down</span>
        <div className="w-px h-8 bg-white/30" />
      </motion.div>

    </section>
  );
};

export default Banner;