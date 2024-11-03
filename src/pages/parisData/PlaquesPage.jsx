import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStore from "../../store/useStore";

const PlaquesPage = ({ title, url, src }) => {
  const [plaques, setPlaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLocation = useStore((state) => state.userLocation);

  useEffect(() => {
    const fetchData = async () => {
      let allPlaques = [];
      let start = 0;
      const limit = 100;

      try {
        while (true) {
          const response = await axios.get(
            `${url}?start=${start}&limit=${limit}`
          );
          const results = response.data.results;

          if (results.length === 0) {
            break;
          }

          allPlaques = [...allPlaques, ...results];
          start += limit;
        }

        setPlaques(allPlaques);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

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
        {plaques.map(
          (plaque, index) =>
            plaque.geo_point_2d && (
              <Circle
                key={`plaque-circle-${index}`}
                center={[plaque.geo_point_2d.lat, plaque.geo_point_2d.lon]}
                radius={10}
                pathOptions={{ color: "blue" }}
              >
                <Popup>
                  <Typography variant="h6" fontWeight="bold">
                    {plaque.titre}
                  </Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {plaque.adresse && plaque.ardt && (
                      <Typography variant="body2" paragraph>
                        {plaque.adresse} ({plaque.ardt})
                      </Typography>
                    )}
                    {plaque.retranscription && (
                      <Typography variant="body2" paragraph>
                        {plaque.retranscription
                          .split(/[\/|]/)
                          .map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </Typography>
                    )}
                    {plaque.siecle && (
                      <Typography variant="body2" paragraph>
                        <strong>Siècle:</strong> {plaque.siecle}
                      </Typography>
                    )}
                    {(plaque.periode_1 || plaque.periode_2) && (
                      <Typography variant="body2" paragraph>
                        <strong>Période:</strong> {plaque.periode_1}{" "}
                        {plaque.periode_2 && `, ${plaque.periode_2}`}
                      </Typography>
                    )}
                    {(plaque.objet_1 || plaque.objet_2) && (
                      <Typography variant="body2" paragraph>
                        <strong>Objet:</strong> {plaque.objet_1}{" "}
                        {plaque.objet_2 && `, ${plaque.objet_2}`}
                      </Typography>
                    )}
                    {plaque.personnalite && (
                      <Typography variant="body2" paragraph>
                        <strong>Personnalité:</strong> {plaque.personnalite}
                      </Typography>
                    )}
                    {plaque.pays && (
                      <Typography variant="body2" paragraph>
                        <strong>Pays:</strong> {plaque.pays}
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

export default PlaquesPage;
