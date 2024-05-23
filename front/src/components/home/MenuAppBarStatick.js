// MenuAppBarStatick.js
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import CreationDialog from "./CreationDialog";

const MenuAppBarStatick = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewGen = () => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <List style={{ width: "100%" }}>
        <ListItem onClick={handleNewGen}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Crear nuevo Genograma" />
        </ListItem>
      </List>
      <Box sx={{ p: 2 }} height={700}></Box>
      <Divider />
      <List style={{ width: "100%" }}>
        <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Opciones" />
        </ListItem>
      </List>
      <CreationDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default MenuAppBarStatick;
