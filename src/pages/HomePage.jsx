import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/paris-data"
        style={{ margin: "10px" }}
      >
        Open data Paris
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/idf-data"
        style={{ margin: "10px" }}
      >
        Open data Région Ile-de-France
      </Button>
    </div>
  );
}

export default HomePage;
