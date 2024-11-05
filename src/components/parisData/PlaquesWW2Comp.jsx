import React from "react";
import { Typography, Box } from "@mui/material";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PlaquesWW2Comp = ({ result }) => {
  return (
    result.xy && (
      <Circle
        center={[result.xy.lat, result.xy.lon]}
        radius={10}
        pathOptions={{ color: "blue" }}
      >
        <Popup>
          <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
            {result.commemore && (
              <Typography variant="body2" paragraph>
                <strong>{result.commemore}</strong>
              </Typography>
            )}
            {result.adresse_complete && (
              <Typography variant="body2" paragraph>
                {result.adresse_complete}
              </Typography>
            )}
            {result.precision_adresse &&
              result.precision_adresse !== "NULL" && (
                <Typography variant="body2" paragraph>
                  {result.precision_adresse}
                </Typography>
              )}
            {result.empty && (
              <Typography variant="body2" paragraph>
                <strong>Arrondissement:</strong> {result.empty}
              </Typography>
            )}
          </Box>
        </Popup>
      </Circle>
    )
  );
};

export default PlaquesWW2Comp;
