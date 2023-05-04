import React, { useState, useEffect } from "react";
import useWorldMap from "./useWorldMap";

async function fetchCountriesWithStories() {
  try {
    const response = await fetch(
      `http://localhost:3001/api/countries-highlighted`
    );
    if (response.ok) {
      const fetchedCountries = await response.json();
      return fetchedCountries.map((countryObj) => countryObj.country);
    } else {
      console.error("Error fetching countries.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    return null;
  }
}

function WorldMap() {
  const [countriesWithStories, setCountriesWithStories] = useState([]);
  const { mapRef } = useWorldMap(countriesWithStories);

  useEffect(() => {
    async function fetchData() {
      const fetchedCountries = await fetchCountriesWithStories();
      setCountriesWithStories(fetchedCountries || []);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div
        id="info-box"
        style={{
          position: "absolute",
          top: "64px",
          right: "10px",
          zIndex: 1000,
          padding: "6px",
          borderRadius: "5px",
          background: "rgba(255, 255, 255, 0.8)",
          maxWidth: "300px",
          display: "none", // Initially set to 'none' to hide the info box
        }}
      />
      <div
        id="map"
        ref={mapRef}
        style={{
          height: "calc(100% - 64px)",
          width: "100%",
          position: "absolute",
          top: "64px",
          left: 0,
        }}
      />
    </div>
  );
}

export default WorldMap;
