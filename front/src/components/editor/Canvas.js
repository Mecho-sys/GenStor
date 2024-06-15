import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SidebarMenu from "./SideBarMenu";
import KonvaStage from "./KonvaStage";

const initialFigures = [];
const initialText = [];
const initialLines = [];

const Canvas = () => {
  const { projectId } = useParams();
  const stageRef = useRef(null);
  const [actionHistory, setActionHistory] = useState([]);
  const navigate = useNavigate();

  const [figures, setFigures] = React.useState(initialFigures);
  const [selectedId, selectShape] = React.useState(null);
  const [openTextDialog, setOpenTextDialog] = React.useState(false);

  //información de Familia
  const [nucleoFamData, setNucleoFamData] = React.useState([]);
  const [fNucleoFamData, setFNucleoFamData] = React.useState([]);
  const [openFamDialog, setOpenFamDialog] = React.useState(false);

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
  const [creatingLineRelation, setcreatingLineRelation] = React.useState(false);
  const [relationType, setRelationType] = React.useState(false);
  const [startCoords, setStartCoords] = React.useState({ x: null, y: null });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getProyects`);
        const project = response.data.data.find(
          (p) => p.id.toString() === projectId.toString()
        );
        if (project) {
          setFigures(project.figures || []);
          setTexts(project.texts || []);
          setLines(project.lines || []);
          setFNucleoFamData(project.personas_fuera_nucleo || []);
          setNucleoFamData(project.personas_nucleo || []);
        } else {
          console.log("No se encontró el proyecto con el id:", projectId);
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
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );
        const isLine = lines.find((line) => line.id === clickedShape.attrs.id);

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
          } else {
            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            let newLine;

            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

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

            newLine = {
              points,
              stroke: "black",
              strokeWidth: 4,
              id: newId,
            };

            currentLines.push(newLine);
            setLines(currentLines);
            setActionHistory([
              ...actionHistory,
              { type: "add", target: "line", id: newLine.id },
            ]);
            setStartCoords({ x: null, y: null });
            setCreatingLine(false);
          }
        } else if (isLine) {
          if (startCoords.x !== null && startCoords.y !== null) {
            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;

            const startIsRect = startId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");

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
            setActionHistory([
              ...actionHistory,
              { type: "add", target: "line", id: newLine.id },
            ]);

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
          } else {
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
            const updatedHistory = [
              ...actionHistory,
              {
                type: "add",
                target: "line",
                ids: [newLine.id, diagonalLine.id],
              },
            ];
            setActionHistory(updatedHistory);

            setStartCoords({ x: null, y: null });
            setcreatingLineSeparate(false);
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
          } else {
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
            const updatedHistory = [
              ...actionHistory,
              {
                type: "add",
                target: "line",
                ids: [newLine.id, diagonalLine1.id, diagonalLine2.id],
              },
            ];
            setActionHistory(updatedHistory);

            setStartCoords({ x: null, y: null });
            setcreatingLineDivorse(false);
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
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );
        const isLine = lines.find((line) => line.id === clickedShape.attrs.id);

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
          } else {
            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            let newLine;

            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

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

            newLine = {
              points,
              stroke: "black",
              strokeWidth: 4,
              dash: [10, 5],
              id: newId,
            };
            currentLines.push(newLine);
            setLines(currentLines);
            setActionHistory([
              ...actionHistory,
              { type: "add", target: "line", id: newLine.id },
            ]);

            setStartCoords({ x: null, y: null });
            setCreatingLinePunt(false);
          }
        } else if (isLine) {
          if (startCoords.x !== null && startCoords.y !== null) {
            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;

            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;

            const startIsRect = startId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");

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
            setActionHistory([
              ...actionHistory,
              { type: "add", target: "line", id: newLine.id },
            ]);

            setStartCoords({ x: null, y: null });
            setCreatingLinePunt(false);
          }
        } else {
          console.log("No se hizo clic en una figura válida");
        }
      } else {
        console.log("Se hizo clic en un área vacía");
      }
    } else if (creatingLineRelation) {
      if (!clickedOnEmpty) {
        const clickedShape = e.target;
        const isFigure = figures.find(
          (fig) => fig.id === clickedShape.attrs.id
        );

        if (isFigure) {
          if (startCoords.x === null && startCoords.y === null) {
            setStartCoords({ x: clickedShape.x(), y: clickedShape.y() });
          } else {
            const startId = figures.find(
              (fig) => fig.x === startCoords.x && fig.y === startCoords.y
            ).id;
            const endId = clickedShape.attrs.id;

            const currentLines = [...lines];
            const newId = `line${currentLines.length + 1}`;
            let newLines = [];

            const startIsRect = startId.startsWith("rect");
            const endIsRect = endId.startsWith("rect");
            const startIsCircle = startId.startsWith("circle");
            const endIsCircle = endId.startsWith("circle");

            let startX = startCoords.x + (startIsRect ? 50 : 0);
            let startY = startCoords.y + (startIsRect ? 50 : 0);
            let endX = clickedShape.x() + (endIsRect ? 50 : 0);
            let endY = clickedShape.y() + (endIsRect ? 50 : 0);

            const createParallelLines = (count, offset) => {
              if (count === 2) {
                for (let i = 0; i < count; i++) {
                  newLines.push({
                    points: [
                      startX + i * offset,
                      startY + i * offset,
                      endX + i * offset,
                      endY + i * offset,
                    ],
                    stroke: "black",
                    strokeWidth: 4,
                    id: `${newId}_${i}`,
                  });
                }
              } else if (count === 3) {
                const sX = startX - offset;
                const sY = startY - offset;
                const eX = endX - offset;
                const eY = endY - offset;

                for (let i = 0; i < count; i++) {
                  newLines.push({
                    points: [
                      sX + i * offset,
                      sY + i * offset,
                      eX + i * offset,
                      eY + i * offset,
                    ],
                    stroke: "black",
                    strokeWidth: 4,
                    id: `${newId}_${i}`,
                  });
                }
              }
            };

            const createConflictLine = () => {
              const numberOfZigs = 20;
              const points = [];

              const totalDistance = Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
              );
              const dx = (endX - startX) / numberOfZigs;
              const dy = (endY - startY) / numberOfZigs;
              const zigzagAmplitude = totalDistance / (numberOfZigs * 2);

              for (let i = 0; i <= numberOfZigs; i++) {
                const x = startX + i * dx;
                const y =
                  startY +
                  i * dy +
                  (i % 2 === 0 ? zigzagAmplitude : -zigzagAmplitude);
                points.push(x, y);
              }

              points.push(endX, endY);

              newLines.push({
                points,
                stroke: "black",
                strokeWidth: 4,
                id: newId,
              });
            };

            const createFusionConflicto = (count, offset) => {
              createConflictLine();
              const sX = startX - offset;
              const sY = startY - offset;
              const eX = endX - offset;
              const eY = endY - offset;

              for (let i = 0; i < count; i++) {
                newLines.push({
                  points: [
                    sX + i * offset,
                    sY + i * offset,
                    eX + i * offset,
                    eY + i * offset,
                  ],
                  stroke: "black",
                  strokeWidth: 4,
                  id: `${newId}_${i}`,
                });
              }
            };

            const createDottedLine = () => {
              newLines.push({
                points: [startX, startY, endX, endY],
                stroke: "black",
                strokeWidth: 4,
                dash: [10, 10],
                id: newId,
              });
            };

            const createBreakLine = () => {
              const segments = 5;
              const totalLength = Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
              );
              const segmentLength = totalLength / segments;

              const dx = (endX - startX) / segments;
              const dy = (endY - startY) / segments;

              const points1 = [];
              const points2 = [];
              const points3 = [];

              let midSegmentIndex1 = Math.floor(segments / 2);
              let midSegmentIndex2 = Math.floor(segments / 2) + 1;

              for (let i = 0; i < segments; i++) {
                if (i === midSegmentIndex1 || i === midSegmentIndex2) {
                  const midX = startX + i * dx;
                  const midY = startY + i * dy;

                  if (i === midSegmentIndex1) {
                    points1.push(midX - dx / 2, midY - dy / 2);
                    points1.push(midX + dx / 2, midY + dy / 2);
                  }

                  const barLength = 20;
                  const perpendicularAngle = Math.atan2(dy, dx) + Math.PI / 2;
                  const barX1 =
                    midX - (barLength / 2) * Math.cos(perpendicularAngle);
                  const barY1 =
                    midY - (barLength / 2) * Math.sin(perpendicularAngle);
                  const barX2 =
                    midX + (barLength / 2) * Math.cos(perpendicularAngle);
                  const barY2 =
                    midY + (barLength / 2) * Math.sin(perpendicularAngle);

                  points2.push(
                    midX,
                    midY,
                    barX1,
                    barY1,
                    midX,
                    midY,
                    barX2,
                    barY2
                  );
                  points3.push(midX, midY);
                } else {
                  // Normal line segments
                  points1.push(startX + i * dx, startY + i * dy);
                }
              }
              points1.push(endX, endY);

              const whiteLinePoints = [
                points3[0],
                points3[1],
                points3[2],
                points3[3],
              ];

              newLines.push(
                {
                  points: points1.flat(),
                  stroke: "black",
                  strokeWidth: 4,
                  id: `${newId}_1`,
                },
                {
                  points: points2.flat(),
                  stroke: "black",
                  strokeWidth: 4,
                  id: `${newId}_2`,
                },
                {
                  points: whiteLinePoints,
                  stroke: "white",
                  strokeWidth: 30,
                  id: `${newId}_3`,
                }
              );
            };

            switch (relationType) {
              case 1: // Unión
                createParallelLines(2, 10);
                break;
              case 2: // Fusión
                createParallelLines(3, 15);
                break;
              case 3: // Conflicto
                createConflictLine();
                break;
              case 4: // Distancia
                createDottedLine();
                break;
              case 5: // Quiebre
                createBreakLine();
                break;
              case 6: // Fusion-Conflicto
                createFusionConflicto(3, 15);
                break;

              default:
                newLines.push({
                  points: [startX, startY, endX, endY],
                  stroke: "black",
                  strokeWidth: 4,
                  id: newId,
                });
            }

            currentLines.push(...newLines);
            console.log(newLines);
            setLines(currentLines);
            const lineIds = newLines.map((line) => line.id);
            console.log(lineIds);
            const updatedHistory = [
              ...actionHistory,
              {
                type: "add",
                target: "line",
                ids: lineIds,
              },
            ];
            setActionHistory(updatedHistory);
            setStartCoords({ x: null, y: null });
            setcreatingLineRelation(false);
          }
        } else {
          console.log("No se hizo clic en una figura válida");
          setStartCoords({ x: null, y: null });
          setcreatingLineRelation(false);
        }
      } else {
        console.log("Se hizo clic en un área vacía");
        setStartCoords({ x: null, y: null });
        setcreatingLineRelation(false);
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
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newRect.id },
    ]);
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
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newRect.id },
    ]);
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
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newRect.id },
    ]);
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

    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newCircle.id },
    ]);
    currentFigures.push(newCircle);
    setFigures(currentFigures);
  };

  const addCrossedCircle = (option) => {
    const currentFigures = [...figures];

    const newId = `circle${currentFigures.length + 1}`;
    const x = 0;
    const y = 0;
    const radius = 50;

    let newCircle;

    if (option === 1) {
      newCircle = {
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
    } else if (option === 2) {
      newCircle = {
        x: x,
        y: y,
        radius: radius,
        fill: "transparent",
        stroke: "white",
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
    }

    currentFigures.push(newCircle);
    setFigures(currentFigures);
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newCircle.id },
    ]);
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
      dash: [10, 10],
      figure: "oval",
      id: newId,
    };

    currentFigures.push(newOval);
    setFigures(currentFigures);
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newOval.id },
    ]);
  };

  const addCircleIdent = () => {
    const currentFigures = [...figures];

    const newId = `circle${currentFigures.length + 1}`;
    const x = 150 + currentFigures.length * 10;
    const y = 150 + currentFigures.length * 10;

    const newcircleId = {
      x: x,
      y: y,
      radius: 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      figure: "circleId",
      id: newId,
      innerCircle: {
        x: x,
        y: y,
        radius: 40,
        fill: "white",
        stroke: "black",
        strokeWidth: 3,
        id: `${newId}_inner`,
      },
    };
    currentFigures.push(newcircleId);
    setFigures(currentFigures);
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "figure", id: newcircleId.id },
    ]);
  };

  const handleClickOpenTextDialog = () => {
    setOpenTextDialog(true);
  };

  const handleCloseTextDialog = () => {
    setOpenTextDialog(false);
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
    setActionHistory([
      ...actionHistory,
      { type: "add", target: "text", id: newText.id },
    ]);
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

  const addRelation = (option) => {
    setRelationType(option);
    setcreatingLineRelation(true);
  };

  const handleSave = async () => {
    //const stageJson = stageRef.current.toJSON();
    try {
      await axios.post(`http://localhost:4000/editProyect`, {
        id: projectId,
        data: {
          figures: figures,
          lines: lines,
          texts: texts,
        },
      });
      console.log("Proyecto guardado exitosamente");
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  const handleSaveAndExit = () => {
    handleSave();

    navigate(`/home`);
    console.log("Se cierra el dialog y se redirige al home");
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

  const handleUndo = () => {
    if (actionHistory.length === 0) return;
    const lastAction = actionHistory[actionHistory.length - 1];
    if (lastAction.type === "add" && lastAction.target === "figure") {
      const updatedFigures = figures.filter(
        (figure) => figure.id !== lastAction.id
      );
      setFigures(updatedFigures);
    } else if (lastAction.type === "add" && lastAction.target === "line") {
      if (Array.isArray(lastAction.ids)) {
        const updatedLines = lines.filter(
          (line) => !lastAction.ids.includes(line.id)
        );
        setLines(updatedLines);
      } else {
        const updatedLines = lines.filter((line) => line.id !== lastAction.id);
        setLines(updatedLines);
      }
    } else if (lastAction.type === "add" && lastAction.target === "text") {
      const updatedText = texts.filter((text) => text.id !== lastAction.id);
      setTexts(updatedText);
    }

    const updatedHistory = actionHistory.slice(0, -1);
    setActionHistory(updatedHistory);
  };

  const handleViewFamily = () => {
    setOpenFamDialog(true);
  };

  const handleCloseFamDialog = () => {
    setOpenFamDialog(false);
  };

  const actions = [
    {
      icon: <AddIcon />,
      name: "Agregar Texto",
      onClick: handleClickOpenTextDialog,
      color: "lightblue",
    },
    {
      icon: <SaveIcon />,
      name: "Guardar",
      onClick: handleSave,
      color: "lightgreen",
    },
    {
      icon: <DownloadIcon />,
      name: "Descargar como png",
      onClick: handleDownload,
      color: "lightgreen",
    },
    {
      icon: <PeopleAltIcon />,
      name: "Informacion de la familia",
      onClick: handleViewFamily,
      color: "lightgreen",
    },
    {
      icon: <LogoutIcon />,
      name: "Salir",
      onClick: handleSaveAndExit,
      color: "lightgreen",
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: "0 0 20%", overflowY: "auto" }}>
          <SidebarMenu
            addRectangle={addRectangle}
            addCrossRectangle={addCrossedRectangle}
            addCircle={addCircle}
            addLine={addLine}
            addLinePunt={addLinePunt}
            addLineSeparate={addLineSeparate}
            addLineDivorse={addLineDivorse}
            addRelation={addRelation}
            addOval={addOval}
            addCircleIdent={addCircleIdent}
            addCrossedCircle={addCrossedCircle}
            addDobleRectangle={addDobleRectangle}
          />
        </div>
        <div style={{ flex: "1 1 80%", height: "100%" }}>
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
        </div>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial example"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ backgroundColor: action.color }}
          />
        ))}
      </SpeedDial>
      <IconButton
        onClick={handleUndo}
        style={{
          backgroundColor: "lightblue",
          borderRadius: "50%",
          width: "58px",
          height: "58px",
          position: "fixed",
          bottom: "20px",
          right: "100px",
        }}
      >
        <UndoIcon />
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
      <Dialog
        open={openFamDialog}
        onClose={handleCloseFamDialog}
        PaperProps={{ style: { minWidth: "80vw", maxHeight: "80vh" } }}
      >
        <DialogTitle>Información Familiar</DialogTitle>
        <DialogContent>
          <DialogTitle>Núcleo Familiar</DialogTitle>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Estado Civil</TableCell>
                  <TableCell>Parentesco</TableCell>
                  <TableCell>RUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(nucleoFamData) &&
                  nucleoFamData.map((person, index) => (
                    <TableRow key={index}>
                      <TableCell>{person.nombres}</TableCell>
                      <TableCell>{person.appaterno}</TableCell>
                      <TableCell>{person.apmaterno}</TableCell>
                      <TableCell>{person.genero}</TableCell>
                      <TableCell>{person.ecivil}</TableCell>
                      <TableCell>{person.parentesco}</TableCell>
                      <TableCell>{person.rut}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogTitle>Fuera del núcleo Familiar</DialogTitle>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Estado Civil</TableCell>
                  <TableCell>Parentesco</TableCell>
                  <TableCell>RUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(fNucleoFamData) &&
                  fNucleoFamData.map((person, index) => (
                    <TableRow key={index}>
                      <TableCell>{person.nombres}</TableCell>
                      <TableCell>{person.appaterno}</TableCell>
                      <TableCell>{person.apmaterno}</TableCell>
                      <TableCell>{person.genero}</TableCell>
                      <TableCell>{person.ecivil}</TableCell>
                      <TableCell>{person.parentesco}</TableCell>
                      <TableCell>{person.rut}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFamDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Canvas;
