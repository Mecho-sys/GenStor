import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuAppBarStatick from "./components/home/MenuAppBarStatick";

export default function Root2() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GenStor
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
          <MenuAppBarStatick />
          <div>
            <Outlet />
          </div>
        </div>
      </Box>
    </>
  );
}
