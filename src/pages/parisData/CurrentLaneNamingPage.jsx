import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Polygon, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const CurrentLaneNamingPage = ({ title, url, src }) => {
  const [lanes, setLanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geometryTypes, setGeometryTypes] = useState({});
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allLanes = [];
      let start = 0;
      const limit = 100;
      const maxRecords = 10000;

      try {
        while (start < maxRecords) {
          const response = await axios.get(
            `${url}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allLanes = [...allLanes, ...results];
          start += limit;
        }

        setLanes(allLanes);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const typesCount = lanes.reduce((acc, lane) => {
      const geometryType = lane.geo_shape?.geometry?.type;
      if (geometryType) {
        acc[geometryType] = (acc[geometryType] || 0) + 1;
      }
      return acc;
    }, {});
    setGeometryTypes(typesCount);
  }, [lanes]);

  const renderPopup = (lane) => (
    <Popup>
      <Typography variant="body2" fontWeight="bold">
        {lane.typo_min}
      </Typography>
      <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
        {lane.alignement && (
          <Typography variant="body2" paragraph>
            <strong>Alignement:</strong> {lane.alignement}
          </Typography>
        )}
        {lane.servitude && (
          <Typography variant="body2" paragraph>
            <strong>Servitude:</strong> {lane.servitude}
          </Typography>
        )}
        {lane.historique && (
          <Typography variant="body2" paragraph>
            <strong>Historique:</strong> {lane.historique}
          </Typography>
        )}
        {lane.denomination && (
          <Typography variant="body2" paragraph>
            <strong>Dénomination:</strong> {lane.denomination}
          </Typography>
        )}
        {lane.classement && (
          <Typography variant="body2" paragraph>
            <strong>Classement:</strong> {lane.classement}
          </Typography>
        )}
        {lane.observation && (
          <Typography variant="body2" paragraph>
            <strong>Observation:</strong> {lane.observation}
          </Typography>
        )}
        {lane.numerotage && (
          <Typography variant="body2" paragraph>
            <strong>Numérotage:</strong> {lane.numerotage}
          </Typography>
        )}
        {lane.orig && (
          <Typography variant="body2" paragraph>
            <strong>Origine:</strong> {lane.orig}
          </Typography>
        )}
        {lane.declassement && (
          <Typography variant="body2" paragraph>
            <strong>Déclassement:</strong> {lane.declassement}
          </Typography>
        )}
        {lane.nivellement && (
          <Typography variant="body2" paragraph>
            <strong>Nivellement:</strong> {lane.nivellement}
          </Typography>
        )}
        {lane.assainissement && (
          <Typography variant="body2" paragraph>
            <strong>Assainissement:</strong> {lane.assainissement}
          </Typography>
        )}
        {lane.ouverture && (
          <Typography variant="body2" paragraph>
            <strong>Ouverture:</strong> {lane.ouverture}
          </Typography>
        )}
      </Box>
    </Popup>
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box padding={2} marginTop={"150px"}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Source: {src}
      </Typography>
      <Typography variant="h6">Types de géométries:</Typography>
      <ul>
        {Object.entries(geometryTypes).map(([type, count]) => (
          <li key={type}>
            {type}: {count}
          </li>
        ))}
      </ul>
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
        {lanes.map((lane, index) => {
          const coordinates = lane.geo_shape?.geometry?.coordinates;
          const geometryType = lane.geo_shape?.geometry?.type;

          if (coordinates && geometryType) {
            switch (geometryType) {
              case "Polygon":
                return (
                  <Polygon
                    key={`lane-polygon-${index}`}
                    positions={coordinates[0].map((coord) => [
                      coord[1],
                      coord[0],
                    ])}
                    pathOptions={{ color: "blue" }}
                  >
                    {renderPopup(lane)}
                  </Polygon>
                );
              case "MultiPolygon":
                return coordinates.map((polygon, polygonIndex) => (
                  <Polygon
                    key={`lane-multipolygon-${index}-${polygonIndex}`}
                    positions={polygon[0].map((coord) => [coord[1], coord[0]])}
                    pathOptions={{ color: "blue" }}
                  >
                    {renderPopup(lane)}
                  </Polygon>
                ));
              default:
                return null;
            }
          }
          return null;
        })}
      </MapContainer>
    </Box>
  );
};

export default CurrentLaneNamingPage;
