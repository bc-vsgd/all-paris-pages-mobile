import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

function MapPage({ url, title, src, component: Component }) {
  const [results, setResults] = useState(null);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    if (url.length === 1) {
      const fetchData = async () => {
        try {
          let allResults = [];
          let start = 0;
          let hasMore = true;

          while (hasMore) {
            const response = await fetch(
              `${url[0]}/records?start=${start}&limit=100`
            );
            if (response.ok) {
              const data = await response.json();
              if (data.results.length > 0) {
                allResults = [...allResults, ...data.results];
                start += 100;
              } else {
                hasMore = false;
              }
            } else {
              console.error("Error fetching data:", response.statusText);
              hasMore = false;
            }
          }

          console.log("Number of results:", allResults.length);
          setResults(allResults);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [url]);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/idf-data"
        style={{ margin: "10px" }}
      >
        Open data Région Ile-de-France
      </Button>
      <h3>{title}</h3>
      <p>Source: {src}</p>
      {/* <a href={url[0]} target="_blank" rel="noopener noreferrer">
        Consulter les données
      </a> */}
      <div>
        <MapContainer
          style={{ height: "500px", width: "100%" }}
          bounds={[
            [48.075, 1.375],
            [49.275, 3.625],
          ]}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Circle
              center={[userLocation.lat, userLocation.lon]}
              radius={10}
              pathOptions={{ color: "black", opacity: 1 }}
            />
          )}
          {results &&
            results.map((result, index) => (
              <Component key={index} result={result} />
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
