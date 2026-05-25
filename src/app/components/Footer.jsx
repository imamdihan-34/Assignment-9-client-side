import Link from "next/link";
import { FaFacebookF, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400">MediQueue</h2>

          <p className="mt-4 text-gray-300 leading-7">
            Simplifying tutor booking with smart scheduling, easy session
            management, and modern learning support.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Learning Services</h3>

          <div className="flex flex-col gap-3 text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/tutors">Tutors</Link>
            <Link href="/add-tutor">Add Tutor</Link>
            <Link href="/my-bookings">My Bookings</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-gray-300">Email: support@mediqueue.com</p>

          <p className="text-gray-300 mt-2">Phone: +880 1813-309755</p>

          <div className="flex gap-4 mt-5 text-2xl">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-5 text-center text-gray-400">
        © 2026 MediQueue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
