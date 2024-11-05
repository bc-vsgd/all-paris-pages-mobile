import React from "react";
import { Typography, Box } from "@mui/material";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WomenComp = ({ result }) => {
  return (
    <Circle
      center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
      radius={15}
      pathOptions={{ color: "blue" }}
    >
      <Popup>
        <Box>
          {result.thumb_url && (
            <img
              src={result.thumb_url}
              alt={result.name}
              style={{ height: "100px", objectFit: "contain" }}
            />
          )}
          <Typography variant="h6">{result.name}</Typography>
          <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
            <Typography variant="body2">{result.short_desc}</Typography>
            {[
              result.desc1,
              result.desc2,
              result.desc3,
              result.desc4,
              result.desc5,
            ].map(
              (desc, i) =>
                desc && (
                  <Typography key={`desc-${i}`} variant="body2">
                    {desc}
                  </Typography>
                )
            )}
          </Box>
          {result.website && (
            <Typography variant="body2">
              <a
                href={result.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.website}
              </a>
            </Typography>
          )}
        </Box>
      </Popup>
    </Circle>
  );
};

export default WomenComp;
