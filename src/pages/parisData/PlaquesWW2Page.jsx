import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const PlaquesWW2Page = ({ title, url, src }) => {
  const [plaques, setPlaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allPlaques = [];
      let start = 0;
      const limit = 100;

      try {
        while (true) {
          const response = await axios.get(
            `${url}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allPlaques = [...allPlaques, ...results];
          start += limit;
        }

        setPlaques(allPlaques);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box padding={2} marginTop={"150px"}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Source: {src}
      </Typography>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        center={[48.8566, 2.3522]}
        zoom={12}
        bounds={[
          [48.8156, 2.2242],
          [48.9022, 2.4699],
        ]} // Limites correspondant aux coordonnées de Paris
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
        {plaques.map(
          (plaque, index) =>
            plaque.xy && (
              <Circle
                key={`plaque-circle-${index}`}
                center={[plaque.xy.lat, plaque.xy.lon]}
                radius={10}
                pathOptions={{ color: "blue" }}
              >
                <Popup>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {plaque.commemore && (
                      <Typography variant="body2" paragraph>
                        <strong>{plaque.commemore}</strong>
                      </Typography>
                    )}
                    {plaque.adresse_complete && (
                      <Typography variant="body2" paragraph>
                        {plaque.adresse_complete}
                      </Typography>
                    )}
                    {plaque.precision_adresse &&
                      plaque.precision_adresse !== "NULL" && (
                        <Typography variant="body2" paragraph>
                          {plaque.precision_adresse}
                        </Typography>
                      )}
                    {plaque.empty && (
                      <Typography variant="body2" paragraph>
                        <strong>Arrondissement:</strong> {plaque.empty}
                      </Typography>
                    )}
                  </Box>
                </Popup>
              </Circle>
            )
        )}
      </MapContainer>
    </Box>
  );
};

export default PlaquesWW2Page;
