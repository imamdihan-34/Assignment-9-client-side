"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = (
    <>
      <Link href="/" className="hover:text-blue-500 transition">Home</Link>
      <Link href="/toutors" className="hover:text-blue-500 transition">Tutors</Link>
      {user && (
        <>
          <Link href="/toutors/add-toutor" className="hover:text-blue-500 transition">Add Tutor</Link>
          <Link href="/my-toutors" className="hover:text-blue-500 transition">My Tutors</Link>
          <Link href="/my-bookings" className="hover:text-blue-500 transition">My Bookings</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MediQueue
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                  title={user.displayName}
                />
              )}
              <button
                onClick={logoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm">
                Login
              </Link>
              <Link href="/auth/register"
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm dark:text-white">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
          {navLinks}
          {user ? (
            <button onClick={logoutUser}
              className="bg-red-500 text-white py-2 rounded-xl">
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