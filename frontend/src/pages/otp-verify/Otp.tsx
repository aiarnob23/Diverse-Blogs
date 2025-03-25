import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { sendOTP, verifyOTP } from "../../services/otpService";

export default function OTP() {
  const email = Cookies.get("email");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false); 
  const [isResending, setIsResending] = useState(false); 
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleVerify = async (e: any) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter the OTP code");
      return;
    }

    setIsVerifying(true); 
    try {
      const response = await verifyOTP(email as string, otp);
      if (response?.data?.success) {
        setMessage("OTP verified successfully!");
          window.location.replace('/');
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false); 
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsResending(true);
    try {
      const response = await sendOTP(email as string);
      if (response?.data?.success) {
        setMessage("OTP sent successfully! Check your email.");
        setCanResend(false);
        setCountdown(60); 
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsResending(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          OTP Verification
        </h1>

        {email ? (
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>
          </p>
        ) : (
          <p className="text-red-500 text-center mb-6">
            Email not found. Please go back to the login page.
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>

          {message && (
            <div
              className={`text-sm text-center ${
                message.includes("success") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying || !email}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            disabled={isResending || !canResend || isVerifying || !email}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-gray-400"
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
