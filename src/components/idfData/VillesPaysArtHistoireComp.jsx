import React from "react";
import { Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function VillesPaysArtHistoireComp({ result }) {
  if (
    !result.geo_shape ||
    !result.geo_shape.geometry ||
    !result.geo_shape.geometry.coordinates
  ) {
    return null;
  }

  // Flatten the coordinates array to match the expected format for the Polygon component
  const coordinates = result.geo_shape.geometry.coordinates[0].map((coord) => [
    coord[1],
    coord[0],
  ]);

  return (
    <Polygon positions={coordinates} pathOptions={{ color: "blue" }}>
      <Popup>
        <div>
          {result.nomzonelab && <strong>{result.nomzonelab}</strong>}
          {result.a_voir && (
            <p>
              <strong>A voir:</strong> {result.a_voir}
            </p>
          )}
          {result.themes && (
            <p>
              <strong>Thèmes:</strong> {result.themes}
            </p>
          )}
          {result.commentair && (
            <p>
              <strong>Commentaires:</strong> {result.commentair}
            </p>
          )}
        </div>
      </Popup>
    </Polygon>
  );
}

export default VillesPaysArtHistoireComp;
