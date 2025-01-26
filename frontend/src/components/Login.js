import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
      console.log("API URL:", apiUrl);
      const res = await axios.post(apiUrl, { username, password });
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", username); // Save username in localStorage

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header without dropdowns */}
      <Header isLoggedIn={false} showSearchBar={false} />

      <div className="flex items-center justify-center flex-grow w-full px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-[400px] sm:w-[350px] md:w-[400px] h-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome To Nutra
          </h1>
          <p className="text-black mb-6 text-center text-base sm:text-lg font-semibold">
            Please log in to your account.
          </p>

          <div className="mb-6 relative">
            <MdEmail className="absolute left-3 text-xl sm:text-2xl top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 p-3 h-12 sm:h-14 border rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <TbLockPassword className="absolute left-3 text-xl sm:text-2xl top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 h-12 sm:h-14 border rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={togglePasswordVisibility}
              title={isPasswordVisible ? "Hide Password" : "Show Password"}
            >
              {isPasswordVisible ? (
                <FaEye className="text-xl sm:text-2xl" />
              ) : (
                <FaEyeSlash className="text-xl sm:text-2xl" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 text-center text-lg p-3 h-12 sm:h-14 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            Login
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;