import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography } from "@mui/material";

const MoviesComp = ({ result }) => {
  return (
    <Circle
      center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
      radius={10}
      pathOptions={{ color: "red" }}
    >
      <Popup>
        <Typography variant="h6" fontWeight="bold">
          {result.nom_tournage}
        </Typography>
        <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
          {result.adresse_lieu && result.ardt_lieu && (
            <Typography variant="body2" paragraph>
              {result.adresse_lieu}, arrt: {result.ardt_lieu}
            </Typography>
          )}
          {result.nom_realisateur && (
            <Typography variant="body2" paragraph>
              <strong>Réalisateur:</strong> {result.nom_realisateur}
            </Typography>
          )}
          {result.annee_tournage && (
            <Typography variant="body2" paragraph>
              {result.annee_tournage}
            </Typography>
          )}
          {result.type_tournage && (
            <Typography variant="body2" paragraph>
              {result.type_tournage}
            </Typography>
          )}
          {result.nom_producteur && (
            <Typography variant="body2" paragraph>
              {result.nom_producteur}
            </Typography>
          )}
        </Box>
      </Popup>
    </Circle>
  );
};

export default MoviesComp;
