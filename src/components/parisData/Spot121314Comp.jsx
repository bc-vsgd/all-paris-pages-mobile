import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const Spot121314Comp = ({ data }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.nom_poi}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.adresse}
        </Typography>
        <Box display="flex" flexDirection="row" gap={2}>
          {data.url_image && (
            <CardMedia
              component="img"
              height="150"
              image={data.url_image}
              alt={data.nom_poi}
              sx={{ objectFit: "contain" }}
            />
          )}
          {data.fichier_image?.url && (
            <CardMedia
              component="img"
              height="150"
              image={data.fichier_image.url}
              alt={`${data.nom_poi} image`}
              sx={{ objectFit: "contain" }}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="row" gap={2}></Box>
      </CardContent>
      <CardContent>
        <Typography variant="body1" paragraph>
          {data.texte_intro}
        </Typography>
        <Typography variant="body1" paragraph>
          {data.texte_description}
        </Typography>
      </CardContent>

      <CardContent>
        {data.geo_shape?.geometry?.coordinates && (
          <Typography variant="body2" color="text.secondary">
            Coordinates: {data.geo_shape.geometry.coordinates.join(", ")}
          </Typography>
        )}
        {data.geo_point_2d && (
          <Typography variant="body2" color="text.secondary">
            Geo Point: {data.geo_point_2d.lat}, {data.geo_point_2d.lon}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Spot121314Comp;
