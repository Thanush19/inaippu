import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";
import ph from "../assets/black-bg.png";
import { motion, AnimatePresence } from "framer-motion";

const RaiseDemand = () => {
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  const modalRef = useRef();

  const { id } = userData;
  const [isOpen, setIsOpen] = useState(true); // State to manage modal visibility
  const [demand, setDemand] = useState({
    description: "",
    serviceType: "",
    user_id: id,
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
        setIsOpen(false); // Close the modal on successful submission
        navigate("/"); // Navigate to the desired route
      })
      .catch((err) => {
        console.error("Error creating demand:", err);
        toast.error("Demand is not created!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/"); // Navigate to the desired route
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${ph})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: 0.9,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className="relative bg-white p-8 shadow-md rounded-md w-full max-w-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
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
                className="bg-black  text-yellow-500 font-bold py-2 px-4 rounded-md hover:bg-yellow-700 hover:text-black"
                type="submit"
              >
                Submit Demand
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <Link
        to={`/user-demands/${id}`}
        className="text-blue-500 hover:text-blue-700 ml-2 bg-white border border-2xl rounded-2xl p-2 mt-5"
      >
        Your Demands
      </Link>
      <ToastContainer />
    </div>
  );
};

export default RaiseDemand;
