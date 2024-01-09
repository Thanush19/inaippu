import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "../redux/userSlice";
const Profile = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  if (!userData) {
    return <div className="text-center py-8">Loading...</div>;
  }
  const handleLogout = () => {
    dispatch(clearUserData());
  };
  const { username, role } = userData;
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
      <p className="text-lg">Your role is: {role}</p>
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
