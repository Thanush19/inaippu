// src/App.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapApp = () => {
  const locations = [
    { name: "Vendor 1", latitude: 13.03196875, longitude: 80.21947594168645 },
    // Add more locations for street hawkers, service providers, etc.
  ];

  const center = [13.03196875, 80.21947594168645];
  const zoom = 13;

  return (
    <div>
      <h1>Vendor Map</h1>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapApp;
