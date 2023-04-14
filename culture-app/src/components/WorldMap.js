import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function WorldMap() {
  const mapRef = useRef(null);
  const boundsRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      minZoom: 2,
      noWrap: true,
      maxBounds: L.latLngBounds(L.latLng(-90, -179.999), L.latLng(90, 179.999)),
    }).setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add bounds rectangle to map
    const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
    boundsRef.current = L.rectangle(bounds, {
      fillOpacity: 0,
      weight: 2,
    }).addTo(map);

    // Load GeoJSON data and add to map
    fetch("countries.geo.json")
      .then((response) => response.json())
      .then((geojsonData) => {
        L.geoJSON(geojsonData, {
          onEachFeature: (feature, layer) => {
            layer.on("click", () => {
              // Handle click event
              console.log("Clicked on:", feature.properties.name);
            });
          },
        }).addTo(map);
      });

    // Add zoom event listener to adjust bounds rectangle visibility
    map.on("zoomend", () => {
      if (map.getZoom() < 3) {
        boundsRef.current.setStyle({ opacity: 0 });
      } else {
        boundsRef.current.setStyle({ opacity: 1 });
      }
    });

    // Cleanup function to remove map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return (
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
  );
}

export default WorldMap;
