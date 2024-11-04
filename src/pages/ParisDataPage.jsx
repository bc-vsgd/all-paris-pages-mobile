import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import routesData from "../data/parisRoutesData";

function ParisDataPage() {
  return (
    <div style={{ padding: "20px" }}>
      {routesData.map(({ path, title }) => (
        <Typography key={path} variant="h6" style={{ margin: "10px 0" }}>
          <Link to={path}>{title}</Link>
        </Typography>
      ))}
    </div>
  );
}

export default ParisDataPage;
