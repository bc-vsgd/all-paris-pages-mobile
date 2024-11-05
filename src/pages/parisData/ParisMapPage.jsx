import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

function MapPage({ url, title, src, component: Component = null }) {
  const [results, setResults] = useState(null);
  results && console.log("results:", results.length);

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

          if (Component && Component.name === "WomenComp") {
            const uniqueResults = [];
            const seenNames = new Set();

            for (const result of allResults) {
              if (!seenNames.has(result.name)) {
                seenNames.add(result.name);
                uniqueResults.push(result);
              }
            }

            setResults(uniqueResults);
          } else {
            setResults(allResults);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [url, Component]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/paris-data"
        style={{ margin: "10px" }}
      >
        Open data Paris
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
            [48.8156, 2.2242],
            [48.9022, 2.4699],
          ]} // Limites correspondant aux coordonnées de Paris
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
