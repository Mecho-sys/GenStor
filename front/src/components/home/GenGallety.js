import React, { useEffect, useState } from "react";
import axios from "axios";
//imports de Mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function GenGallery() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedFamShift, setEditedFamShift] = useState("");
  const [editedDoctor, setEditedDoctor] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getProyects");
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditedName(project.name);
    setEditedFamShift(project.fam_shift);
    setEditedDoctor(project.doctor);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProject(null);
    setEditedName("");
    setEditedFamShift("");
    setEditedDoctor("");
  };

  const handleEditProject = async () => {
    try {
      await axios.post(`http://localhost:4000/editProyect`, {
        id: editingProject.id,
        data: {
          name: editedName,
          fam_shift: editedFamShift,
          doctor: editedDoctor,
        },
      });
      const response = await axios.get("http://localhost:4000/getProyects");
      setProjects(response.data.data);
      handleDialogClose();
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.post(`http://localhost:4000/deleteProyect`, {
        id: projectId,
      });
      const response = await axios.get("http://localhost:4000/getProyects");
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {projects.map((project) => (
          <Grid item xs={4} key={project.id}>
            {" "}
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {project.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Jefe de Familia: {project.fam_shift}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Doctor: {project.doctor}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "right", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="enter">
                    <LoginIcon sx={{ height: 30, width: 30 }} />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(project)}
                  >
                    <EditIcon sx={{ height: 30, width: 30 }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <DeleteIcon sx={{ height: 30, width: 30 }} />
                  </IconButton>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="/assets/placeholders/hogar.JPG"
                alt="Imagen del genograma"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Editar Proyecto
          </Typography>
          <TextField
            label="Nombre"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Jefe de Familia"
            value={editedFamShift}
            onChange={(e) => setEditedFamShift(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Doctor"
            value={editedDoctor}
            onChange={(e) => setEditedDoctor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleEditProject}
            variant="contained"
            color="primary"
          >
            Guardar Cambios
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
