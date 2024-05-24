import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "../redux/userSlice";
import ph from "../assets/black-bg.png";
import ProfileChart from "./ProfileChart";
import { motion } from "framer-motion";

const Profile = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  if (!userData) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  const handleLogout = () => {
    dispatch(clearUserData());
  };

  const {
    username,
    role,
    email,
    phone_number,
    address,
    services,
    coordinates_lat,
    coordinates_lng,
  } = userData;

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${ph})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: 0.9,
      }}
    >
      <div className="w-[50%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black bg-opacity-60 p-10 rounded-lg shadow-lg text-center mx-5 md:mx-20"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex justify-end mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </motion.button>
          </div>
          <h2 className="text-4xl font-bold mb-4">Welcome, {username}!</h2>
          <div className="text-left">
            <p className="text-lg mb-2">
              <span className="font-semibold">Your role is:</span> {role}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Phone Number:</span>{" "}
              {phone_number}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Coordinates:</span>{" "}
              {coordinates_lat}, {coordinates_lng}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Services:</span> {services}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 w-full"
          >
            <ProfileChart />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
