import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DialogContent, DialogActions, TextField, Button } from "@mui/material";

const MenuAppBarStatick = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    Titulo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewGen = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    console.log("Se paso del dialog al editor");
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
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <Box sx={{ p: 2 }}></Box>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Titulo"
              label="Titulo"
              name="Titulo"
              autoComplete="Titulo"
              autoFocus
              value={formData.Titulo}
              onChange={handleChange}
            />
          </form>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Infomación del nucleo familiar
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            component={Link}
            to="/editor"
          >
            Crear Genograma
          </Button>
        </DialogActions>
        <Box sx={{ p: 2 }}></Box>
      </Dialog>
    </div>
  );
};

export default MenuAppBarStatick;
