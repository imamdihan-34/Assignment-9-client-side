"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react"; // ✅ useEffect যোগ
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const { registerUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register | MediQueue";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await registerUser(name, email, password, photo);
      toast.success("Registration Successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google Login Successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Register</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="font-medium dark:text-white">Name</label>
            <input type="text" name="name" required placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <label className="font-medium dark:text-white">Email</label>
            <input type="email" name="email" required placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <label className="font-medium dark:text-white">Photo URL</label>
            <input type="text" name="photo" placeholder="Enter photo URL (optional)"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <label className="font-medium dark:text-white">Password</label>
            <input type="password" name="password" required placeholder="Create password"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="my-6 text-center text-gray-400">OR</div>
        <button onClick={handleGoogleLogin}
          className="w-full border dark:border-gray-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-gray-700 transition dark:text-white">
          <FcGoogle size={24} />
          Continue with Google
        </button>
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;