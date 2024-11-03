import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import Spot121314Comp from "../../components/parisData/Spot121314Comp";

const Spots121314Page = ({ title, url, src }) => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSpots = async () => {
      let allSpots = [];
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

          allSpots = [...allSpots, ...results];
          start += limit;
        }

        setSpots(allSpots);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchAllSpots();
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
      {spots.map((spot, index) => (
        <Spot121314Comp key={index} data={spot} />
      ))}
    </Box>
  );
};

export default Spots121314Page;
