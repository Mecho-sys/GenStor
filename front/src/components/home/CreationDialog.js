import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreationDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    fam_shift: "",
    doctor: "",
    cod_familia: "",
  });

  // Estado para personas dentro del núcleo
  const [personasNucleo, setPersonasNucleo] = useState([]);
  // Estado para personas fuera del núcleo
  const [personasFueraNucleo, setPersonasFueraNucleo] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSelect = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleAddPerson = () => {
    setPersonasNucleo([
      ...personasNucleo,
      {
        rut: "",
        nombres: "",
        appaterno: "",
        apmaterno: "",
        genero: "",
        parentesco: "",
        ecivil: "",
        nucleo: "si",
      },
    ]);
  };

  const handleAddPersonOutside = () => {
    setPersonasFueraNucleo([
      ...personasFueraNucleo,
      {
        rut: "",
        nombres: "",
        appaterno: "",
        apmaterno: "",
        genero: "",
        parentesco: "",
        ecivil: "",
        nucleo: "no",
      },
    ]);
  };

  const handleRemovePerson = (index, nucleo) => {
    if (nucleo === "si") {
      const updatedPersonas = [...personasNucleo];
      updatedPersonas.splice(index, 1);
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personasFueraNucleo];
      updatedPersonas.splice(index, 1);
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleChangePerson = (index, nucleo, e) => {
    const { name, value } = e.target;
    if (nucleo === "si") {
      const updatedPersonas = [...personasNucleo];
      updatedPersonas[index][name] = value;
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personasFueraNucleo];
      updatedPersonas[index][name] = value;
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleChangePersonSelect = (index, nucleo, fieldName, value) => {
    if (nucleo === "si") {
      const updatedPersonas = [...personasNucleo];
      updatedPersonas[index][fieldName] = value;
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personasFueraNucleo];
      updatedPersonas[index][fieldName] = value;
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        personasNucleo,
        personasFueraNucleo,
      };

      const response = await axios.post("/api/addProyect", dataToSubmit);

      console.log("Respuesta del servidor:", response.data);
      console.log("Se pasó del diálogo al editor");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      maxWidth="md"
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
            id="name"
            label="Nombre del proyecto"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fam_shift"
            label="Jefe de Familia"
            name="fam_shift"
            autoComplete="fam_shift"
            autoFocus
            value={formData.fam_shift}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="doctor"
            label="Doctor/ra"
            name="doctor"
            autoComplete="doctor"
            autoFocus
            value={formData.doctor}
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
              <Grid item xs={6}>
                <Item variant="outlined">
                  <FormControl variant="standard" sx={{ minWidth: 200 }}>
                    <InputLabel id="cod-familia-select-label">
                      Codigo de Familia
                    </InputLabel>
                    <Select
                      labelId="cod-familia-select-label"
                      id="cod-familia-select-label"
                      value={formData.cod_familia}
                      onChange={(e) =>
                        handleChangeSelect("cod_familia", e.target.value)
                      }
                      label="cod_familia"
                    >
                      <MenuItem value={"sin codigo"}>sin codigo</MenuItem>
                      <MenuItem value={"10"}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={2}>
                <IconButton onClick={handleAddPerson}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            {personasNucleo.map((persona, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  Añadir Persona {index + 1}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id={`rut-${index}`}
                        label="Rut"
                        name="rut"
                        autoComplete="rut"
                        autoFocus
                        value={persona.rut}
                        onChange={(e) => handleChangePerson(index, "si", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="nombres"
                        label="Nombres"
                        name="nombres"
                        autoComplete="nombres"
                        autoFocus
                        value={persona.nombres}
                        onChange={(e) => handleChangePerson(index, "si", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="appaterno"
                        label="Apellido Paterno"
                        name="appaterno"
                        autoComplete="appaterno"
                        autoFocus
                        value={persona.appaterno}
                        onChange={(e) => handleChangePerson(index, "si", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="apmaterno"
                        label="Apellido Materno"
                        name="apmaterno"
                        autoComplete="apmaterno"
                        autoFocus
                        value={persona.apmaterno}
                        onChange={(e) => handleChangePerson(index, "si", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="genero-select-label">Género</InputLabel>
                        <Select
                          labelId="genero-select-label"
                          id="genero-select-label"
                          value={persona.genero}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "si",
                              "genero",
                              e.target.value
                            )
                          }
                          label="Género"
                        >
                          <MenuItem value={"Masculino"}>Masculino</MenuItem>
                          <MenuItem value={"Femenino"}>Femenino</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="parentesco-select-label">
                          Parentesco
                        </InputLabel>
                        <Select
                          labelId="parentesco-select-label"
                          id="parentesco-select-label"
                          value={persona.parentesco}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "si",
                              "parentesco",
                              e.target.value
                            )
                          }
                          label="Parentesco"
                        >
                          <MenuItem value={"Jefe de familia"}>
                            Jefe de familia
                          </MenuItem>
                          <MenuItem value={"Abuelo/a"}>Abuelo/a</MenuItem>
                          <MenuItem value={"Padre"}>Padre</MenuItem>
                          <MenuItem value={"Madre"}>Madre</MenuItem>
                          <MenuItem value={"Hijo/a"}>Hijo/a</MenuItem>
                          <MenuItem value={"Nieto/a"}>Nieto/a</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="ecivil-select-label">
                          Estado Civil
                        </InputLabel>
                        <Select
                          labelId="ecivil-select-label"
                          id="ecivil-select-label"
                          value={persona.ecivil}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "si",
                              "ecivil",
                              e.target.value
                            )
                          }
                          label="Estado Civil"
                        >
                          <MenuItem value={"Soltero/a"}>Soltero/a</MenuItem>
                          <MenuItem value={"Casado/a"}>Casado/a</MenuItem>
                          <MenuItem value={"Viudo/a"}>Viudo/a</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton
                        onClick={() => handleRemovePerson(index, "si")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Añadir Persona ajena al nucleo Familiar
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <IconButton onClick={handleAddPersonOutside}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            {personasFueraNucleo.map((persona, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  Añadir Persona {index + 1}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="rut"
                        label="Rut"
                        name="rut"
                        autoComplete="rut"
                        autoFocus
                        value={persona.rut}
                        onChange={(e) => handleChangePerson(index, "no", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="nombres"
                        label="Nombres"
                        name="nombres"
                        autoComplete="nombres"
                        autoFocus
                        value={persona.nombres}
                        onChange={(e) => handleChangePerson(index, "no", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="appaterno"
                        label="Apellido Paterno"
                        name="appaterno"
                        autoComplete="appaterno"
                        autoFocus
                        value={persona.appaterno}
                        onChange={(e) => handleChangePerson(index, "no", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="apmaterno"
                        label="Apellido Materno"
                        name="apmaterno"
                        autoComplete="apmaterno"
                        autoFocus
                        value={persona.apmaterno}
                        onChange={(e) => handleChangePerson(index, "no", e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="genero-select-label">Género</InputLabel>
                        <Select
                          labelId="genero-select-label"
                          id="genero-select-label"
                          value={persona.genero}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "no",
                              "genero",
                              e.target.value
                            )
                          }
                          label="Género"
                        >
                          <MenuItem value={"Masculino"}>Masculino</MenuItem>
                          <MenuItem value={"Femenino"}>Femenino</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="parentesco-select-label">
                          Parentesco
                        </InputLabel>
                        <Select
                          labelId="parentesco-select-label"
                          id="parentesco-select-label"
                          value={persona.parentesco}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "no",
                              "parentesco",
                              e.target.value
                            )
                          }
                          label="Parentesco"
                        >
                          <MenuItem value={"Jefe de familia"}>
                            Jefe de familia
                          </MenuItem>
                          <MenuItem value={"Abuelo/a"}>Abuelo/a</MenuItem>
                          <MenuItem value={"Padre"}>Padre</MenuItem>
                          <MenuItem value={"Madre"}>Madre</MenuItem>
                          <MenuItem value={"Hijo/a"}>Hijo/a</MenuItem>
                          <MenuItem value={"Nieto/a"}>Nieto/a</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="ecivil-select-label">
                          Estado Civil
                        </InputLabel>
                        <Select
                          labelId="ecivil-select-label"
                          id="ecivil-select-label"
                          value={persona.ecivil}
                          onChange={(e) =>
                            handleChangePersonSelect(
                              index,
                              "no",
                              "ecivil",
                              e.target.value
                            )
                          }
                          label="Estado Civil"
                        >
                          <MenuItem value={"Soltero/a"}>Soltero/a</MenuItem>
                          <MenuItem value={"Casado/a"}>Casado/a</MenuItem>
                          <MenuItem value={"Viudo/a"}>Viudo/a</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton
                        onClick={() => handleRemovePerson(index, "no")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
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
  );
};

export default CreationDialog;
