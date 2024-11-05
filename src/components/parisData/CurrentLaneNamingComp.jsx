import React from "react";
import { Typography, Box } from "@mui/material";
import { Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CurrentLaneNamingComp = ({ result }) => {
  const renderPopup = (result) => (
    <Popup>
      <Typography variant="body2" fontWeight="bold">
        {result.typo_min}
      </Typography>
      <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
        {result.alignement && (
          <Typography variant="body2" paragraph>
            <strong>Alignement:</strong> {result.alignement}
          </Typography>
        )}
        {result.servitude && (
          <Typography variant="body2" paragraph>
            <strong>Servitude:</strong> {result.servitude}
          </Typography>
        )}
        {result.historique && (
          <Typography variant="body2" paragraph>
            <strong>Historique:</strong> {result.historique}
          </Typography>
        )}
        {result.denomination && (
          <Typography variant="body2" paragraph>
            <strong>Dénomination:</strong> {result.denomination}
          </Typography>
        )}
        {result.classement && (
          <Typography variant="body2" paragraph>
            <strong>Classement:</strong> {result.classement}
          </Typography>
        )}
        {result.observation && (
          <Typography variant="body2" paragraph>
            <strong>Observation:</strong> {result.observation}
          </Typography>
        )}
        {result.numerotage && (
          <Typography variant="body2" paragraph>
            <strong>Numérotage:</strong> {result.numerotage}
          </Typography>
        )}
        {result.orig && (
          <Typography variant="body2" paragraph>
            <strong>Origine:</strong> {result.orig}
          </Typography>
        )}
        {result.declassement && (
          <Typography variant="body2" paragraph>
            <strong>Déclassement:</strong> {result.declassement}
          </Typography>
        )}
        {result.nivellement && (
          <Typography variant="body2" paragraph>
            <strong>Nivellement:</strong> {result.nivellement}
          </Typography>
        )}
        {result.assainissement && (
          <Typography variant="body2" paragraph>
            <strong>Assainissement:</strong> {result.assainissement}
          </Typography>
        )}
        {result.ouverture && (
          <Typography variant="body2" paragraph>
            <strong>Ouverture:</strong> {result.ouverture}
          </Typography>
        )}
      </Box>
    </Popup>
  );

  const coordinates = result.geo_shape?.geometry?.coordinates;
  const geometryType = result.geo_shape?.geometry?.type;

  return (
    <>
      {coordinates && geometryType
        ? (() => {
            switch (geometryType) {
              case "Polygon":
                return (
                  <Polygon
                    positions={coordinates[0].map((coord) => [
                      coord[1],
                      coord[0],
                    ])}
                    pathOptions={{ color: "blue" }}
                  >
                    {renderPopup(result)}
                  </Polygon>
                );
              case "MultiPolygon":
                return coordinates.map((polygon, polygonIndex) => (
                  <Polygon
                    positions={polygon[0].map((coord) => [coord[1], coord[0]])}
                    pathOptions={{ color: "blue" }}
                  >
                    {renderPopup(result)}
                  </Polygon>
                ));
              default:
                return null;
            }
          })()
        : null}
    </>
  );
};

export default CurrentLaneNamingComp;
