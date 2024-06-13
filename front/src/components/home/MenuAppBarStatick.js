// MenuAppBarStatick.js
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
      <CreationDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default MenuAppBarStatick;
