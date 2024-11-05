import React from "react";
import { Typography, Box } from "@mui/material";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PlaquesComp = ({ result }) => {
  return (
    result.geo_point_2d && (
      <Circle
        center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
        radius={10}
        pathOptions={{ color: "blue" }}
      >
        <Popup>
          <Typography variant="h6" fontWeight="bold">
            {result.titre}
          </Typography>
          <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
            {result.adresse && result.ardt && (
              <Typography variant="body2" paragraph>
                {result.adresse} ({result.ardt})
              </Typography>
            )}
            {result.retranscription && (
              <Typography variant="body2" paragraph>
                {result.retranscription.split(/[\/|]/).map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            )}
            {result.siecle && (
              <Typography variant="body2" paragraph>
                <strong>Siècle:</strong> {result.siecle}
              </Typography>
            )}
            {(result.periode_1 || result.periode_2) && (
              <Typography variant="body2" paragraph>
                <strong>Période:</strong> {result.periode_1}{" "}
                {result.periode_2 && `, ${result.periode_2}`}
              </Typography>
            )}
            {(result.objet_1 || result.objet_2) && (
              <Typography variant="body2" paragraph>
                <strong>Objet:</strong> {result.objet_1}{" "}
                {result.objet_2 && `, ${result.objet_2}`}
              </Typography>
            )}
            {result.personnalite && (
              <Typography variant="body2" paragraph>
                <strong>Personnalité:</strong> {result.personnalite}
              </Typography>
            )}
            {result.pays && (
              <Typography variant="body2" paragraph>
                <strong>Pays:</strong> {result.pays}
              </Typography>
            )}
          </Box>
        </Popup>
      </Circle>
    )
  );
};

export default PlaquesComp;
