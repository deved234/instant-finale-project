import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { loginUser, toAuthUser } from "../../api/users";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      try {
        const user = await loginUser(values);
        login(toAuthUser(user));
        navigate("/");
      } catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
          setApiError("Invalid email or password.");
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Left Side — decorative */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-slate-700 via-slate-500 to-amber-700 flex-col justify-end p-12">
        <h2 className="text-white text-4xl font-bold leading-tight mb-4">
          Elevate Your Experience.
        </h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Welcome to a world of curated luxury and effortless discovery. Sign in
          to continue your journey through our exclusive collection.
        </p>
      </div>

      {/* Right Side — form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-12 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div>
          <Link to="/" className="text-blue-700 dark:text-blue-400 font-bold text-xl">
            LuxeRetail
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">
            Please enter your credentials to access your account.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {apiError && (
              <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg px-4 py-3 border border-red-100 dark:border-red-900/50">
                {apiError}
              </p>
            )}

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500 transition-colors"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/"
                className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-widest hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign In →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
              <span className="text-xs text-gray-400 dark:text-slate-500">OR</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700 rounded-lg py-3 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700 rounded-lg py-3 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Apple
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 dark:text-blue-400 font-semibold hover:underline">
                Register Now
              </Link>
            </p>
          </form>
        </div>

        <p className="text-xs text-gray-400 dark:text-slate-600 text-center">
          © 2026 LuxeRetail. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
