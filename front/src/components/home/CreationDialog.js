import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const parentescoOptions = {
  MASCULINO: [
    "Jefe de Hogar",
    "Marido",
    "Abuelo",
    "Padre",
    "Hermano",
    "Cuñado",
    "Hijo",
    "Ahijado",
    "Nieto",
  ],
  FEMENINO: [
    "Jefa de Hogar",
    "Esposa",
    "Abuela",
    "Madre",
    "Hermana",
    "Cuñada",
    "Hijo",
    "Ahijado",
    "Nieto",
  ],
};

const CreationDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    fam_shift: "",
    doctor: "",
    fam_code: "",
  });

  const [personas_nucleo, setPersonasNucleo] = useState([]);
  const [personas_fuera_nucleo, setPersonasFueraNucleo] = useState([]);
  const [familiasData, setFamiliasData] = useState([]);
  const uniqueIds = [...new Set(familiasData.map((familia) => familia.id))];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getFamilias");
        setFamiliasData(response.data.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPerson = () => {
    setPersonasNucleo([
      ...personas_nucleo,
      {
        id: personas_nucleo.length + 1,
        rut: "",
        nombres: "",
        appaterno: "",
        apmaterno: "",
        genero: "",
        parentesco: "",
        ecivil: "",
        pareja: "",
        nucleo: "si",
      },
    ]);
  };

  const handleAddPersonOutside = () => {
    const idOffset = personas_nucleo.length + 1;
    setPersonasFueraNucleo([
      ...personas_fuera_nucleo,
      {
        id: idOffset + personas_fuera_nucleo.length,
        rut: "",
        nombres: "",
        appaterno: "",
        apmaterno: "",
        genero: "",
        parentesco: "",
        ecivil: "",
        pareja: "",
        nucleo: "no",
      },
    ]);
  };

  const handleRemovePerson = (index, nucleo) => {
    if (nucleo === "si") {
      const updatedPersonas = [...personas_nucleo];
      updatedPersonas.splice(index, 1);
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personas_fuera_nucleo];
      updatedPersonas.splice(index, 1);
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleChangePerson = (index, nucleo, e) => {
    const { name, value } = e.target;
    if (nucleo === "si") {
      const updatedPersonas = [...personas_nucleo];
      updatedPersonas[index][name] = value;
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personas_fuera_nucleo];
      updatedPersonas[index][name] = value;
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleChangePersonSelect = (index, nucleo, fieldName, value) => {
    if (nucleo === "si") {
      const updatedPersonas = [...personas_nucleo];
      updatedPersonas[index][fieldName] = value;
      setPersonasNucleo(updatedPersonas);
    } else {
      const updatedPersonas = [...personas_fuera_nucleo];
      updatedPersonas[index][fieldName] = value;
      setPersonasFueraNucleo(updatedPersonas);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        personas_nucleo,
        personas_fuera_nucleo,
      };

      const response = await axios.post(
        "http://localhost:4000/addProyect",
        dataToSubmit
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        const projectsResponse = await axios.get(
          "http://localhost:4000/getProyects"
        );
        const projects = projectsResponse.data.data;
        if (projects.length > 0) {
          const lastProject = projects.reduce((latest, current) => {
            return new Date(latest.created_at) > new Date(current.created_at)
              ? latest
              : current;
          });
          navigate(`/editor/${lastProject.id}`);
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const renderParentescoOptions = (genero) => {
    return parentescoOptions[genero]?.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  const renderParejaSelect = (persona, index, nucleo) => {
    const personasList =
      nucleo === "si" ? personas_nucleo : personas_fuera_nucleo;
    const parejaOptions = [
      ...personas_nucleo,
      ...personas_fuera_nucleo,
      { id: "otro", nombres: "Otro" },
    ];
    return (
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id={`pareja-select-label-${index}`}>Pareja</InputLabel>
        <Select
          labelId={`pareja-select-label-${index}`}
          id={`pareja-select-${index}`}
          value={personasList[index].pareja}
          onChange={(e) =>
            handleChangePersonSelect(index, nucleo, "pareja", e.target.value)
          }
          label="Pareja"
        >
          {parejaOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombres}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const handleFamilySelect = (id) => {
    const selectedFamilyMembers = familiasData.filter(
      (familia) => familia.id === id
    );
    setPersonasNucleo(selectedFamilyMembers);
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
                    <InputLabel id="fam-code-select-label">
                      Codigo de Familia
                    </InputLabel>
                    <Select
                      labelId="fam-code-select-label"
                      id="fam-code-select-label"
                      value={formData.fam_code}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          fam_code: e.target.value,
                        });
                        handleFamilySelect(e.target.value);
                      }}
                      label="Código de Familia"
                    >
                      <MenuItem value={""}>sin codigo</MenuItem>
                      {uniqueIds.map((id) => (
                        <MenuItem key={id} value={id}>
                          {id}
                        </MenuItem>
                      ))}
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
            {personas_nucleo.map((persona, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  Persona {persona.id}
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
                          <MenuItem value={"MASCULINO"}>Masculino</MenuItem>
                          <MenuItem value={"FEMENINO"}>Femenino</MenuItem>
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
                          {renderParentescoOptions(persona.genero)}
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
                          <MenuItem value={"Soltero(a)"}>Soltero(a)</MenuItem>
                          <MenuItem value={"Con Pareja"}>Con Pareja</MenuItem>
                          <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
                          <MenuItem value={"Separado(a)"}>Separado(a)</MenuItem>
                          <MenuItem value={"Divorciado(a)"}>
                            Divorciado(a)
                          </MenuItem>
                          <MenuItem value={"Viudo(a)"}>Viudo(a)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {(persona.ecivil === "Casado(a)" ||
                      persona.ecivil === "Con Pareja") &&
                      renderParejaSelect(persona, index, "si")}
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
            {personas_fuera_nucleo.map((persona, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  Añadir Persona {persona.id}
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
                          {renderParentescoOptions(persona.genero)}
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
                          <MenuItem value={"Soltero(a)"}>Soltero(a)</MenuItem>
                          <MenuItem value={"Con Pareja"}>Con Pareja</MenuItem>
                          <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
                          <MenuItem value={"Separado(a)"}>Separado(a)</MenuItem>
                          <MenuItem value={"Divorciado(a)"}>
                            Divorciado(a)
                          </MenuItem>
                          <MenuItem value={"Viudo(a)"}>Viudo(a)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {(persona.ecivil === "Casado" ||
                      persona.ecivil === "Casada" ||
                      persona.ecivil === "Con Pareja") &&
                      renderParejaSelect(persona, index, "no")}
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
        <Button onClick={handleSubmit} color="primary">
          Crear Genograma
        </Button>
      </DialogActions>
      <Box sx={{ p: 2 }}></Box>
    </Dialog>
  );
};

export default CreationDialog;
