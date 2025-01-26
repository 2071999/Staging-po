import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaBars, FaIndustry } from "react-icons/fa";
import Select from "react-select";
import apiIcon from "../assets/api-icon.png";
import axios from "axios";

const Header = ({ isLoggedIn, showSearchBar, onSearch }) => {
  const username = localStorage.getItem("username");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");

  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const industryOptions = [
    { value: "Nutra", label: "Nutra" },
    { value: "Cosmetics", label: "Cosmetics" },
  ];

  const profileOptions = [
    { value: "profile", label: "Profile" },
    { value: "logout", label: "Logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleIndustrySelect = (selectedOption) => {
    setSelectedIndustry(selectedOption);
    console.log(`${selectedOption.value} selected`);
  };

  const handleProfileSelect = (selectedOption) => {
    setSelectedProfile(selectedOption);
    if (selectedOption.value === "logout") {
      handleLogout();
    } else if (selectedOption.value === "profile") {
      navigate("/profile");
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5002/api/sampledata/search`, {
        params: { product: searchProduct }, 
        headers: { "x-auth-token": token },
      });
      onSearch(response.data); 
    } catch (err) {
      console.error("Failed to search sample data:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#3b82f6", 
      border: "none",
      borderRadius: "8px",
      minHeight: "40px",
      width: "150px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: () => ({ display: "none" }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3b82f6" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#60a5fa",
      },
    }),
  };

  return (
    <header className="w-full bg-slate-700 text-black p-4 flex items-center justify-between fixed top-0 h-20 z-50">
      <div className="flex items-center">
        <img
          src={apiIcon}
          alt="API Icon"
          className="text-blue text-2xl mr-2 w-15 h-12"
        />
      </div>

      {isLoggedIn && (
        <>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>

          <div className="hidden lg:flex items-center space-x-3">
            {showSearchBar && (
              <div className="flex items-center w-[500px]">
                <input
                  type="text"
                  placeholder="Search by product..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="p-2 h-10 w-full border-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaSearch className="text-lg" />
                </button>
              </div>
            )}

            <div className="relative">
              <Select
                options={industryOptions}
                value={selectedIndustry}
                onChange={handleIndustrySelect}
                placeholder={
                  <div className="flex items-center space-x-1 text-white">
                    <FaIndustry className="text-lg" />
                    <span>Industry</span>
                  </div>
                }
                styles={customStyles}
                isSearchable={false}
              />
            </div>

            <div className="relative">
              <Select
                options={profileOptions}
                value={selectedProfile}
                onChange={handleProfileSelect}
                placeholder={
                  <div className="flex items-center space-x-2 text-white">
                    <FaUser className="text-lg" />
                    <span>{username}</span>
                  </div>
                }
                styles={customStyles}
                isSearchable={false}
              />
            </div>
          </div>

          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="lg:hidden absolute top-20 right-0 w-full bg-slate-700 p-4 shadow-lg"
            >
              {showSearchBar && (
                <div className="flex items-center w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search by product..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="p-2 h-10 w-full border-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSearch}
                    className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <FaSearch className="text-lg" />
                  </button>
                </div>
              )}

              <div className="relative">
                <Select
                  options={industryOptions}
                  value={selectedIndustry}
                  onChange={handleIndustrySelect}
                  placeholder={
                    <div className="flex items-center text-white">
                      <FaIndustry className="text-lg" />
                      <span>Industry</span>
                    </div>
                  }
                  styles={customStyles}
                  isSearchable={false}
                />
              </div>

              <div className="relative">
                <Select
                  options={profileOptions}
                  value={selectedProfile}
                  onChange={handleProfileSelect}
                  placeholder={
                    <div className="flex items-center space-x-2 text-white">
                      <FaUser className="text-lg" />
                      <span>{username}</span>
                    </div>
                  }
                  styles={customStyles}
                  isSearchable={false}
                />
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;