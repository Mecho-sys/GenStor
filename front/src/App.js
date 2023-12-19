import React, { useRef, useState } from "react";
//import { Stage } from "react-konva";
import "./App.css";
import Gallery from "./components/Gallery";
import BoardComponent from "./components/BoardComponent";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextEditor from "./components/TextEditor";

const App = () => {
  const [images, setImages] = useState([]);
  const stageRef = useRef();

  const personas = [
    { img: "/assets/Man.JPG", title: "Hombre", author: "Mecho" },
    { img: "/assets/Woman.JPG", title: "Mujer", author: "Mecho" },
    { img: "/assets/ManDead.JPG", title: "Hombre muerto", author: "Mecho" },
    { img: "/assets/WomanDead.JPG", title: "Mujer muerta", author: "Mecho" },
    { img: "/assets/MId.JPG", title: "Hombre Identificado", author: "Mecho" },
    { img: "/assets/WId.JPG", title: "Mujer Identificada", author: "Mecho" },
    { img: "/assets/AbEsp.JPG", title: "Aborto Espontaneo", author: "Mecho" },
    { img: "/assets/AbProv.JPG", title: "Aborto Provocado", author: "Mecho" },
  ];

  const uniones = [
    { img: "/assets/LCont.JPG", title: "Línea continua", author: "Mecho" },
    { img: "/assets/LPunt.JPG", title: "Línea punteada", author: "Mecho" },
  ];

  const relaciones = [
    { img: "/assets/Sep.JPG", title: "Separación", author: "Mecho" },
    { img: "/assets/Div.JPG", title: "Divorcio", author: "Mecho" },
    { img: "/assets/union.JPG", title: "Union", author: "Mecho" },
    { img: "/assets/Fusion.JPG", title: "Fusion", author: "Mecho" },
    { img: "/assets/conflict.JPG", title: "Conflicto", author: "Mecho" },
    { img: "/assets/Dist.JPG", title: "Distancia", author: "Mecho" },
    { img: "/assets/Rup.JPG", title: "Quiebre", author: "Mecho" },
    { img: "/assets/FusConfl.JPG", title: "Fusion Conflicto", author: "Mecho" },
  ];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("image", JSON.stringify(item));
  };

  const addTextToBoard = (text) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        x: stageRef.current.width() / 2,
        y: stageRef.current.height() / 2,
        text: text,
        id: `text-${prevImages.length + 1}`,
        isText: true,
      },
    ]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "20%" }}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemText primary="Personas" sx={{ textAlign: "center" }} />
          </ListItem>
          <Gallery images={personas} onDragStart={handleDragStart} />
          <Divider />
          <ListItem>
            <ListItemText primary="Uniones" sx={{ textAlign: "center" }} />
          </ListItem>
          <Gallery images={uniones} onDragStart={handleDragStart} />
          <Divider />
          <ListItem>
            <ListItemText
              primary="Relaciones interpersonales"
              sx={{ textAlign: "center" }}
            />
          </ListItem>
          <Gallery images={relaciones} onDragStart={handleDragStart} />
          <Divider />
        </List>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TextEditor onAddText={addTextToBoard} />
        <div style={{ flex: 1, overflow: "auto" }}>
          <BoardComponent
            images={images}
            setImages={setImages}
            stageRef={stageRef}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
