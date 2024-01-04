// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Define your Leaflet CSS and Backend constant
import "leaflet/dist/leaflet.css";
import Backend from "../../constant";

// Define the ViewDemands component
const ViewDemands = () => {
  // State variables
  const [demandData, setDemandData] = useState([]);
  const [center, setCenter] = useState([0, 0]); // Default center

  // Function to fetch demand data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Backend}/resident-demand`);
      setDemandData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching demand data:", error);
    }
  };

  // Function to get user location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          setCenter([latitude, longitude]); // Set map center to user's location
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // useEffect to run on component mount
  useEffect(() => {
    fetchData();
    handleGetLocation();
  }, []);

  return (
    <div>
      <h2>View Demands</h2>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {demandData.map((demand) => (
          <Marker
            key={demand.id}
            position={[demand.latitude || 0, demand.longitude || 0]}
          >
            <Popup>
              <strong>Demand:</strong> {demand.description}
              <br />
              <strong>Service Type:</strong> {demand.serviceType}
              <br />
              <strong>User Address:</strong>{" "}
              {demand.latitude && demand.longitude
                ? `${demand.latitude}, ${demand.longitude}`
                : "Unknown"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ViewDemands;
