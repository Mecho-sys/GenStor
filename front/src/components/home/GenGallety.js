import React from "react";
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {itemData.map((item) => (
          <Grid item xs={4}>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Creado: {item.date}
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
                image={`${item.img}`}
                alt="Imagen del genograma"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const itemData = [
  {
    img: "/assets/placeholders/hogar.JPG",
    title: "Familia Rojas Zamorano",
    date: "2 febrero 2024",
  },
  {
    img: "/assets/placeholders/genComplex.JPG",
    title: "Familia Rojas Cruz",
    date: "6 febrero 2024",
  },
  {
    img: "/assets/placeholders/familia.JPG",
    title: "Familia Moya Chamorro",
    date: "6 marzo 2024",
  },
];
