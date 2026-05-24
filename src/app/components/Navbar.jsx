"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext"; // ✅ ঠিক করা

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="/" className="hover:text-cyan-500">
        Home
      </Link>

      <Link href="/toutors" className="hover:text-cyan-500">
        Tutors
      </Link>

      {user && (
        <>
        <Link href="/toutors/add-toutor" className="hover:text-cyan-500">
  Add Tutor
</Link>
          <Link href="/my-toutors" className="hover:text-cyan-500">
            My Tutors
          </Link>

          <Link href="/my-bookings" className="hover:text-cyan-500">
            My Bookings
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-600">
          MediQueue
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {navLinks}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
  <>
    {user?.photoURL && (
      <img src={user.photoURL} alt="user"
        className="w-10 h-10 rounded-full border" />
    )}
    <span className="font-medium">{user?.displayName}</span>
    <button onClick={logoutUser}
      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
      Logout
    </button>
  </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="border px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white">
          {navLinks}

          {user ? (
            <button
              onClick={logoutUser}
              className="bg-red-500 text-white py-2 rounded-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;