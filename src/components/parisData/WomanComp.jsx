import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const WomanComp = ({ data }) => {
  return (
    <Card>
      {data.thumb_url && (
        <CardMedia
          component="img"
          style={{ objectFit: "contain", height: "140px", width: "100%" }}
          image={data.thumb_url}
          alt={data.name}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.short_desc}
        </Typography>
        <Typography variant="body1" paragraph>
          {data.desc1}
        </Typography>
        <Typography variant="body1" paragraph>
          {data.desc2}
        </Typography>
        {data.desc3 && (
          <Typography variant="body1" paragraph>
            {data.desc3}
          </Typography>
        )}
        {data.desc4 && (
          <Typography variant="body1" paragraph>
            {data.desc4}
          </Typography>
        )}
        {data.desc5 && (
          <Typography variant="body1" paragraph>
            {data.desc5}
          </Typography>
        )}
        {data.website && (
          <Typography variant="body2" color="primary">
            <a href={data.website} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </Typography>
        )}
        {data.geo_shape && data.geo_shape.geometry && (
          <Typography variant="body2" color="text.secondary">
            Coordinates: {data.geo_shape.geometry.coordinates.join(", ")}
          </Typography>
        )}
        {data.geo_point_2d && (
          <Typography variant="body2" color="text.secondary">
            Geo Point: {data.geo_point_2d.lon}, {data.geo_point_2d.lat}
          </Typography>
        )}
        {data.photos && data.photos.url && (
          <CardMedia
            component="img"
            style={{ objectFit: "contain", height: "140px", width: "100%" }}
            image={data.photos.url}
            alt={`${data.name} photo`}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WomanComp;
