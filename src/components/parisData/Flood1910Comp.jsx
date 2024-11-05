import React from "react";
import { Typography, Box } from "@mui/material";
import { Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Flood1910Comp = ({ result }) => {
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
                    <Popup>
                      <Typography variant="body2" fontWeight="bold">
                        Zone inondée
                      </Typography>
                      <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                        <Typography variant="body2">
                          {result.fields?.adresse_complete}
                        </Typography>
                      </Box>
                    </Popup>
                  </Polygon>
                );
              case "MultiPolygon":
                return coordinates.map((polygon, polygonIndex) => (
                  <Polygon
                    positions={polygon[0].map((coord) => [coord[1], coord[0]])}
                    pathOptions={{ color: "blue" }}
                  >
                    <Popup>
                      <Typography variant="body2" fontWeight="bold">
                        Zone inondée
                      </Typography>
                      <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                        <Typography variant="body2">
                          {result.fields?.adresse_complete}
                        </Typography>
                      </Box>
                    </Popup>
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

export default Flood1910Comp;
