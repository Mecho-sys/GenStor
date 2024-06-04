import React from "react";
import { Stage, Layer } from "react-konva";
import LineComponent from "./figures/LineComponent";
import Rectangle from "./figures/RectangleComponent";
import CircleComponent from "./figures/CircleComponent";
import TextComponent from "./figures/TextComponent";

const KonvaStage = ({
  lines,
  rectangles,
  circles,
  texts,
  selectedId,
  selectShape,
  setLines,
  setRectangles,
  setCircles,
  setTexts,
  checkDeselect,
}) => {
  return (
    <Stage
      width={window.innerWidth * 0.8}
      height={window.innerHeight}
      draggable
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {lines.map((line, i) => (
          <LineComponent
            key={i}
            shapeProps={line}
            isSelected={line.id === selectedId}
            onSelect={() => selectShape(line.id)}
            onChange={(newAttrs) => {
              const updatedLines = lines.slice();
              updatedLines[i] = newAttrs;
              setLines(updatedLines);
            }}
          />
        ))}
        {rectangles.map((rect, i) => (
          <Rectangle
            key={i}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => selectShape(rect.id)}
            onChange={(newAttrs) => {
              const rects = rectangles.slice();
              rects[i] = newAttrs;
              setRectangles(rects);
            }}
          />
        ))}
        {circles.map((shape, i) => (
          <CircleComponent
            key={i}
            shapeProps={shape}
            isSelected={shape.id === selectedId}
            onSelect={() => selectShape(shape.id)}
            onChange={(newAttrs) => {
              const shapes = circles.slice();
              shapes[i] = newAttrs;
              setCircles(shapes);
            }}
          />
        ))}
        {texts.map((text, i) => (
          <TextComponent
            key={i}
            shapeProps={text}
            isSelected={text.id === selectedId}
            onSelect={() => selectShape(text.id)}
            onChange={(newAttrs) => {
              const updatedTexts = texts.slice();
              updatedTexts[i] = newAttrs;
              setTexts(updatedTexts);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default KonvaStage;
