import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5002/api/sampledata",
          {
            headers: { "x-auth-token": token },
          },
          { withCredentials: true }
        );
        setSampleData(response.data);
      } catch (err) {
        console.error("Failed to fetch sample data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearchResults = (data) => {
    setSampleData(data);
  };

  return (
    <div className="pt-24 sm:pt-32">
      <Header
        isLoggedIn={true}
        showSearchBar={true}
        onSearch={handleSearchResults}
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Sample Data</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Hscode</th>
              <th className="p-2 border border-gray-300">Hscode2</th>
              <th className="p-2 border border-gray-300">Product</th>
              <th className="p-2 border border-gray-300">Quantity</th>
              <th className="p-2 border border-gray-300">Unit</th>
              <th className="p-2 border border-gray-300">Unit_Rate</th>
              <th className="p-2 border border-gray-300">Currency</th>
              <th className="p-2 border border-gray-300">Total USD</th>
              <th className="p-2 border border-gray-300">Destination</th>
              <th className="p-2 border border-gray-300">Origin</th>
              <th className="p-2 border border-gray-300">Exporter</th>
              <th className="p-2 border border-gray-300">Importer</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{item.DATE}</td>
                <td className="p-2 border border-gray-300">{item.HSCODE}</td>
                <td className="p-2 border border-gray-300">{item.HSCODE2}</td>
                <td className="p-2 border border-gray-300">{item.PRODUCT}</td>
                <td className="p-2 border border-gray-300">{item.QUANTITY}</td>
                <td className="p-2 border border-gray-300">{item.UNIT}</td>
                <td className="p-2 border border-gray-300">{item.UNIT_RATE}</td>
                <td className="p-2 border border-gray-300">{item.CURRENCY}</td>
                <td className="p-2 border border-gray-300">{item.TOTALUSD}</td>
                <td className="p-2 border border-gray-300">
                  {item.DESTINATION}
                </td>
                <td className="p-2 border border-gray-300">{item.ORIGIN}</td>
                <td className="p-2 border border-gray-300">{item.EXPORTER}</td>
                <td className="p-2 border border-gray-300">{item.IMPORTER}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
