import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Backend from "../../constant";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";
import L from "leaflet";

const MapApp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(selectUserData);
  console.log(currentUser);

  const center = [13.03196875, 80.21947594168645];
  const zoom = 13;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${Backend}/users/getAllUsers`);
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Vendor Map</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <Marker
              key={user.id}
              position={[user.coordinates.latitude, user.coordinates.longitude]}
            >
              <Popup>
                <p>{`Username: ${user.username}`}</p>
                <p>{`Services: ${user.services.join(", ")}`}</p>
                <p>{`Phone number: ${user.phone_number}`}</p>
              </Popup>
            </Marker>
          ))}
          {currentUser && (
            <Marker
              position={[
                currentUser.coordinates.latitude,
                currentUser.coordinates.longitude,
              ]}
              icon={L.divIcon({
                className: "leaflet-div-icon",
                html: `<div><FontAwesomeIcon icon={faUser} /></div>`,
              })}
            >
              <Popup>
                <p>{`Your Location`}</p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapApp;
