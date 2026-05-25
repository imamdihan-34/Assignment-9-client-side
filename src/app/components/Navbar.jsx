"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "next-themes";
import { FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <Link href="/" className="hover:text-blue-500 transition">
        Home
      </Link>
      <Link href="/toutors" className="hover:text-blue-500 transition">
        Tutors
      </Link>
      {user && (
        <>
          <Link
            href="/toutors/add-toutor"
            className="hover:text-blue-500 transition"
          >
            Add Tutor
          </Link>
          <Link href="/my-toutors" className="hover:text-blue-500 transition">
            My Tutors
          </Link>
          <Link href="/my-bookings" className="hover:text-blue-500 transition">
            My Bookings
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MediQueue
        </Link>

        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center gap-3">
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                    <FiUser className="text-blue-600" />
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdown ? "rotate-180" : ""}`}
                />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/my-toutors"
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <FiUser className="text-blue-500" />
                      My Tutors
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <FiUser className="text-blue-500" />
                      My Bookings
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 py-1">
                    <button
                      onClick={() => {
                        logoutUser();
                        setDropdown(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm dark:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full border flex items-center justify-center dark:border-gray-600"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="dark:text-white" />
            ) : (
              <Menu className="dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-t border-gray-100 dark:border-gray-700">
          {navLinks}

          {user ? (
            <div className="space-y-2">
              {/* User info mobile */}
              <div className="flex items-center gap-3 py-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="text-blue-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-xl justify-center"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-xl text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="border py-2 px-4 rounded-xl text-center dark:border-gray-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
