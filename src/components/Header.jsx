import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header
      style={{
        padding: "10px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleHomeClick} aria-label="home">
        <HomeIcon />
      </IconButton>
    </header>
  );
}

export default Header;
