import React from "react";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-700 text-white p-4 text-center fixed bottom-0 h-auto sm:h-12 ">
      {/* w-full bg-cyan-900 p-4 flex items-center justify-between fixed top-0 h-16 */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-gray-400 transition-colors"
          title="Send us an email"
        >
          <IoMail className="text-white text-xl"/>
          <span className="text-sm sm:text-xl">info@apisatlas.com</span>
        </a>

        <span className="hidden sm:inline">|</span>

        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-lg" />
          <span className="text-sm sm:text-xl">+91 92656 14419</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
