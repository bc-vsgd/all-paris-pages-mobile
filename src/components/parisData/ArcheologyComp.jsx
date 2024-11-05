import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography } from "@mui/material";
const ArcheologyComp = ({ result }) => {
  return (
    <Circle
      center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
      radius={10}
      pathOptions={{ color: "blue" }}
    >
      <Popup>
        <Typography variant="body2" fontWeight="bold">
          {result.adresse} ({result.code_postal})
        </Typography>
        <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
          {result.responsable_operation && (
            <Typography variant="body2" fontWeight="bold" paragraph>
              {result.responsable_operation}
            </Typography>
          )}
          {(result.nature_operation || result.date_operation) && (
            <Typography variant="body2" paragraph>
              {result.nature_operation}{" "}
              {result.date_operation && (
                <strong>({result.date_operation})</strong>
              )}
            </Typography>
          )}
          {result.synthese && (
            <Typography variant="body2" paragraph>
              {result.synthese}
            </Typography>
          )}
          {result.prehistoire && (
            <Typography variant="body2" paragraph>
              <strong>Préhistoire:</strong> {result.prehistoire}
            </Typography>
          )}
          {result.protohistoire && (
            <Typography variant="body2" paragraph>
              <strong>Protohistoire:</strong> {result.protohistoire}
            </Typography>
          )}
          {result.antiquite && (
            <Typography variant="body2" paragraph>
              <strong>Antiquité:</strong> {result.antiquite}
            </Typography>
          )}
          {result.moyen_age && (
            <Typography variant="body2" paragraph>
              <strong>Moyen-Age:</strong> {result.moyen_age}
            </Typography>
          )}
          {result.temps_modernes && (
            <Typography variant="body2" paragraph>
              <strong>Temps modernes:</strong> {result.temps_modernes}
            </Typography>
          )}
          {result.epoque_contemporaine && (
            <Typography variant="body2" paragraph>
              <strong>Époque contemporaine:</strong>{" "}
              {result.epoque_contemporaine}
            </Typography>
          )}
        </Box>
      </Popup>
    </Circle>
  );
};

export default ArcheologyComp;
