import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import ph from "../assets/black-bg.png";

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
    <div className="bg-black">
      <div className="">
        <Link
          to="/profile"
          className=" border border-white rounded-3xl  left-0 p-4 text-white hover:text-gray-300"
        >
          Your Profile
        </Link>
      </div>

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
        <div className="flex flex-col items-center justify-center mt-[30vh] ">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
            <p className="text-lg">Your role is: {role}</p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center space-x-4 ">
            {(role === "RESIDENT" || role === "ADMIN") && (
              <Link
                to="/raise-demand"
                className="mt-4 text-white rounded-3xl border w-[10rem] border-white  md:w-[50vw] text-center p-2 bg-black hover:bg-gray-800 hover:text-yellow-600"
              >
                Raise Your Demand
              </Link>
            )}
            <Link
              to="/surf-local"
              className="mt-4 text-white rounded-3xl border w-[10rem] border-white  md:w-[50vw] text-center p-2 bg-black hover:bg-gray-800 hover:text-yellow-600"
            >
              Surf Your Local
            </Link>
            <Link
              to="/view-demands"
              className="mt-4 text-white rounded-3xl border w-[10rem] border-white  md:w-[50vw] text-center p-2 bg-black hover:bg-gray-800 hover:text-yellow-600"
            >
              View Demands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
