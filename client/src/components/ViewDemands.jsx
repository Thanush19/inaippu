import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Backend from "../../constant";

const ViewDemands = () => {
  const [demandData, setDemandData] = useState([]);
  const [center, setCenter] = useState([13.0676, 80.2187]); // Default center

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Backend}/resident-demand`);
      setDemandData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching demand data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
        {demandData.map((demand) => {
          // Parse coordinates from the userAddress field
          const coordinates = demand.userAddress
            ? demand.userAddress
                .match(/-?\d+\.\d+/g)
                .map((coord) => parseFloat(coord))
            : [0, 0];

          return (
            <Marker key={demand.id} position={coordinates}>
              <Popup>
                <strong>Demand:</strong> {demand.description}
                <br />
                <strong>Service Type:</strong> {demand.serviceType}
                <br />
                <strong>User Address:</strong> {demand.userAddress || "Unknown"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ViewDemands;
