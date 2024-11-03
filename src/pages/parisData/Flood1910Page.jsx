import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Polygon, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const Flood1910Page = ({ title, url, src }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [geometryTypes, setGeometryTypes] = useState({});
  const [polygonCount, setPolygonCount] = useState(0);
  const [multiPolygonCount, setMultiPolygonCount] = useState(0);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allPlaces = [];
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

          allPlaces = [...allPlaces, ...results];
          start += limit;
        }

        setPlaces(allPlaces);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const count = places.filter((place) => {
      const coordinates = place.geo_shape?.geometry?.coordinates;
      const geometryType = place.geo_shape?.geometry?.type;
      return coordinates && geometryType;
    }).length;
    setDisplayedCount(count);

    const typesCount = places.reduce((acc, place) => {
      const geometryType = place.geo_shape?.geometry?.type;
      if (geometryType) {
        acc[geometryType] = (acc[geometryType] || 0) + 1;
      }
      return acc;
    }, {});
    setGeometryTypes(typesCount);

    const polygonCount = places.filter(
      (place) => place.geo_shape?.geometry?.type === "Polygon"
    ).length;
    setPolygonCount(polygonCount);

    const multiPolygonCount = places.filter(
      (place) => place.geo_shape?.geometry?.type === "MultiPolygon"
    ).length;
    setMultiPolygonCount(multiPolygonCount);
  }, [places]);

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
      <Typography variant="h6">
        Nombre de zones affichées: {displayedCount}
      </Typography>
      <Typography variant="h6">
        Nombre de Polygons affichés: {polygonCount}
      </Typography>
      <Typography variant="h6">
        Nombre de MultiPolygons affichés: {multiPolygonCount}
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
        {places.map((place, index) => {
          const coordinates = place.geo_shape?.geometry?.coordinates;
          const geometryType = place.geo_shape?.geometry?.type;

          if (coordinates && geometryType) {
            switch (geometryType) {
              case "Polygon":
                return (
                  <Polygon
                    key={`place-polygon-${index}`}
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
                          {place.fields?.adresse_complete}
                        </Typography>
                      </Box>
                    </Popup>
                  </Polygon>
                );
              case "MultiPolygon":
                return coordinates.map((polygon, polygonIndex) => (
                  <Polygon
                    key={`place-multipolygon-${index}-${polygonIndex}`}
                    positions={polygon[0].map((coord) => [coord[1], coord[0]])}
                    pathOptions={{ color: "blue" }}
                  >
                    <Popup>
                      <Typography variant="body2" fontWeight="bold">
                        Zone inondée
                      </Typography>
                      <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                        <Typography variant="body2">
                          {place.fields?.adresse_complete}
                        </Typography>
                      </Box>
                    </Popup>
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

export default Flood1910Page;
