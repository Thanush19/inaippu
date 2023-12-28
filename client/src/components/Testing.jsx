import React, { useState } from "react";

const Testing = () => {
  const [locationData, setLocationData] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
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
          } catch (error) {
            console.error("Error fetching live location data:", error);
          }
        },
        (error) => {
          console.error("Error getting live location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
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
  );
};

export default Testing;
