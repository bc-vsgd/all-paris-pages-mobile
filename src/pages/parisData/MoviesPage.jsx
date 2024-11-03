import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const MoviesPage = ({ title, url, src }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldestYear, setOldestYear] = useState(null);
  const [newestYear, setNewestYear] = useState(null);
  const userLocation = useStore((state) => state.userLocation);

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

        // Find the oldest and newest year
        const years = allPlaces
          .map((place) => place.annee_tournage)
          .filter((year) => year)
          .map(Number);
        if (years.length > 0) {
          setOldestYear(Math.min(...years));
          setNewestYear(Math.max(...years));
        }

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
      {oldestYear && newestYear && (
        <Typography variant="h6" gutterBottom>
          Année la plus ancienne: {oldestYear}, Année la plus récente:{" "}
          {newestYear}
        </Typography>
      )}
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
                pathOptions={{ color: "red" }}
              >
                <Popup>
                  <Typography variant="h6" fontWeight="bold">
                    {place.nom_tournage}
                  </Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {place.adresse_lieu && place.ardt_lieu && (
                      <Typography variant="body2" paragraph>
                        {place.adresse_lieu}, arrt: {place.ardt_lieu}
                      </Typography>
                    )}
                    {place.nom_realisateur && (
                      <Typography variant="body2" paragraph>
                        <strong>Réalisateur:</strong> {place.nom_realisateur}
                      </Typography>
                    )}
                    {place.annee_tournage && (
                      <Typography variant="body2" paragraph>
                        {place.annee_tournage}
                      </Typography>
                    )}
                    {place.type_tournage && (
                      <Typography variant="body2" paragraph>
                        {place.type_tournage}
                      </Typography>
                    )}
                    {place.nom_producteur && (
                      <Typography variant="body2" paragraph>
                        {place.nom_producteur}
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

export default MoviesPage;
