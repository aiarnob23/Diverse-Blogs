import {  useState } from "react";
import cover from "../../../public/images/auth/leaf-table-min.jpg";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import { useAlert } from "../../context/AlertContext";

export default function Register() {

  const { registerUser } = useRegisterUser();
  const { handleGoogleSignIn } = useGoogleSignIn();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {showAlert} = useAlert();

  //handle manual registration
  const handleEmailPassRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); 
    try {
      // Client-side validation for password
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error(
          "Password must contain at least one special character."
        );
      }

      const result = await registerUser(name, email, password);
      console.log(result);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        window.location.replace("/auth/verify-otp");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again."
      ); 
    } finally {
      setLoading(false); 
    }
  };

  
  //handle google registration
  const handleGoogleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); 
    try {
      const result = await handleGoogleSignIn();
      if (result?.error) {
        setError(result.error); 
      } else if (result?.success) {
        setTimeout(() => {
          showAlert("success", "Login Successful");
          window.location.replace('/');
        }, 400);
      }
    } catch (error: any) {
      console.error("Error during Google registration:", error);
      setError("An unexpected error occurred. Please try again."); 
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cover})`,
          filter: "blur(3px)",
        }}
      ></div>

      {/* Glassmorphic Register Box */}
      <div className="relative z-100 bg-white/30 backdrop-blur-xl p-16 rounded-lg shadow-xl w-[380px] md:w-[460px] lg:w-[600px] ">
        <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
          Register Here
        </h1>

        {/* Name, Email, and Password Register Form */}
        <form onSubmit={handleEmailPassRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 bg-white/20 text-black border border-white/40 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 bg-white/20 text-black border border-white/40 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 bg-white/20 text-black border border-white/40 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[55%] right-3 transform -translate-y-1/2 text-black bg-transparent focus:outline-none"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} /> // Icon for "hide password"
                ) : (
                  <AiFillEye size={20} /> // Icon for "show password"
                )}
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && (
            <div className=" text-red-600 text-start p-2 rounded mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            className={`w-full ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold p-2 rounded transition-all`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register with Email"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleRegister}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded transition-all"
        >
          Register with Google
        </button>
        <div>
          <p className="mt-8">
            Already have an account?{" "}
            <a href="/auth/login" className="">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
