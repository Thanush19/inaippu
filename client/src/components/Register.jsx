import React, { useState } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone_number: 0,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    role: "",
    services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("coordinates.")) {
      const coordinateField = name.split(".")[1];
      setUserData((prevData) => ({
        ...prevData,
        coordinates: {
          ...prevData.coordinates,
          [coordinateField]: parseFloat(value),
        },
      }));
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${Backend}/users/register`, userData)
      .then((response) => {
        console.log(response.data);
        toast.success("Successfully register !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("registration failed !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="number"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Services:
          <input
            type="text"
            name="services"
            value={userData.services}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;