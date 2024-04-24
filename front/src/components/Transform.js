import React from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Text,
  Line,
  Transformer,
} from "react-konva";
//MUI
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const CircleComponent = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const newRadius = Math.max(5, node.radius() * scaleX);

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: newRadius,
            width: newRadius * 2,
            height: newRadius * 2,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const minSize = 10;

            // Limitamos el tamaño mínimo para mantener la proporción del círculo
            const newSize = Math.max(minSize, newBox.width);

            return {
              ...oldBox,
              width: newSize,
              height: newSize,
            };
          }}
        />
      )}
    </React.Fragment>
  );
};

const TextComponent = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const LineComponent = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();

  return (
    <React.Fragment>
      <Line
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
          });
        }}
      />
    </React.Fragment>
  );
};

const initialRectangles = [];
const initialCircles = [];
const initialText = [];
const initialLines = [];

const TransformTest = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [circles, setCircles] = React.useState(initialCircles);
  const [selectedId, selectShape] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  //texto:
  const [texts, setTexts] = React.useState(initialText);
  const [textPhrase, setTextPhrase] = React.useState("texto ejemplo");
  const [textSize, setTextSize] = React.useState(30);
  const [textFontFam, setTextFontFam] = React.useState("Calibri");
  const [textColor, setTextColor] = React.useState("black");

  //Lineas:
  const [lines, setLines] = React.useState(initialLines);
  const [creatingLine, setCreatingLine] = React.useState(false);
  const [creatingLinePunt, setCreatingLinePunt] = React.useState(false);
  const [startCoords, setStartCoords] = React.useState({ x: null, y: null });
  const [endCoords, setEndCoords] = React.useState({ x: null, y: null });

  const checkDeselect = (e) => {
    if (creatingLine) {
      // Guarda las coordenadas iniciales al inicio del proceso de creación de la línea
      if (startCoords.x == null && startCoords.y == null) {
        setStartCoords({ x: e.target.x(), y: e.target.y() });
        console.log("primer figura seleccionada");
      } else {
        // Si estamos en modo creación de línea, guarda las coordenadas finales
        setEndCoords({ x: e.target.x(), y: e.target.y() });
        console.log("segunda figura seleccionada");

        // Crea la línea con las coordenadas iniciales y finales
        const currentLines = [...lines];
        const newId = `line${currentLines.length + 1}`;
        const newLine = {
          points: [
            startCoords.x + 50,
            startCoords.y + 100,
            startCoords.x + 50,
            startCoords.y + 150,
            e.target.x(),
            e.target.y() + 100,
            e.target.x(),
            e.target.y() + 50,
          ],
          stroke: "black",
          strokeWidth: 2,
          id: newId,
        };
        currentLines.push(newLine);
        setLines(currentLines);

        // Reinicia las coordenadas para el próximo par de clics
        setStartCoords({ x: null, y: null });
        setEndCoords({ x: null, y: null });
        setCreatingLine(false);
        console.log("Se añadió una línea");
      }
    } else {
      // Si no estamos en modo creación de línea, deselecciona la figura
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    }
  };

  const addRectangle = (e) => {
    const currentRectangles = [...rectangles];

    const newId = `rect${currentRectangles.length + 1}`;

    const newRectangle = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      id: newId,
    };
    currentRectangles.push(newRectangle);
    setRectangles(currentRectangles);

    console.log("Se añadió un rectángulo");
  };

  const addCircle = (e) => {
    const currentCircles = [...circles];

    const newId = `circulo${currentCircles.length + 1}`;

    const newCircle = {
      x: 10,
      y: 10,
      radius: 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      id: newId,
    };
    currentCircles.push(newCircle);
    setCircles(currentCircles);

    console.log("Se añadió un circulo");
  };

  const addText = (e) => {
    handleClose();
    const currentTexts = [...texts];

    const newId = `texto${currentTexts.length + 1}`;

    const newText = {
      x: 20,
      y: 20,
      text: textPhrase,
      fontSize: textSize,
      fontFamily: textFontFam,
      fill: textColor,
      id: newId,
    };
    currentTexts.push(newText);
    setTexts(currentTexts);

    console.log("Apretaste agregar texto");
  };

  const handleFontFamilyChange = (event) => {
    setTextFontFam(event.target.value);
  };

  const handleFontSizeIncrease = () => {
    setTextSize((prevSize) => prevSize + 2);
  };

  const handleFontSizeDecrease = () => {
    setTextSize((prevSize) => Math.max(prevSize - 2, 10));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addLine = () => {
    setCreatingLine(true);
    console.log("Modo creación de línea activado");
  };

  const addLinePunt = () => {
    //setCreatingLinePunt(true);
    console.log("Modo creación de línea activado");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addRectangle}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addCircle}>
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
                <CardActionArea onClick={addLine}>
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
                <CardActionArea onClick={addLinePunt}>
                  <CardMedia
                    component="img"
                    height="10"
                    image="/assets/Div.JPG"
                    alt="Línea punteada"
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
      <div>
        <button onClick={handleClickOpen}>Agregar Texto</button>
        <IconButton onClick={handleFontSizeDecrease}>
          <RemoveIcon />
        </IconButton>

        <IconButton onClick={handleFontSizeIncrease}>
          <AddIcon />
        </IconButton>
        <FormControl sx={{ margin: "4px 0" }} size="small">
          <Select
            labelId="text-font-fam-label"
            id="text-font-fam"
            value={textFontFam}
            onChange={handleFontFamilyChange}
          >
            <MenuItem value="Calibri">Calibri</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            <MenuItem value="Courier New">Courier New</MenuItem>
          </Select>
        </FormControl>
        <Stage
          width={window.innerWidth * 0.8}
          height={window.innerHeight}
          draggable
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
            {circles.map((shape, i) => {
              return (
                <CircleComponent
                  key={i}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const shapes = circles.slice();
                    shapes[i] = newAttrs;
                    setCircles(shapes);
                  }}
                />
              );
            })}
            {texts.map((text, i) => (
              <TextComponent
                key={i}
                shapeProps={text}
                isSelected={text.id === selectedId}
                onSelect={() => {
                  selectShape(text.id);
                }}
                onChange={(newAttrs) => {
                  const updatedTexts = texts.slice();
                  updatedTexts[i] = newAttrs;
                  setTexts(updatedTexts);
                }}
              />
            ))}
            {lines.map((line, i) => (
              <LineComponent
                key={i}
                shapeProps={line}
                isSelected={line.id === selectedId}
                onSelect={() => {
                  selectShape(line.id);
                }}
                onChange={(newAttrs) => {
                  const updatedLines = lines.slice();
                  updatedLines[i] = newAttrs;
                  setLines(updatedLines);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Texto a agregar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Texto"
            type="text"
            fullWidth
            variant="standard"
            value={textPhrase}
            onChange={(e) => setTextPhrase(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addText}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransformTest;
