import React, { useState } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";

const RaiseDemand = () => {
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  const { id } = userData;
  const [demand, setDemand] = useState({
    description: "",
    serviceType: "",
    userId: id,
    isClosed: false,
    isResolved: false,
    resolvedByUserId: null,
  });

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDemand((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${Backend}/create-demand`, demand, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Demand created successfully:", res.data);
        toast.success("Demand created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.error("Error creating demand:", err);
        toast.error("Demand is not created!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Raise Demand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              name="description"
              value={demand.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service Type:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              name="serviceType"
              value={demand.serviceType}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Submit Demand
          </button>
        </form>
      </div>
      <Link
        to={`/user-demands/${id}`}
        className="text-blue-500 hover:text-blue-700 ml-2"
      >
        Your Demands
      </Link>
    </div>
  );
};

export default RaiseDemand;
