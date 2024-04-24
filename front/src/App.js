import React, { useRef, useState } from "react";
//import { Stage } from "react-konva";
import "./App.css";

const App = () => {
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
    { img: "/assets/Sep.JPG", title: "Separación", author: "Mecho" },
    { img: "/assets/Div.JPG", title: "Divorcio", author: "Mecho" },
  ];

  const relaciones = [
    { img: "/assets/union.JPG", title: "Union", author: "Mecho" },
    { img: "/assets/Fusion.JPG", title: "Fusion", author: "Mecho" },
    { img: "/assets/conflict.JPG", title: "Conflicto", author: "Mecho" },
    { img: "/assets/Dist.JPG", title: "Distancia", author: "Mecho" },
    { img: "/assets/Rup.JPG", title: "Quiebre", author: "Mecho" },
    { img: "/assets/FusConfl.JPG", title: "Fusion Conflicto", author: "Mecho" },
  ];

  return;
};

export default App;
