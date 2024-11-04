import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const ArcheologyPage = ({ title, url, src }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLocation = useStore((state) => state.userLocation);
  console.log(userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allPlaces = [];
      let start = 0;
      const limit = 100;
      const maxRecords = 10000;

      try {
        while (start < maxRecords) {
          const response = await axios.get(
            `${url}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allPlaces = [...allPlaces, ...results];
          start += limit;
        }

        setPlaces(allPlaces);
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
    <Box padding={2}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/paris-data"
        style={{ margin: "10px" }}
      >
        Open data Paris
      </Button>
      <Typography variant="h6" gutterBottom>
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
        {places.map(
          (place, index) =>
            place.geo_point_2d && (
              <Circle
                key={`place-circle-${index}`}
                center={[place.geo_point_2d.lat, place.geo_point_2d.lon]}
                radius={10}
                pathOptions={{ color: "blue" }}
              >
                <Popup>
                  <Typography variant="body2" fontWeight="bold">
                    {place.adresse} ({place.code_postal})
                  </Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {place.responsable_operation && (
                      <Typography variant="body2" fontWeight="bold" paragraph>
                        {place.responsable_operation}
                      </Typography>
                    )}
                    {(place.nature_operation || place.date_operation) && (
                      <Typography variant="body2" paragraph>
                        {place.nature_operation}{" "}
                        {place.date_operation && (
                          <strong>({place.date_operation})</strong>
                        )}
                      </Typography>
                    )}
                    {place.synthese && (
                      <Typography variant="body2" paragraph>
                        {place.synthese}
                      </Typography>
                    )}
                    {place.prehistoire && (
                      <Typography variant="body2" paragraph>
                        <strong>Préhistoire:</strong> {place.prehistoire}
                      </Typography>
                    )}
                    {place.protohistoire && (
                      <Typography variant="body2" paragraph>
                        <strong>Protohistoire:</strong> {place.protohistoire}
                      </Typography>
                    )}
                    {place.antiquite && (
                      <Typography variant="body2" paragraph>
                        <strong>Antiquité:</strong> {place.antiquite}
                      </Typography>
                    )}
                    {place.moyen_age && (
                      <Typography variant="body2" paragraph>
                        <strong>Moyen-Age:</strong> {place.moyen_age}
                      </Typography>
                    )}
                    {place.temps_modernes && (
                      <Typography variant="body2" paragraph>
                        <strong>Temps modernes:</strong> {place.temps_modernes}
                      </Typography>
                    )}
                    {place.epoque_contemporaine && (
                      <Typography variant="body2" paragraph>
                        <strong>Époque contemporaine:</strong>{" "}
                        {place.epoque_contemporaine}
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

export default ArcheologyPage;
