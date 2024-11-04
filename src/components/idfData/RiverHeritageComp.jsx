import React from "react";
import { Circle, Polyline, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function RiverHeritageComp({ result }) {
  const PopupComp = () => {
    return (
      <Popup>
        <div>
          <strong>{result.elem_patri}</strong> ({result.commune})
          <Box
            sx={{
              maxHeight: "150px",
              overflowY: "auto",
              mt: 1,
            }}
          >
            <p>{result.ensem2}</p>
            <p>{result.elem_princ}</p>
            <p>{result.histo1}</p>
            <p>{result.commentair}</p>
          </Box>
        </div>
      </Popup>
    );
  };

  const renderGeometry = () => {
    const { geometry } = result.geo_shape;
    if (!geometry) return null;

    const { type, coordinates } = geometry;
    switch (type) {
      case "Point":
        return (
          <Circle
            center={[coordinates[1], coordinates[0]]}
            radius={10}
            pathOptions={{ color: "blue" }}
          >
            <PopupComp />
          </Circle>
        );
      case "MultiPoint":
        return coordinates.map((point, index) => (
          <Circle
            key={index}
            center={[point[1], point[0]]}
            radius={10}
            pathOptions={{ color: "blue" }}
          >
            <PopupComp />
          </Circle>
        ));
      case "LineString":
        return (
          <Polyline
            positions={coordinates.map((coord) => [coord[1], coord[0]])}
          >
            <PopupComp />
          </Polyline>
        );
      case "MultiLineString":
        return coordinates.map((line, index) => (
          <Polyline
            key={index}
            positions={line.map((coord) => [coord[1], coord[0]])}
          >
            <PopupComp />
          </Polyline>
        ));
      case "Polygon":
        return (
          <Polygon
            positions={coordinates[0].map((coord) => [coord[1], coord[0]])}
          >
            <PopupComp />
          </Polygon>
        );
      case "MultiPolygon":
        return coordinates.map((polygon, index) => (
          <Polygon
            key={index}
            positions={polygon[0].map((coord) => [coord[1], coord[0]])}
          >
            <PopupComp />
          </Polygon>
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      {result.geo_shape && result.geo_shape.geometry && (
        <div>{renderGeometry()}</div>
      )}
    </div>
  );
}

export default RiverHeritageComp;
