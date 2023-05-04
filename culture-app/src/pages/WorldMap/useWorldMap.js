import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const useWorldMap = (countriesWithStories) => {
  const mapRef = useRef(null);
  const boundsRef = useRef(null);
  const navigate = useNavigate();

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
    fetch("/countries.geo.json")
      .then((response) => response.json())
      .then((geojsonData) => {
        L.geoJSON(geojsonData, {
          style: (feature) => {
            return {
              fillColor: countriesWithStories.includes(feature.properties.ADMIN)
                ? "blue" // Change this to the desired highlight color
                : "gray", // Change this to the desired default color
              fillOpacity: 0.7,
              weight: 1,
              color: "black",
            };
          },
          onEachFeature: (feature, layer) => {
            const onMouseOver = async (e) => {
              // Fetch country information from REST Countries API
              try {
                const response = await axios.get(
                  `https://restcountries.com/v3.1/alpha/${feature.properties.ISO_A2}`
                );
                const country = response.data[0]; // Access the first item in the array
                layer.countryData = country;

                if (country && country.name && country.name.common) {
                  const countryName = country.name.common;
                  const capital = country.capital ? country.capital[0] : "N/A";
                  const population = country.population || "N/A";
                  const area = country.area || "N/A";
                  const currencyCode = Object.keys(country.currencies)[0];
                  const currencyName = country.currencies[currencyCode].name;
                  const flag = country.flags.svg;

                  // Show the tooltip with country information
                  const tooltipContent = `
                    <img src="${flag}" alt="${countryName} flag" style="width: 100%; border: 1px solid black; border-radius: 5px;" />
                    <strong>${countryName}</strong><br/>
                    Capital: ${capital}<br/>
                    Population: ${population}<br/>
                    Area: ${area} km²<br/>
                    Currency: ${currencyName} (${currencyCode})
                  `;

                  const infoBox = document.getElementById("info-box");
                  infoBox.style.display = "block";
                  infoBox.innerHTML = tooltipContent;
                } else {
                  console.error(
                    "Country information not found or incomplete:",
                    country
                  );
                }
              } catch (error) {
                console.error("Error fetching country information:", error);
              }
            };
            const onClick = () => {
              if (
                layer.countryData &&
                layer.countryData.name &&
                layer.countryData.name.common
              ) {
                navigate("/purpose", {
                  state: { selectedCountry: layer.countryData },
                });
              } else {
                console.log("Country information not available");
              }
            };
            const onMouseOut = (e) => {
              // Hide the information box
              const infoBox = document.getElementById("info-box");
              infoBox.style.display = "none";
            };
            layer.on("click", onClick);
            layer.on("mouseover", onMouseOver);
            layer.on("mouseout", onMouseOut);

            // Add cleanup function to remove event listeners
            layer.on("remove", () => {
              layer.off("click", onClick);
              layer.off("mouseover", onMouseOver);
              layer.off("mouseout", onMouseOut);
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
  }, [navigate, countriesWithStories]);

  return { mapRef, boundsRef };
};

export default useWorldMap;
