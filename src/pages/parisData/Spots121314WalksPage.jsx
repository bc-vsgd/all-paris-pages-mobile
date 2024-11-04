import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Circle,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const Spots121314WalksPage = ({ title, url, src }) => {
  const [walks, setWalks] = useState([]);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allWalks = [];
      let allSpots = [];
      let start = 0;
      const limit = 100;

      try {
        // Fetch walks
        while (true) {
          const responseWalks = await axios.get(
            `${url[0]}?start=${start}&limit=${limit}`
          );
          const resultsWalks = responseWalks.data.results;

          if (resultsWalks.length === 0) {
            break;
          }

          allWalks = [...allWalks, ...resultsWalks];
          start += limit;
        }

        start = 0; // Reset start for fetching spots

        // Fetch spots
        while (true) {
          const responseSpots = await axios.get(
            `${url[1]}?start=${start}&limit=${limit}`
          );
          const resultsSpots = responseSpots.data.results;

          if (resultsSpots.length === 0) {
            break;
          }

          allSpots = [...allSpots, ...resultsSpots];
          start += limit;
        }

        setWalks(allWalks);
        setSpots(allSpots);
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
        {walks.map((walk, index) => (
          <React.Fragment key={index}>
            {(walk.geo_shape?.geometry?.type === "MultiLineString" ||
              walk.geo_shape?.geometry?.type === "LineString") && (
              <Polyline
                positions={walk.geo_shape.geometry.coordinates.map((line) =>
                  Array.isArray(line[0])
                    ? line.map((coord) => [coord[1], coord[0]])
                    : [line[1], line[0]]
                )}
                color="blue"
              />
            )}
            {walk.geo_point_2d && (
              <Circle
                center={[walk.geo_point_2d.lat, walk.geo_point_2d.lon]}
                radius={20}
                pathOptions={{ color: "blue" }}
              >
                <Popup>
                  <Typography variant="h6" fontWeight="bold">
                    {walk.titre_balade}
                  </Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {walk.texte_intro && (
                      <Typography variant="body2" paragraph>
                        {walk.texte_intro}
                      </Typography>
                    )}
                    {walk.pour_qui && (
                      <Typography variant="body2" paragraph>
                        <strong>Pour qui:</strong> {walk.pour_qui}
                      </Typography>
                    )}
                    {walk.pourquoi && (
                      <Typography variant="body2" paragraph>
                        <strong>Pourquoi:</strong> {walk.pourquoi}
                      </Typography>
                    )}
                    {walk.chasse_au_tresor && (
                      <Typography variant="body2" paragraph>
                        <strong>Chasse au trésor:</strong>{" "}
                        {walk.chasse_au_tresor}
                      </Typography>
                    )}
                    {walk.saviez_vous && (
                      <Typography variant="body2" paragraph>
                        <strong>Saviez-vous:</strong> {walk.saviez_vous}
                      </Typography>
                    )}
                    {walk.quand && (
                      <Typography variant="body2" paragraph>
                        <strong>Quand:</strong> {walk.quand}
                      </Typography>
                    )}
                    {walk.mot_cle && (
                      <Typography variant="body2" paragraph>
                        <strong>Mots-clés:</strong> {walk.mot_cle.join(", ")}
                      </Typography>
                    )}
                  </Box>
                </Popup>
              </Circle>
            )}
          </React.Fragment>
        ))}
        {spots.map(
          (spot, index) =>
            spot.geo_point_2d && (
              <Circle
                key={`spot-circle-${index}`}
                center={[spot.geo_point_2d.lat, spot.geo_point_2d.lon]}
                radius={20}
                pathOptions={{ color: "red" }}
              >
                <Popup>
                  {spot.url_image && (
                    <img
                      src={spot.url_image}
                      alt={spot.nom_poi}
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    {spot.nom_poi}
                  </Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {spot.adresse && (
                      <Typography variant="body2" paragraph>
                        {spot.adresse}
                      </Typography>
                    )}
                    {spot.texte_intro && (
                      <Typography variant="body2" paragraph>
                        {spot.texte_intro}
                      </Typography>
                    )}
                    {spot.texte_description && (
                      <Typography variant="body2" paragraph>
                        {spot.texte_description}
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

export default Spots121314WalksPage;
