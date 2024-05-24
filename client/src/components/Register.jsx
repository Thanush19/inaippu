import React, { useState } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import ph from "../assets/black-bg.png";

const Register = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const handleServicesDropdownChange = (e) => {
    handleChange(e);
    setIsServicesDropdownOpen(false);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            console.log(data);
            setLocationData({
              address: data.display_name,
              coordinates: { latitude, longitude },
            });

            setUserData((prevData) => ({
              ...prevData,
              address: data.display_name,
              coordinates: { latitude, longitude },
            }));
          } catch (error) {
            console.error("Error fetching live location data:", error);
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting live location:", error.message);
          setIsGettingLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    role: "",
    services: [],
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "services") {
      const servicesArray = value.split(",");
      setUserData((prevData) => ({ ...prevData, [name]: servicesArray }));
    } else if (name.startsWith("coordinates.")) {
      const coordinateField = name.split(".")[1];
      setUserData((prevData) => ({
        ...prevData,
        coordinates: {
          ...prevData.coordinates,
          [coordinateField]: parseFloat(value),
        },
      }));
    } else if (name === "gender") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.address ||
      !userData.phone_number ||
      !userData.gender ||
      !userData.role
    ) {
      toast.error("All fields are mandatory!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    console.log("Submitting data:", userData);

    axios
      .post(`${Backend}/user/register`, userData)
      .then((response) => {
        if (response.data.includes("Username or email already exists")) {
          toast.error("Username or email already exists!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          console.log(response.data);
          toast.success("Successfully register !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("Registration failed !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="hidden md:block w-1/2"
        style={{
          backgroundImage: `url(${ph})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="flex flex-col items-center justify-center w-full md:w-1/2"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <div className="border-lime-900">
            <h2 className="p-2 text-center uppercase text-2xl font-bold text-white">
              Register
            </h2>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                placeholder="Thanush"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Email:
              <input
                type="email"
                name="email"
                placeholder="thanush@gmail.com"
                value={userData.email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Gender:
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select your Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={userData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={userData.address}
                placeholder="No need to enter the address Manually, "
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <p className="text-white mb-4">(or)</p>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white mb-4">
            <button
              onClick={handleGetLocation}
              disabled={isGettingLocation}
              className="bg-white text-gray-800 font-bold w-full"
            >
              {isGettingLocation ? (
                <div className="loader">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.636 0-5.052-1.062-6.782-2.809l2.73-2.73a5.978 6.014 0 008.475 0 5.978 6.014 0 000-8.475l-1.414-1.414A7.963 7.963 0 016 17.291zM17.207 6.707a5.978 6.014 0 000 8.475l1.414 1.414A7.963 7.963 0 0020 11.709h4c0-4.418-3.582-8-8-8v4c2.636 0 5.052 1.062 6.782 2.809l-2.73 2.73a5.978 6.014 0 00-8.475 0 5.978 6.014 0 000 8.475l1.414 1.414A7.963 7.963 0 0022 12.291h-4a7.963 7.963 0 01-1.793 5.003z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Get My Live Location"
              )}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Phone Number:
              <input
                type="number"
                name="phone_number"
                value={userData.phone_number}
                placeholder="Enter your Phone number"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                inputMode="numeric"
                required
              />
            </label>
          </div>

          <div className="my-4">
            <label className="block text-white text-sm font-bold mb-2">
              Role:
            </label>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled className="text-bold text-gray-700">
                Select a role
              </option>
              <option value="ADMIN">👤 ADMIN</option>

              <option value="SERVICE_PROVIDER">🛠️ SERVICE PROVIDER</option>
              <option value="STREET_VENDOR">🌆 STREET VENDOR</option>
              <option value="RESIDENT">🏠 RESIDENT</option>
            </select>
          </div>

          {userData.role === "SERVICE_PROVIDER" && (
            <div className="my-4">
              <label className="block text-white text-sm font-bold mb-2">
                Selective Services:
              </label>
              <div className="relative">
                <select
                  name="services"
                  value={userData.services}
                  onChange={handleServicesDropdownChange}
                  onFocus={() => setIsServicesDropdownOpen(true)}
                  onBlur={() => setIsServicesDropdownOpen(false)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  multiple
                >
                  <option value="" disabled className="text-black">
                    Select a Service
                  </option>
                  <option className="text-black" value="COOK">
                    Cook
                  </option>
                  <option className="text-black" value="ELECTRICIAN">
                    Electrician
                  </option>
                  <option className="text-black" value="PLUMBER">
                    Plumber
                  </option>
                  <option className="text-black" value="MECHANIC">
                    Mechanic
                  </option>
                  <option className="text-black" value="CARPENTER">
                    Carpenter
                  </option>
                  <option className="text-black" value="MAID">
                    Maid
                  </option>
                </select>
                <div className="absolute right-2 top-2">
                  {userData.services.map((service) => (
                    <span
                      key={service}
                      className="bg-black text-white px-2 mr-2 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {userData.role === "STREET_VENDOR" && (
            <div className="my-4">
              <label className="block text-white text-sm font-bold mb-2">
                Select Services:
              </label>
              <div className="relative">
                <select
                  name="services"
                  value={userData.services}
                  onChange={handleServicesDropdownChange}
                  onFocus={() => setIsServicesDropdownOpen(true)}
                  onBlur={() => setIsServicesDropdownOpen(false)}
                  className="form-select border border-lime-900 w-full p-2 appearance-none"
                  multiple
                >
                  <option className="text-black" value="Aquavendor">
                    Aquavendor
                  </option>
                  <option className="text-black" value="Food Delivery">
                    Food Delivery
                  </option>
                  <option className="text-black" value="Newspaper">
                    Newspaper
                  </option>
                  <option className="text-black" value="Grocery">
                    Grocery
                  </option>
                  <option className="text-black" value="Vegetables">
                    Vegetables
                  </option>
                  <option className="text-black" value="Meat and Fish">
                    Meat and Fish
                  </option>
                </select>
                <div className="absolute right-2 top-2">
                  {userData.services.map((service) => (
                    <span
                      key={service}
                      className="bg-black text-white px-2 mr-2 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl border border-white focus:outline-none focus:shadow-outline mx-auto"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-white  rounded-3xl border border-white p-4 bg-black">
          Already have an Account?
          <Link to="/login" className="text-white font-bold underline ml-2">
            Log in
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
