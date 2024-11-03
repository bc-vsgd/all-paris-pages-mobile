import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import WomanComp from "../../components/parisData/WomanComp";

const WomenPage = ({ title, url, src }) => {
  const [women, setWomen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllWomen = async () => {
      let allWomen = [];
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

          allWomen = [...allWomen, ...results];
          start += limit;
        }

        setWomen(allWomen.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchAllWomen();
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
      <Box display="flex" flexWrap="wrap" gap={2}>
        {women.map((woman, index) => (
          <WomanComp key={index} data={woman} />
        ))}
      </Box>
    </Box>
  );
};

export default WomenPage;
