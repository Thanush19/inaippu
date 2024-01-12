import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import ph from "../assets/black-bg.png";

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
      .post(`${Backend}/user/login`, loginData)
      .then((response) => {
        console.log(response.data);
        const { message, user } = response.data;

        if (response.status === 200) {
          toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          dispatch(setUserData(user));
          navigate("/");
        } else if (response.status === 401) {
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (response.status === 404) {
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("An error occurred during login", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("An error occurred during login", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <>
          <h2 className="text-3xl mb-4 text-white uppercase font-bold">
            Login
          </h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl border border-white focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-white rounded-3xl border border-white p-2 bg-black">
            Don't have an account?
            <Link
              to="/register"
              className="text-white font-bold underline hover:text-yellow-400"
            >
              Sign up
            </Link>
          </p>
        </>
      </div>
    </div>
  );
};

export default Login;
