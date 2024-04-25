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
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MenuAppBarStatick = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    Titulo: "",
    Abuelo: "",
    Abuela: "",
    Childs1: "",
    Childs2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSelect = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
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
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Item variant="outlined">
                    <FormControlLabel control={<Checkbox />} label="Padre" />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item variant="outlined">
                    <FormControlLabel control={<Checkbox />} label="Madre" />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item variant="outlined">
                    <FormControlLabel control={<Checkbox />} label="Padre" />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item variant="outlined">
                    <FormControlLabel control={<Checkbox />} label="Madre" />
                  </Item>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Item variant="outlined">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="chils1-select-label">
                        Nro Hijos
                      </InputLabel>
                      <Select
                        labelId="chils1-select-label"
                        id="chils1-select-label"
                        value={formData.Childs1}
                        onChange={(e) =>
                          handleChangeSelect("Childs1", e.target.value)
                        }
                        label="Childs1"
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                  <Item variant="outlined">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="chils2-select-label">
                        Nro Hijos
                      </InputLabel>
                      <Select
                        labelId="chils2-select-label"
                        id="chils2-select-label"
                        value={formData.Childs2}
                        onChange={(e) =>
                          handleChangeSelect("Childs2", e.target.value)
                        }
                        label="Childs2"
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Item variant="outlined">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="chils1-select-label">
                        Nro Nietos
                      </InputLabel>
                      <Select
                        labelId="chils1-select-label"
                        id="chils1-select-label"
                        value={formData.Childs1}
                        onChange={(e) =>
                          handleChangeSelect("Childs1", e.target.value)
                        }
                        label="Childs1"
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                  <Item variant="outlined">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="chils2-select-label">
                        Nro Niertos
                      </InputLabel>
                      <Select
                        labelId="chils2-select-label"
                        id="chils2-select-label"
                        value={formData.Childs2}
                        onChange={(e) =>
                          handleChangeSelect("Childs2", e.target.value)
                        }
                        label="Childs2"
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
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
