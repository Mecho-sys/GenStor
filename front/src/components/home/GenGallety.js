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

export default function GenGallery() {
  const [projects, setProjects] = useState([]);

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
                  <IconButton aria-label="edit">
                    <EditIcon sx={{ height: 30, width: 30 }} />
                  </IconButton>
                  <IconButton aria-label="delete">
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
    </Box>
  );
}
