import { useState } from "react";

const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = otp.slice();
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value && index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      // Call the onOtpSubmit callback when the last field is filled
      if (index === length - 1 && newOtp.every((digit) => digit)) {
        onOtpSubmit(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          maxLength={1}
          className="w-12 h-12 text-center text-2xl border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      ))}
    </div>
  );
};

export default OtpInput;
