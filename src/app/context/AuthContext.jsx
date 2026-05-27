"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.post(`${API}/auth/jwt`, {
            email: currentUser.email,
          });
          localStorage.setItem("token", res.data.token);
        } catch (err) {
          console.error("Token error:", err);
        }
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async (name, email, password, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL });
    setUser({ ...result.user, displayName: name, photoURL });

    const res = await axios.post(`${API}/auth/jwt`, { email });
    localStorage.setItem("token", res.data.token);

    return result;
  };

  const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const res = await axios.post(`${API}/auth/jwt`, { email });
    localStorage.setItem("token", res.data.token);

    return result;
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const res = await axios.post(`${API}/auth/jwt`, {
      email: result.user.email,
    });
    localStorage.setItem("token", res.data.token);

    return result;
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        googleLogin,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
