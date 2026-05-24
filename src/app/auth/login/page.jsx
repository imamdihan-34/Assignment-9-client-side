"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login Successful!");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input type="email" name="email" required placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input type="password" name="password" required placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-blue-500" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <button onClick={handleGoogleLogin}
          className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition">
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;