import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleProfile = () => {
    setIsDialogOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GenStor
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
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
            <ListItem button component={Link} to="/transTest">
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
            <Item>Item 3</Item>
          </Stack>
        </Stack>
        <Box sx={{ p: 2 }}></Box>
      </Dialog>
    </Box>
  );
}
