import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { registerUser, toAuthUser } from "../../api/users";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

const Register = () => {
  const [showPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      try {
        const user = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        login(toAuthUser(user));
        navigate("/");
      } catch (error) {
        if (error.message === "EMAIL_EXISTS") {
          setApiError("An account with this email already exists.");
        } else if (error.response?.data) {
          const message =
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data?.message;
          setApiError(message || "Something went wrong. Please try again.");
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-slate-600 via-blue-900 to-purple-900 flex-col justify-end p-12">
        <h2 className="text-white text-4xl font-bold leading-tight mb-4">
          Elevate Your Lifestyle.
        </h2>
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          Join our exclusive community of curators and enthusiasts. Discover a
          world of refined taste and timeless design.
        </p>
        <p className="text-white/50 text-xs">Joined by 10k+ curators</p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-12">
        <div>
          <Link to="/" className="text-blue-700 font-bold text-xl">
            LuxeRetail
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Start your journey with LuxeRetail today.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {apiError && (
              <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">
                {apiError}
              </p>
            )}

            {/* Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1 block">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1 block">
                  Confirm
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* Terms */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formik.values.terms}
                  onChange={(e) =>
                    formik.setFieldValue("terms", e.target.checked)
                  }
                  className="mt-1 accent-blue-700"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the{" "}
                  <Link to="/" className="text-blue-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/" className="text-blue-700">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Creating account..." : "Register"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        <p className="text-xs text-gray-400 text-center">
          © 2026 LuxeRetail. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
