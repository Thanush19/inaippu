import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const nav = useNavigate();

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>;
  }
  const handleLogout = () => {
    dispatch(clearUserData());
  };
  const { username, role } = userData;

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
        <p className="text-lg">Your role is: {role}</p>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        {(role === "RESIDENT" || role === "ADMIN") && (
          <Link
            to="/raise-demand"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Raise Your Demand
          </Link>
        )}
        <Link
          to="/surf-local"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Surf Your Local
        </Link>
        <Link
          to="/view-demands"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          view demands
        </Link>
      </div>
    </div>
  );
};

export default Home;
