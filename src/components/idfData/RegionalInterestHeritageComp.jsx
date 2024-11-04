import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function RegionalInterestHeritageComp({ result }) {
  return (
    result.gps &&
    result.gps.lat &&
    result.gps.lon && (
      <Circle
        center={[result.gps.lat, result.gps.lon]}
        radius={10}
        pathOptions={{ color: "blue" }}
        eventHandlers={{
          click: () => {},
        }}
      >
        <Popup>
          <div>
            <strong>{result.nom_du_site}</strong>
            <Box
              sx={{
                maxHeight: "200px",
                overflowY: "auto",
                mt: 1,
              }}
            >
              {result.photo && result.photo.url && (
                <img
                  src={result.photo.url}
                  alt={result.nom_du_site}
                  style={{ height: "100px", objectFit: "contain" }}
                />
              )}
              <p>
                <strong>Adresse:</strong> {result.adresse}
              </p>
              <p>
                <strong>Propriétaire / mandataire:</strong>{" "}
                {
                  result.proprietaire_du_bien_et_ou_de_la_structure_mandatee_par_le_proprietaire
                }
              </p>
              <p>{result.commentaires}</p>
              <p>{result.label}</p>
            </Box>
          </div>
        </Popup>
      </Circle>
    )
  );
}

export default RegionalInterestHeritageComp;
