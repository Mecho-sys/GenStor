import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
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
import SaveIcon from "@mui/icons-material/Save";
import SidebarMenu from "./SideBarMenu";
import KonvaStage from "./KonvaStage";
import Konva from "konva";

const initialFigures = [];
const initialText = [];
const initialLines = [];

const Canvas = () => {
  const { projectId } = useParams();
  const stageRef = useRef(null);
  console.log("El ID del proyecto es:", projectId);

  const [figures, setFigures] = React.useState(initialFigures);
  const [selectedId, selectShape] = React.useState(null);
  const [openTextDialog, setOpenTextDialog] = React.useState(false);
  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

  // Texto:
  const [texts, setTexts] = React.useState(initialText);
  const [textPhrase, setTextPhrase] = React.useState("texto ejemplo");
  const [textSize, setTextSize] = React.useState(30);
  const [textFontFam, setTextFontFam] = React.useState("Calibri");
  const [textColor, setTextColor] = React.useState("black");

  // Líneas:
  const [lines, setLines] = React.useState(initialLines);
  const [creatingLine, setCreatingLine] = React.useState(false);
  const [creatingLinePunt, setCreatingLinePunt] = React.useState(false);
  const [creatingLineSeparate, setcreatingLineSeparate] = React.useState(false);
  const [creatingLineDivorse, setcreatingLineDivorse] = React.useState(false);
  const [startCoords, setStartCoords] = React.useState({ x: null, y: null });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getProyects`);
        const project = response.data.data.find((p) => p.id === projectId);
        if (project && project.edit_file) {
          const stage = Konva.Node.create(project.edit_file, "container");
          stageRef.current.destroyChildren();
          stageRef.current.add(stage);
        }
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (creatingLine) {
      if (!clickedOnEmpty) {
        const clickedShape = e.target;
        // Verificar si es una figura válida
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );
        const isLine = lines.find((line) => line.id === clickedShape.attrs.id);

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
            console.log("Primera figura seleccionada:", clickedShape.attrs.id);
          } else {
            console.log("Segunda figura seleccionada:", clickedShape.attrs.id);

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            let newLine;

            // Determinar el tipo de figuras seleccionadas
            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

            if (startIsRect && endIsCircle) {
              // Caso rect -> circle
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y + 100,
                  startCoords.x + 50,
                  startCoords.y + 150,
                  (startCoords.x + 50 + clickedShape.x()) / 2,
                  (startCoords.y + 150 + clickedShape.y() + 100) / 2,
                  clickedShape.x(),
                  clickedShape.y() + 100,
                  clickedShape.x(),
                  clickedShape.y() + 50,
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            } else if (startIsRect && endIsRect) {
              // Caso rect -> rect
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y + 100,
                  startCoords.x + 50,
                  startCoords.y + 150,
                  (startCoords.x + 50 + clickedShape.x() + 50) / 2,
                  (startCoords.y + 150 + clickedShape.y() + 150) / 2,
                  clickedShape.x() + 50,
                  clickedShape.y() + 150,
                  clickedShape.x() + 50,
                  clickedShape.y() + 100,
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            } else if (startIsCircle && endIsRect) {
              // Caso circle -> rect
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y + 50,
                  startCoords.x,
                  startCoords.y + 100,
                  (startCoords.x + clickedShape.x() + 50) / 2,
                  (startCoords.y + 100 + clickedShape.y() + 150) / 2,
                  clickedShape.x() + 50,
                  clickedShape.y() + 150,
                  clickedShape.x() + 50,
                  clickedShape.y() + 100,
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            } else if (startIsCircle && endIsCircle) {
              // Caso circle -> circle
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y + 50,
                  startCoords.x,
                  startCoords.y + 100,
                  (startCoords.x + clickedShape.x()) / 2,
                  (startCoords.y + 100 + clickedShape.y() + 100) / 2,
                  clickedShape.x(),
                  clickedShape.y() + 100,
                  clickedShape.x(),
                  clickedShape.y() + 50,
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            }
            currentLines.push(newLine);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setCreatingLine(false);
            console.log("Se añadió una línea");
          }
        } else if (isLine) {
          // Caso figura -> línea
          if (startCoords.x !== null && startCoords.y !== null) {
            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;

            const startIsRect = startId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");

            // Obtener los puntos de la línea seleccionada
            const linePoints = isLine.points;

            let newLine;
            if (startIsRect) {
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y,
                  linePoints[4],
                  linePoints[5],
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            } else if (startIsCircle) {
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y - 50,
                  linePoints[4],
                  linePoints[5],
                ],
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              };
            }

            currentLines.push(newLine);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setCreatingLine(false);
            console.log("Se añadió una línea");
          }
        } else {
          console.log("No se hizo clic en una figura válida");
        }
      } else {
        console.log("Se hizo clic en un área vacía");
      }
    } else if (creatingLineSeparate) {
      if (!clickedOnEmpty) {
        const clickedShape = e.target;
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
            console.log("Primera figura seleccionada:", clickedShape.attrs.id);
          } else {
            console.log("Segunda figura seleccionada:", clickedShape.attrs.id);

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            const newDiagonalId = `line${currentLines.length + 2}`;
            let newLine, diagonalLine;

            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

            // Lógica para determinar los puntos de la línea principal
            let points;
            if (startIsRect && endIsCircle) {
              points = [
                startCoords.x + 50,
                startCoords.y + 100,
                startCoords.x + 50,
                startCoords.y + 150,
                (startCoords.x + 50 + clickedShape.x()) / 2,
                (startCoords.y + 150 + clickedShape.y() + 100) / 2,
                clickedShape.x(),
                clickedShape.y() + 100,
                clickedShape.x(),
                clickedShape.y() + 50,
              ];
            } else if (startIsRect && endIsRect) {
              points = [
                startCoords.x + 50,
                startCoords.y + 100,
                startCoords.x + 50,
                startCoords.y + 150,
                (startCoords.x + 50 + clickedShape.x() + 50) / 2,
                (startCoords.y + 150 + clickedShape.y() + 150) / 2,
                clickedShape.x() + 50,
                clickedShape.y() + 150,
                clickedShape.x() + 50,
                clickedShape.y() + 100,
              ];
            } else if (startIsCircle && endIsRect) {
              points = [
                startCoords.x,
                startCoords.y + 50,
                startCoords.x,
                startCoords.y + 100,
                (startCoords.x + clickedShape.x() + 50) / 2,
                (startCoords.y + 100 + clickedShape.y() + 150) / 2,
                clickedShape.x() + 50,
                clickedShape.y() + 150,
                clickedShape.x() + 50,
                clickedShape.y() + 100,
              ];
            } else if (startIsCircle && endIsCircle) {
              points = [
                startCoords.x,
                startCoords.y + 50,
                startCoords.x,
                startCoords.y + 100,
                (startCoords.x + clickedShape.x()) / 2,
                (startCoords.y + 100 + clickedShape.y() + 100) / 2,
                clickedShape.x(),
                clickedShape.y() + 100,
                clickedShape.x(),
                clickedShape.y() + 50,
              ];
            }

            // Puntos para la línea diagonal en el punto medio
            const midX = points[4];
            const midY = points[5];
            diagonalLine = {
              points: [midX + 10, midY - 10, midX - 10, midY + 10],
              stroke: "black",
              strokeWidth: 3,
              id: newDiagonalId,
            };

            newLine = {
              points,
              stroke: "black",
              strokeWidth: 4,
              id: newId,
            };

            currentLines.push(newLine);
            currentLines.push(diagonalLine);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setcreatingLineSeparate(false);
            console.log("Se añadieron dos líneas");
          }
        } else {
          console.log("No se hizo clic en una figura válida");
        }
      } else {
        console.log("Se hizo clic en un área vacía");
      }
    } else if (creatingLineDivorse) {
      if (!clickedOnEmpty) {
        const clickedShape = e.target;
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
            console.log("Primera figura seleccionada:", clickedShape.attrs.id);
          } else {
            console.log("Segunda figura seleccionada:", clickedShape.attrs.id);

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            const newDiagonalId1 = `line${currentLines.length + 2}`;
            const newDiagonalId2 = `line${currentLines.length + 3}`;
            let newLine, diagonalLine1, diagonalLine2;

            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

            // Lógica para determinar los puntos de la línea principal
            let points;
            if (startIsRect && endIsCircle) {
              points = [
                startCoords.x + 50,
                startCoords.y + 100,
                startCoords.x + 50,
                startCoords.y + 150,
                (startCoords.x + 50 + clickedShape.x()) / 2,
                (startCoords.y + 150 + clickedShape.y() + 100) / 2,
                clickedShape.x(),
                clickedShape.y() + 100,
                clickedShape.x(),
                clickedShape.y() + 50,
              ];
            } else if (startIsRect && endIsRect) {
              points = [
                startCoords.x + 50,
                startCoords.y + 100,
                startCoords.x + 50,
                startCoords.y + 150,
                (startCoords.x + 50 + clickedShape.x() + 50) / 2,
                (startCoords.y + 150 + clickedShape.y() + 150) / 2,
                clickedShape.x() + 50,
                clickedShape.y() + 150,
                clickedShape.x() + 50,
                clickedShape.y() + 100,
              ];
            } else if (startIsCircle && endIsRect) {
              points = [
                startCoords.x,
                startCoords.y + 50,
                startCoords.x,
                startCoords.y + 100,
                (startCoords.x + clickedShape.x() + 50) / 2,
                (startCoords.y + 100 + clickedShape.y() + 150) / 2,
                clickedShape.x() + 50,
                clickedShape.y() + 150,
                clickedShape.x() + 50,
                clickedShape.y() + 100,
              ];
            } else if (startIsCircle && endIsCircle) {
              points = [
                startCoords.x,
                startCoords.y + 50,
                startCoords.x,
                startCoords.y + 100,
                (startCoords.x + clickedShape.x()) / 2,
                (startCoords.y + 100 + clickedShape.y() + 100) / 2,
                clickedShape.x(),
                clickedShape.y() + 100,
                clickedShape.x(),
                clickedShape.y() + 50,
              ];
            }

            // Puntos para las líneas diagonales en el punto medio
            const midX = points[4];
            const midY = points[5];
            diagonalLine1 = {
              points: [midX + 20, midY - 10, midX + 10, midY, midX, midY + 10],
              stroke: "black",
              strokeWidth: 3,
              id: newDiagonalId1,
            };
            diagonalLine2 = {
              points: [midX, midY - 10, midX - 10, midY, midX - 20, midY + 10],
              stroke: "back",
              strokeWidth: 3,
              id: newDiagonalId2,
            };

            // Crear la nueva línea principal
            newLine = {
              points,
              stroke: "black",
              strokeWidth: 4,
              id: newId,
            };

            currentLines.push(newLine);
            currentLines.push(diagonalLine1);
            currentLines.push(diagonalLine2);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setcreatingLineDivorse(false);
            console.log("Se añadieron tres líneas");
          }
        } else {
          console.log("No se hizo clic en una figura válida");
        }
      } else {
        console.log("Se hizo clic en un área vacía");
      }
    } else if (creatingLinePunt) {
      if (!clickedOnEmpty) {
        const clickedShape = e.target;
        // Verificar si es una figura válida
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );
        const isLine = lines.find((line) => line.id === clickedShape.attrs.id);

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
            console.log("Primera figura seleccionada:", clickedShape.attrs.id);
          } else {
            console.log("Segunda figura seleccionada:", clickedShape.attrs.id);

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            let newLine;

            // Determinar el tipo de figuras seleccionadas
            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

            if (startIsRect && endIsCircle) {
              // Caso rect -> circle
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y + 100,
                  startCoords.x + 50,
                  startCoords.y + 150,
                  (startCoords.x + 50 + clickedShape.x()) / 2,
                  (startCoords.y + 150 + clickedShape.y() + 100) / 2,
                  clickedShape.x(),
                  clickedShape.y() + 100,
                  clickedShape.x(),
                  clickedShape.y() + 50,
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            } else if (startIsRect && endIsRect) {
              // Caso rect -> rect
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y + 100,
                  startCoords.x + 50,
                  startCoords.y + 150,
                  (startCoords.x + 50 + clickedShape.x() + 50) / 2,
                  (startCoords.y + 150 + clickedShape.y() + 150) / 2,
                  clickedShape.x() + 50,
                  clickedShape.y() + 150,
                  clickedShape.x() + 50,
                  clickedShape.y() + 100,
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            } else if (startIsCircle && endIsRect) {
              // Caso circle -> rect
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y + 50,
                  startCoords.x,
                  startCoords.y + 100,
                  (startCoords.x + clickedShape.x() + 50) / 2,
                  (startCoords.y + 100 + clickedShape.y() + 150) / 2,
                  clickedShape.x() + 50,
                  clickedShape.y() + 150,
                  clickedShape.x() + 50,
                  clickedShape.y() + 100,
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            } else if (startIsCircle && endIsCircle) {
              // Caso circle -> circle
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y + 50,
                  startCoords.x,
                  startCoords.y + 100,
                  (startCoords.x + clickedShape.x()) / 2,
                  (startCoords.y + 100 + clickedShape.y() + 100) / 2,
                  clickedShape.x(),
                  clickedShape.y() + 100,
                  clickedShape.x(),
                  clickedShape.y() + 50,
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            }
            currentLines.push(newLine);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setCreatingLinePunt(false);
            console.log("Se añadió una línea");
          }
        } else if (isLine) {
          // Caso figura -> línea
          if (startCoords.x !== null && startCoords.y !== null) {
            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;

            const startIsRect = startId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");

            // Obtener los puntos de la línea seleccionada
            const linePoints = isLine.points;

            let newLine;
            if (startIsRect) {
              newLine = {
                points: [
                  startCoords.x + 50,
                  startCoords.y,
                  linePoints[4],
                  linePoints[5],
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            } else if (startIsCircle) {
              newLine = {
                points: [
                  startCoords.x,
                  startCoords.y - 50,
                  linePoints[4],
                  linePoints[5],
                ],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 5],
                id: newId,
              };
            }

            currentLines.push(newLine);
            setLines(currentLines);

            setStartCoords({ x: null, y: null });
            setCreatingLinePunt(false);
          }
        } else {
          console.log("No se hizo clic en una figura válida");
        }
      } else {
        console.log("Se hizo clic en un área vacía");
      }
    } else {
      if (clickedOnEmpty) {
        selectShape(null);
      }
    }
  };

  const addRectangle = () => {
    const currentFigures = [...figures];

    const newId = `rect${currentFigures.length + 1}`;
    const newRect = {
      x: 150 + currentFigures.length * 10,
      y: 150 + currentFigures.length * 10,
      width: 100,
      height: 100,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      figure: "rectangle",
      id: newId,
    };

    currentFigures.push(newRect);
    setFigures(currentFigures);
  };

  const addCrossedRectangle = () => {
    const currentFigures = [...figures];

    const newId = `rect${currentFigures.length + 1}`;
    const x = 0;
    const y = 0;
    const width = 100;
    const height = 100;

    const newRect = {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      figure: "crossedRectangle",
      id: newId,
      lines: [
        // Diagonal lines
        {
          points: [x, y, x + width, y + height],
          stroke: "black",
          strokeWidth: 3,
        },
        {
          points: [x, y + height, x + width, y],
          stroke: "black",
          strokeWidth: 3,
        },
      ],
    };

    currentFigures.push(newRect);
    setFigures(currentFigures);
  };

  const addDobleRectangle = () => {
    const currentFigures = [...figures];

    const newId = `rect${currentFigures.length + 1}`;
    const x = 150 + currentFigures.length * 10;
    const y = 150 + currentFigures.length * 10;
    const width = 100;
    const height = 100;

    const newRect = {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: "white",
      stroke: "black",
      strokeWidth: 3,
      figure: "rectangleId",
      id: newId,
      innerRect: {
        x: x + 10,
        y: y + 10,
        width: width - 20,
        height: height - 20,
        fill: "white",
        stroke: "black",
        strokeWidth: 3,
        id: `${newId}_inner`,
      },
    };

    currentFigures.push(newRect);
    setFigures(currentFigures);
  };

  const addCircle = (option) => {
    const currentFigures = [...figures];

    const newId = `circle${currentFigures.length + 1}`;
    let newCircle;

    if (option === 1) {
      newCircle = {
        x: 150 + currentFigures.length * 10,
        y: 150 + currentFigures.length * 10,
        radius: 50,
        fill: "white",
        stroke: "black",
        strokeWidth: 4,
        figure: "circle",
        id: newId,
      };
    } else if (option === 2) {
      newCircle = {
        x: 150 + currentFigures.length * 10,
        y: 150 + currentFigures.length * 10,
        radius: 30,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
        figure: "circle",
        id: newId,
      };
    }
    currentFigures.push(newCircle);
    setFigures(currentFigures);
  };

  const addCrossedCircle = () => {
    const currentFigures = [...figures];

    const newId = `circle${currentFigures.length + 1}`;
    const x = 0;
    const y = 0;
    const radius = 50;

    const newCircle = {
      x: x,
      y: y,
      radius: radius,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      figure: "crossedCircle",
      id: newId,
      lines: [
        // Diagonal lines
        {
          points: [
            x - radius + 12,
            y - radius + 12,
            x + radius - 12,
            y + radius - 12,
          ],
          stroke: "black",
          strokeWidth: 3,
        },
        {
          points: [
            x + radius - 12,
            y - radius + 12,
            x - radius + 12,
            y + radius - 12,
          ],
          stroke: "black",
          strokeWidth: 3,
        },
      ],
    };

    currentFigures.push(newCircle);
    setFigures(currentFigures);
  };

  const addOval = () => {
    const currentFigures = [...figures];

    const newId = `oval${currentFigures.length + 1}`;

    const newOval = {
      x: 150 + currentFigures.length * 10,
      y: 150 + currentFigures.length * 10,
      radiusX: 100,
      radiusY: 50,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 4,
      dash: [33, 10],
      figure: "oval",
      id: newId,
    };

    currentFigures.push(newOval);
    setFigures(currentFigures);
  };

  const addCircleIdent = () => {
    const currentFigures = [...figures];

    const newId = `circle${currentFigures.length + 1}`;

    const newcircleId = {
      x: 150 + currentFigures.length * 10,
      y: 150 + currentFigures.length * 10,
      innerRadius: 50,
      outerRadius: 40,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      figure: "circleId",
      id: newId,
    };
    currentFigures.push(newcircleId);
    setFigures(currentFigures);
  };

  const handleClickOpenTextDialog = () => {
    setOpenTextDialog(true);
  };

  const handleCloseTextDialog = () => {
    setOpenTextDialog(false);
  };

  const handleClickOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const handleTextChange = (e) => {
    setTextPhrase(e.target.value);
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
    handleCloseTextDialog();
  };

  const addLine = () => {
    setCreatingLine(true);
  };

  const addLinePunt = () => {
    setCreatingLinePunt(true);
  };

  const addLineSeparate = () => {
    setcreatingLineSeparate(true);
  };

  const addLineDivorse = () => {
    setcreatingLineDivorse(true);
  };

  const handleSave = async () => {
    const stageJson = stageRef.current.toJSON();
    console.log(stageJson);
    try {
      await axios.post(`http://localhost:4000/editProyect`, {
        id: projectId,
        data: {
          edit_file: stageJson,
        },
      });
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  const handleSaveAndExit = () => {
    handleSave();
    console.log("Se cierra el dialog y se redirige al home");

    handleCloseSaveDialog();
  };

  const handleDownload = async () => {
    if (stageRef.current) {
      const imgDownload = stageRef.current.toDataURL({ pixelRatio: 3 });
      downloadURI(imgDownload, "stage.png");
    } else {
      console.error("No hay referencia al Stage");
    }
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <SidebarMenu
            addRectangle={addRectangle}
            addCrossRectangle={addCrossedRectangle}
            addCircle={addCircle}
            addLine={addLine}
            addLinePunt={addLinePunt}
            addLineSeparate={addLineSeparate}
            addLineDivorse={addLineDivorse}
            addOval={addOval}
            addCircleIdent={addCircleIdent}
            addCrossedCircle={addCrossedCircle}
            addDobleRectangle={addDobleRectangle}
          />
        </Grid>
        <Grid item xs={10}>
          <div id="container" style={{ height: "100%", width: "100%" }}>
            <KonvaStage
              lines={lines}
              figures={figures}
              texts={texts}
              selectedId={selectedId}
              selectShape={selectShape}
              setLines={setLines}
              setFigures={setFigures}
              setTexts={setTexts}
              checkDeselect={checkDeselect}
              ref={stageRef}
            />
          </div>
        </Grid>
      </Grid>
      <IconButton
        onClick={handleClickOpenTextDialog}
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
      <Dialog open={openTextDialog} onClose={handleCloseTextDialog}>
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
          <Button onClick={handleCloseTextDialog}>Cancelar</Button>
          <Button onClick={addText}>Agregar</Button>
        </DialogActions>
      </Dialog>
      <IconButton
        onClick={handleClickOpenSaveDialog}
        style={{
          backgroundColor: "lightgreen",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          position: "fixed",
          bottom: "100px",
          right: "20px",
        }}
      >
        <SaveIcon />
      </IconButton>
      <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog}>
        <DialogTitle>Opciones de Guardado</DialogTitle>
        <DialogContent>
          <Typography>¿Qué acción deseas realizar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} variant="contained" color="primary">
            Descargar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
          <Button
            onClick={handleSaveAndExit}
            variant="contained"
            color="primary"
            component={Link}
            to="/home"
          >
            Guardar y Salir
          </Button>
          <Button
            onClick={handleCloseSaveDialog}
            variant="contained"
            color="secondary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Canvas;
