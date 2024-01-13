import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Backend from "../../constant";

const ViewDemands = () => {
  const [demandData, setDemandData] = useState({ demands: [] });
  const [center, setCenter] = useState([13.0676, 80.2187]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend}/resident-demand`);
        setDemandData(response.data);

        if (response.data.demands.length > 0) {
          const firstDemand = response.data.demands[0];
          const firstDemandCoordinates = getCoordinatesFromDemand(firstDemand);
          setCenter(firstDemandCoordinates);
        }
      } catch (error) {
        console.error("Error fetching demand data:", error);
      }
    };

    fetchData();
  }, []);

  const getCoordinatesFromDemand = (demand) => {
    return [demand.coordinates_lat, demand.coordinates_lng].map(parseFloat);
  };

  const getCustomMarkerIcon = () => {
    const colorClass = getRandomColor();
    return L.divIcon({
      className: `
        ${colorClass}
        inline-block
        w-8
        h-8
        rounded-full
        flex
        items-center
        justify-center
        text-xl
        text-gray-800
      `,
      html: `<i class="fas fa-map-marker-alt"></i>`,
    });
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
        {demandData.demands.map((demand, index) => {
          const coordinates = getCoordinatesFromDemand(demand);

          console.log("Coordinates for demand", index + 1, ":", coordinates);

          const userMarkerIcon = getCustomMarkerIcon();

          return (
            <Marker
              key={`${demand.id}-${index}`}
              position={coordinates}
              icon={userMarkerIcon}
            >
              <Popup>
                <strong>Demand:</strong> {demand.description}
                <br />
                <strong>Service Type:</strong> {demand.servicetype}
                <br />
                <strong>Contact no:</strong> {demand.phone_number || "Unknown"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ViewDemands;
