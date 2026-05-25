"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // ✅ loading শেষ হলে তারপর check করো
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // ✅ loading এর সময় spinner দেখাও — redirect করো না
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ user না থাকলে null — redirect useEffect করবে
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
};

export default PrivateRoute;