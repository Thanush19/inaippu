import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUserData, setUserData, clearUserData } from "../redux/userSlice";
import Backend from "../../constant";

const ProfileChart = () => {
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const fetchDemandsByUser = async () => {
      try {
        const res = await axios.get(
          `${Backend}/demands-by-user/${userData.id}`
        );
        console.log("Demands by user:", res.data);
      } catch (err) {
        console.error("Error fetching demands by user:", err);
      }
    };

    if (userData.role === "RESIDENT" || userData.role === "ADMIN") {
      return;
    }

    fetchDemandsByUser();
  }, [userData]);

  return (
    <>
      <h1></h1>
    </>
  );
};

export default ProfileChart;
