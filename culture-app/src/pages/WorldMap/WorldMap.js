import React from "react";
import useWorldMap from "./useWorldMap";

function WorldMap() {
  const { mapRef } = useWorldMap();

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
