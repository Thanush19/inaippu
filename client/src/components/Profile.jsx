import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "../redux/userSlice";
import ph from "../assets/black-bg.png";

const Profile = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleLogout = () => {
    dispatch(clearUserData());
  };

  const {
    username,
    role,
    id,
    email,
    phoneNumber,
    coordinates,
    address,
    gender,
    password,
    services,
  } = userData;

  return (
    <>
      <div
        className="min-h-screen text-white"
        style={{
          backgroundImage: `url(${ph})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.9,
        }}
      >
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="p-10">
          <h2 className="text-3xl font-bold">Welcome, {username}!</h2>
          <p className="text-lg">Your role is: {role}</p>

          {/* Display other details */}
          <p>ID: {id}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>
            Coordinates: {coordinates.latitude}, {coordinates.longitude}
          </p>
          <p>Address: {address}</p>
          <p>Gender: {gender}</p>
          {/* <p>Gender: {password}</p> */}
          <p>Services: {services}</p>
          {/* Display other details as needed */}
        </div>
      </div>
    </>
  );
};

export default Profile;
