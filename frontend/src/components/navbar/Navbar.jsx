import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("AuthToken");
    if (!loggedInUser) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  //logout
  const onLogout = () => {
    console.log("kkkkkkkkkk");
    localStorage.removeItem("AuthToken");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#051b34" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            nTask
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
