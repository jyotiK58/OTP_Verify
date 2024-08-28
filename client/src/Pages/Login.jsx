import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");

  const initRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA solved", response);
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired");
              setError("reCAPTCHA expired. Please try again.");
            },
          }
        );
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
        setError(`Error initializing reCAPTCHA: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    initRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    try {
      console.log("Attempting to send OTP to:", formattedPhoneNumber);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      console.log("OTP sent successfully");
      window.confirmationResult = confirmationResult;
      setShowOtpInput(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(`Error sending OTP: ${error.message}`);
      if (error.code === "auth/too-many-requests") {
        setError(
          "Too many requests. Please wait a few minutes before trying again."
        );
      }
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      initRecaptcha();
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div id="recaptcha-container"></div>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {!showOtpInput ? (
        <form
          onSubmit={handlePhoneSubmit}
          className="space-y-6 bg-white p-6 rounded-lg bg-opacity-80"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-pink-600 text-center">
            🌸 Phone Number Login 🌸
          </h2>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number (with country code)"
            className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg bg-opacity-80">
          <h2 className="text-3xl font-extrabold mb-4 text-pink-600 text-center">
            Enter OTP sent to {phoneNumber}
          </h2>
          {/* Add OTP input component here */}
        </div>
      )}
    </div>
  );
};

export default Login;
