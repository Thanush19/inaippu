import React, { useState } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
      !userData.role
    ) {
      toast.error("All fields are mandatory!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    console.log("Submitting data:", userData);

    axios
      .post(`${Backend}/users/register`, userData)
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
    <div className="flex  justify-center items-center w-[80vw] h-[80vh] border border-lime-900">
      <form onSubmit={handleSubmit}>
        <div className="border border-lime-900">
          <h2 className="p-2">Register</h2>
        </div>
        <div className="">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="border border-lime-900"
              required
            />
          </label>
        </div>
        <br />

        <div className="">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="border border-lime-900"
            />
          </label>
        </div>

        <br />
        <div className="">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="border border-lime-900"
              required
            />
          </label>
        </div>

        <br />
        <div className="">
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="border border-lime-900"
            />
          </label>
        </div>

        <p>(or)</p>
        <div className="border border-lime-900 bg-gray-300 hover:bg-gray-500">
          <button onClick={handleGetLocation}>Get My Live Location</button>
          {locationData && (
            <div>
              <p>Address: {locationData.address}</p>
              <p>
                Coordinates: {locationData.coordinates.latitude},{" "}
                {locationData.coordinates.longitude}
              </p>
            </div>
          )}
        </div>
        <br />
        <div className="">
          <label>
            Phone Number:
            <input
              type="number"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              className="border border-lime-900"
              required
            />
          </label>
        </div>

        <br />
        <div className="my-4">
          <label className="block text-gray-700">Role:</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="form-select border border-lime-900 w-full p-2"
            required
          >
            <option value="" disabled>
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
            <label className="block text-gray-700">Selective Services:</label>
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
                {/* Options... */}
              </select>
              <div className="absolute right-2 top-2">
                {userData.services.map((service) => (
                  <span
                    key={service}
                    className="bg-lime-900 text-white px-2 mr-2 rounded"
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
            <label className="block text-gray-700">Select Services:</label>
            <div className="relative">
              <select
                name="services"
                value={userData.services}
                onChange={handleChange}
                onFocus={() => setIsServicesDropdownOpen(true)}
                onBlur={() => setIsServicesDropdownOpen(false)}
                className="form-select border border-lime-900 w-full p-2 appearance-none"
                multiple
              >
                <option
                  value="Aquavendor"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Aquavendor
                </option>
                <option
                  value="Food Delivery"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Food Delivery
                </option>
                <option
                  value="Newspaper"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Newspaper
                </option>
                <option
                  value="Grocery"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Grocery
                </option>
                <option
                  value="Vegetables"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Vegetables
                </option>
                <option
                  value="Meat and Fish"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Meat and Fish
                </option>
              </select>
              <div className="absolute right-2 top-2">
                {userData.services.map((service) => (
                  <span
                    key={service}
                    className="bg-lime-900 text-white px-2 mr-2 rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {userData.role === "SERVICE_PROVIDER" && (
          <div className="my-4">
            <label className="block text-gray-700">Selective Services:</label>
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
                <option
                  value="COOK"
                  onClick={() => setIsServicesDropdownOpen(false)}
                >
                  Cook
                </option>
              </select>
              <div className="absolute right-2 top-2">
                {userData.services.map((service) => (
                  <span
                    key={service}
                    className="bg-lime-900 text-white px-2 mr-2 rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <br />

        {userData.role === "STREET_VENDOR" &&
          userData.services.includes("OTHER") && (
            <div className="my-4">
              <label className="block text-gray-700">Other Services:</label>
              <input
                type="text"
                name="otherServices"
                value={userData.otherServices}
                onChange={handleChange}
                className="border border-lime-900 w-full p-2"
                placeholder="Type other services separated by commas"
              />
            </div>
          )}

        <button type="submit" className="bg-red-400">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
