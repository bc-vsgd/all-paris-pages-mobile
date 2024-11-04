import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Circle,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const WomenWalksPage = ({ title, url, src }) => {
  const [walks, setWalks] = useState([]);
  const [walksLoading, setWalksLoading] = useState(true);
  const [walksError, setWalksError] = useState(null);

  const [women, setWomen] = useState([]);
  const [womenLoading, setWomenLoading] = useState(true);
  const [womenError, setWomenError] = useState(null);

  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchAllWalks = async () => {
      let allWalks = [];
      let start = 0;
      const limit = 100;

      try {
        while (true) {
          const response = await axios.get(
            `${url[0]}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allWalks = [...allWalks, ...results];
          start += limit;
        }

        setWalks(allWalks);
        setWalksLoading(false);
      } catch (err) {
        setWalksError("Erreur lors du chargement des données");
        setWalksLoading(false);
      }
    };

    fetchAllWalks();
  }, [url]);

  useEffect(() => {
    const fetchAllWomen = async () => {
      let allWomen = [];
      let start = 0;
      const limit = 100;

      try {
        while (true) {
          const response = await axios.get(
            `${url[1]}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allWomen = [...allWomen, ...results];
          start += limit;
        }

        const uniqueWomen = allWomen.filter(
          (woman, index, self) =>
            index === self.findIndex((w) => w.name === woman.name)
        );
        setWomen(uniqueWomen.sort((a, b) => a.name.localeCompare(b.name)));
        setWomenLoading(false);
      } catch (err) {
        setWomenError("Erreur lors du chargement des données");
        setWomenLoading(false);
      }
    };

    fetchAllWomen();
  }, [url]);

  if (walksLoading || womenLoading) {
    return <CircularProgress />;
  }

  if (walksError || womenError) {
    return <Typography color="error">{walksError || womenError}</Typography>;
  }

  return (
    <Box padding={2}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/paris-data"
        style={{ margin: "10px" }}
      >
        Open data Paris
      </Button>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Source: {src}
      </Typography>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        center={[48.8566, 2.3522]}
        zoom={12}
        bounds={[
          [48.8156, 2.2242],
          [48.9022, 2.4699],
        ]} // Limites correspondant aux coordonnées de Paris
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lon]}
            radius={10}
            pathOptions={{ color: "black", opacity: 1 }}
          />
        )}
        {walks.map(
          (walk, index) =>
            walk.geo_shape.geometry.type === "LineString" && (
              <React.Fragment key={index}>
                <Polyline
                  positions={walk.geo_shape.geometry.coordinates.map(
                    (coord) => [coord[1], coord[0]]
                  )}
                  color="blue"
                />
              </React.Fragment>
            )
        )}
        {women.map(
          (woman, index) =>
            woman.geo_point_2d && (
              <Circle
                key={`woman-circle-${index}`}
                center={[woman.geo_point_2d.lat, woman.geo_point_2d.lon]}
                radius={15}
                pathOptions={{ color: "blue" }}
              >
                <Popup>
                  <Box>
                    {woman.thumb_url && (
                      <img
                        src={woman.thumb_url}
                        alt={woman.name}
                        style={{ height: "100px", objectFit: "contain" }}
                      />
                    )}
                    <Typography variant="h6">{woman.name}</Typography>
                    <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                      <Typography variant="body2">
                        {woman.short_desc}
                      </Typography>
                      {[
                        woman.desc1,
                        woman.desc2,
                        woman.desc3,
                        woman.desc4,
                        woman.desc5,
                      ].map(
                        (desc, i) =>
                          desc && (
                            <Typography
                              key={`desc-${index}-${i}`}
                              variant="body2"
                            >
                              {desc}
                            </Typography>
                          )
                      )}
                    </Box>
                    {woman.website && (
                      <Typography variant="body2">
                        <a
                          href={woman.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {woman.website}
                        </a>
                      </Typography>
                    )}
                  </Box>
                </Popup>
              </Circle>
            )
        )}
      </MapContainer>
    </Box>
  );
};

export default WomenWalksPage;
