import React from "react";
import { Typography, Box } from "@mui/material";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Spots121314Comp = ({ result }) => {
  return (
    result.geo_point_2d && (
      <Circle
        center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
        radius={20}
        pathOptions={{ color: "red" }}
      >
        <Popup>
          {result.url_image && (
            <img
              src={result.url_image}
              alt={result.nom_poi}
              style={{ height: "150px", objectFit: "contain" }}
            />
          )}
          <Typography variant="h6" fontWeight="bold">
            {result.nom_poi}
          </Typography>
          <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
            {result.adresse && (
              <Typography variant="body2" paragraph>
                {result.adresse}
              </Typography>
            )}
            {result.texte_intro && (
              <Typography variant="body2" paragraph>
                {result.texte_intro}
              </Typography>
            )}
            {result.texte_description && (
              <Typography variant="body2" paragraph>
                {result.texte_description}
              </Typography>
            )}
          </Box>
        </Popup>
      </Circle>
    )
  );
};

export default Spots121314Comp;
