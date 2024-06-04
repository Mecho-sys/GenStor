import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SidebarMenu from "./SideBarMenu";
import KonvaStage from "./KonvaStage";

const initialRectangles = [];
const initialCircles = [];
const initialText = [];
const initialLines = [];

const Canvas = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [circles, setCircles] = React.useState(initialCircles);
  const [selectedId, selectShape] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  // Texto:
  const [texts, setTexts] = React.useState(initialText);
  const [textPhrase, setTextPhrase] = React.useState("texto ejemplo");
  const [textSize, setTextSize] = React.useState(30);
  const [textFontFam, setTextFontFam] = React.useState("Calibri");
  const [textColor, setTextColor] = React.useState("black");

  // Líneas:
  const [lines, setLines] = React.useState(initialLines);
  const [creatingLine, setCreatingLine] = React.useState(false);
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

  const addRectangle = () => {
    const currentRectangles = [...rectangles];

    const newId = `rect${currentRectangles.length + 1}`;
    const newRect = {
      x: 150 + currentRectangles.length * 10,
      y: 150 + currentRectangles.length * 10,
      width: 100,
      height: 100,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      id: newId,
    };

    currentRectangles.push(newRect);
    setRectangles(currentRectangles);
  };

  const addCircle = () => {
    const currentCircles = [...circles];

    const newId = `circle${currentCircles.length + 1}`;
    const newCircle = {
      x: 150 + currentCircles.length * 10,
      y: 150 + currentCircles.length * 10,
      radius: 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      id: newId,
    };

    currentCircles.push(newCircle);
    setCircles(currentCircles);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (e) => {
    setTextPhrase(e.target.value);
  };

  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  const handleTextFontFamChange = (e) => {
    setTextFontFam(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const addText = () => {
    const currentText = [...texts];
    const newId = `text${currentText.length + 1}`;
    const newText = {
      x: 150 + currentText.length * 10,
      y: 150 + currentText.length * 10,
      text: textPhrase,
      fontSize: textSize,
      fontFamily: textFontFam,
      fill: textColor,
      id: newId,
    };

    currentText.push(newText);
    setTexts(currentText);
    setOpen(false);
  };

  const addLine = () => {
    setCreatingLine(true);
  };

  const addLinePunt = () => {
    const currentLines = [...lines];
    const newId = `line${currentLines.length + 1}`;
    const newLine = {
      points: [23, 20, 100, 20],
      stroke: "black",
      strokeWidth: 2,
      dash: [10, 5],
      id: newId,
    };
    currentLines.push(newLine);
    setLines(currentLines);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <SidebarMenu
            addRectangle={addRectangle}
            addCircle={addCircle}
            addLine={addLine}
            addLinePunt={addLinePunt}
          />
        </Grid>
        <Grid item xs={9}>
          <KonvaStage
            lines={lines}
            rectangles={rectangles}
            circles={circles}
            texts={texts}
            selectedId={selectedId}
            selectShape={selectShape}
            setLines={setLines}
            setRectangles={setRectangles}
            setCircles={setCircles}
            setTexts={setTexts}
            checkDeselect={checkDeselect}
          />
        </Grid>
      </Grid>
      <IconButton
        onClick={handleClickOpen}
        style={{
          backgroundColor: "lightblue",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Texto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Texto"
            type="text"
            fullWidth
            value={textPhrase}
            onChange={handleTextChange}
          />
          <Box display="flex" alignItems="center">
            <Typography>Tamaño</Typography>
            <IconButton onClick={() => setTextSize(textSize - 1)}>
              <RemoveIcon />
            </IconButton>
            <Typography>{textSize}</Typography>
            <IconButton onClick={() => setTextSize(textSize + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <Typography>Color</Typography>
            <TextField
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography>Fuente</Typography>
            <Select value={textFontFam} onChange={handleTextFontFamChange}>
              <MenuItem value={"Arial"}>Arial</MenuItem>
              <MenuItem value={"Calibri"}>Calibri</MenuItem>
              <MenuItem value={"Courier"}>Courier</MenuItem>
              <MenuItem value={"Helvetica"}>Helvetica</MenuItem>
              <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={addText}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Canvas;
