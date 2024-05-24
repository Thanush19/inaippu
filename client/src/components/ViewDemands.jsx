import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Backend from "../../constant";
import ph from "../assets/black-bg.png";
import { useNavigate } from "react-router-dom";

const ViewDemands = () => {
  const [demandData, setDemandData] = useState({ demands: [] });
  const [center, setCenter] = useState([13.0676, 80.2187]);
  const [isFullMap, setIsFullMap] = useState(false);
  const navigate = useNavigate();

  const back = () => {
    navigate("/");
  };

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

  const toggleMapSize = () => {
    setIsFullMap(!isFullMap);
  };

  return (
    <div className="bg-black">
      <button
        className="mt-4 px-4 py-2 text-black bg-white rounded-3xl ml-[5%]"
        onClick={back}
      >
        Go Back
      </button>
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
        onClick={(e) => {
          if (isFullMap && e.target.closest(".leaflet-container") === null) {
            toggleMapSize();
          }
        }}
      >
        <h2 className="text-3xl text-white mb-10">View Demands</h2>
        <div
          className={`${
            isFullMap ? "w-full h-screen" : "w-full md:w-3/5 h-[400px]"
          } transition-all duration-500`}
          style={{ cursor: isFullMap ? "default" : "pointer" }}
          onClick={() => {
            if (!isFullMap) toggleMapSize();
          }}
        >
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {demandData.demands.map((demand, index) => {
              const coordinates = getCoordinatesFromDemand(demand);

              console.log(
                "Coordinates for demand",
                index + 1,
                ":",
                coordinates
              );

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
                    <strong>Contact no:</strong>{" "}
                    {demand.phone_number || "Unknown"}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewDemands;
