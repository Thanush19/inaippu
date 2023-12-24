import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";

const Home = () => {
  const userData = useSelector(selectUserData);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { username, role } = userData;

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>Your role is: {role}</p>
    </div>
  );
};

export default Home;
