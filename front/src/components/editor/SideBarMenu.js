import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

const SidebarMenu = ({
  addRectangle,
  addCircle,
  addLine,
  addLinePunt,
  addLineSeparate,
  addLineDivorse,
  addOval,
  addCircleIdent,
  addCrossRectangle,
  addCrossedCircle,
  addDobleRectangle,
}) => {
  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        Personas
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addRectangle}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/Man.JPG"
                  alt="Hombre"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Hombre
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={() => addCircle(1)}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/Woman.JPG"
                  alt="Mujer"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Mujer
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addCrossRectangle}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/ManDead.JPG"
                  alt="Hombre Difunto"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Hombre Difunto
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addCrossedCircle}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/WomanDead.JPG"
                  alt="Mujer Difunta"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Mujer Difunta
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addDobleRectangle}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/MId.JPG"
                  alt="Hombre Identificado"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Hombre Identificado
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addCircleIdent}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/WId.JPG"
                  alt="Mujer Identificada"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Mujer Identificada
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={() => addCircle(2)}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/AbEsp.JPG"
                  alt="Aborto Espontaneo"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Aborto Espontaneo
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addOval}>
                <CardMedia
                  component="img"
                  height="100"
                  image="/assets/AbProv.JPG"
                  alt="Aborto Provocado"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Aborto Provocado
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        Uniones
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLine}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/LCont.JPG"
                  alt="Línea Continua"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Sanguinea
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/LPunt.JPG"
                  alt="Línea punteada"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Politica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLineSeparate}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/Sep.JPG"
                  alt="Separacion"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Separación
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLineDivorse}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/Div.JPG"
                  alt="Divorcio"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Divorcio
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        Relaciones
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/union.JPG"
                  alt="Unión"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Unión
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="30"
                  image="/assets/Fusion.JPG"
                  alt="Fusion"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Fusion
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/conflict.JPG"
                  alt="conflicto"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Conflicto
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/Dist.JPG"
                  alt="Distancia"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Distancia
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/Rup.JPG"
                  alt="Quiebre"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Quiebre
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ maxWidth: 100 }}>
              <CardActionArea onClick={addLinePunt}>
                <CardMedia
                  component="img"
                  height="10"
                  image="/assets/FusConfl.JPG"
                  alt="Fusion-Conficto"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Fusion-Conflicto
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SidebarMenu;
