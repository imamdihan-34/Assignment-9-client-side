"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/R4v1k8NG/banner.webp",
    title: "Upgrade your learning experience",
    subtitle: "Book expert tutors easily and improve your academic performance quickly.",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/gMBN5knc/93b6ee4c-84db-4c44-8651-dfeb3a0a9492.png",
    title: "Learn from the best tutors",
    subtitle: "Connect with experienced tutors across all subjects and skill levels.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/tw4zXt83/Gemini-Generated-Image-ujp86aujp86aujp8.png",
    title: "Flexible scheduling made easy",
    subtitle: "Choose your preferred time slots and start learning at your own pace.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">

        {/* Badge */}
        <motion.div
          key={`badge-${current}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6"
        >
          ✦ Smart Online Learning Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          {slides[current].title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-gray-300 text-lg"
        >
          {slides[current].subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          key={`btn-${current}`}
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

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 z-20 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 z-20 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Banner;