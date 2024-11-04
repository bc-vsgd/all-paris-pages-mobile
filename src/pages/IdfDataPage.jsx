import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import routesData from "../data/idfRoutesData";

function IdfDataPage() {
  return (
    <div style={{ padding: "20px" }}>
      {routesData.map(({ path, title }) => (
        <Typography key={path} variant="h4" style={{ margin: "10px 0" }}>
          <Link to={path}>{title}</Link>
        </Typography>
      ))}
    </div>
  );
}

export default IdfDataPage;
