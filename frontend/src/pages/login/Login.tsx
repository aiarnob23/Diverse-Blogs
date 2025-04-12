import { useState } from "react";
import cover from "../../../public/images/auth/leaf-table-min.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useAlert } from "../../context/AlertContext";


export default function Login() {
  const { handleGoogleSignIn } = useGoogleSignIn();
  const { loginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();

  //handle manual login
  const handleEmailPassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    setLoading(true);
    try {
      const res = await loginUser(email, password); 
      if (res?.success) {
        setTimeout(() => {
          showAlert("success", "Login Successful");
          window.location.replace("/");
        }, 400);
      }
      if (res?.error) {
        setError(res.error); 
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred. Please try again."); 
    } finally {
      setLoading(false); 
    }
  };
  
 //handle google login
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); 
    try {
      const res = await handleGoogleSignIn();
      if (res?.error) {
        setError(res.error); 
      }
      else {
         setTimeout(() => {
           showAlert("success", "Login Successful");
           window.location.replace("/");
         }, 400);
      }
    } catch (error) {
      console.error("Unexpected error during Google login:", error);
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

      {/* Glassmorphic Login Box */}
      <div className="relative z-100 bg-white/30 backdrop-blur-xl p-16 rounded-lg shadow-xl w-[380px] md:w-[460px] lg:w-[600px] ">
        <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
          Login Here
        </h1>

        {/* Email, and Password Login Form */}
        <form onSubmit={handleEmailPassLogin} className="space-y-4">
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
            {loading ? "Please Wait..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded transition-all"
        >
          Sign In with Google
        </button>
        <div className="flex justify-between">
          <p className="mt-8">
            Don't have an account?{" "}
            <a href="/auth/register" className="">
              Register
            </a>
          </p>
          <p className="mt-8">Forget Password?</p>
        </div>
      </div>
    </div>
  );
}
