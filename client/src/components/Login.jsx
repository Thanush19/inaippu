// Login.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login data:", loginData);

    axios
      .post(`${Backend}/users/login`, loginData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success("Successfully login !", {
            position: toast.POSITION.TOP_RIGHT,
          });

          dispatch(setUserData(response.data.user));
          navigate("/");
        } else if (!response.data.status) {
          toast.error("users doesn't exist", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (response.data.response === "password Not Match") {
          toast.error("password mismatch", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>dont have a account</p>
      <Link to="/register">Sign in</Link>
    </div>
  );
};

export default Login;
