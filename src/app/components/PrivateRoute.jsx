"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext"; // ✅ ঠিক করা
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // ✅ ঠিক করা
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;
  if (!user) return null;

  return children;
};

export default PrivateRoute;