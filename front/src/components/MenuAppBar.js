import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function MenuAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  }; */

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GenStor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div>
          <List>
            <ListItem button component={Link} to="/Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component={Link} to="/editor">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Editor" />
            </ListItem>
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Box sx={{ p: 2 }}></Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "25ch",
          }}
        >
          <Box sx={{ p: 0.1 }}></Box>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar>

          <Stack
            spacing={2}
            sx={{
              width: "15ch",
            }}
          >
            <Item>Nombre Usuario</Item>
            <Item>Email</Item>
          </Stack>
        </Stack>
        <Box sx={{ p: 2 }}></Box>
      </Dialog>
    </Box>
  );
}
