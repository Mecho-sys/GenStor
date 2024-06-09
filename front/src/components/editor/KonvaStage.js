import React, { forwardRef, useImperativeHandle } from "react";
import {
  Stage,
  Layer,
  Group,
  Line,
  Rect,
  Circle,
  Ring,
  Text,
} from "react-konva";
import EllipseComponent from "./figures/EllipseComponent";

const KonvaStage = forwardRef(
  (
    {
      lines,
      figures,
      texts,
      selectedId,
      selectShape,
      setLines,
      setFigures,
      setTexts,
      checkDeselect,
    },
    ref
  ) => {
    const stageRef = React.useRef();

    useImperativeHandle(ref, () => ({
      toJSON: () => {
        return stageRef.current.toJSON();
      },
      toDataURL: (options) => {
        return stageRef.current.toDataURL(options);
      },
    }));

    const handleShapeChange = (newAttrs, i) => {
      const updatedFigures = figures.slice();
      updatedFigures[i] = newAttrs;
      setFigures(updatedFigures);
    };

    return (
      <Stage
        ref={stageRef}
        width={window.innerWidth * 0.8}
        height={window.innerHeight}
        draggable
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              {...line}
              draggable
              onClick={() => selectShape(line.id)}
              onDragEnd={(e) => {
                const updatedLines = lines.slice();
                updatedLines[i] = { ...line, points: e.target.points() };
                setLines(updatedLines);
              }}
            />
          ))}
          {figures.map((shape, i) => {
            if (shape.figure === "oval") {
              return (
                <EllipseComponent
                  key={shape.id}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => selectShape(shape.id)}
                  onChange={(newAttrs) => handleShapeChange(newAttrs, i)}
                />
              );
            } else if (shape.figure === "circle") {
              return (
                <Circle
                  key={shape.id}
                  {...shape}
                  draggable
                  onClick={() => selectShape(shape.id)}
                  onDragEnd={(e) => {
                    const updatedFigures = figures.slice();
                    updatedFigures[i] = {
                      ...shape,
                      x: e.target.x(),
                      y: e.target.y(),
                    };
                    setFigures(updatedFigures);
                  }}
                />
              );
            } else if (shape.figure === "circleId") {
              return (
                <Ring
                  key={shape.id}
                  {...shape}
                  draggable
                  onClick={() => selectShape(shape.id)}
                  onDragEnd={(e) =>
                    handleShapeChange(
                      { ...shape, x: e.target.x(), y: e.target.y() },
                      i
                    )
                  }
                />
              );
            } else if (shape.figure === "crossedCircle") {
              return (
                <Group key={shape.id}>
                  <Circle
                    key={shape.id}
                    {...shape}
                    draggable
                    onClick={() => selectShape(shape.id)}
                    onDragEnd={(e) => {
                      const updatedFigures = figures.slice();
                      updatedFigures[i] = {
                        ...shape,
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      setFigures(updatedFigures);
                    }}
                  />
                  {shape.lines.map((line, j) => (
                    <Line
                      key={`${shape.id}_line${j}`}
                      points={line.points.map((p, index) =>
                        index % 2 === 0 ? p + shape.x : p + shape.y
                      )}
                      stroke={line.stroke}
                      strokeWidth={line.strokeWidth}
                    />
                  ))}
                </Group>
              );
            } else if (shape.figure === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  {...shape}
                  draggable
                  onClick={() => selectShape(shape.id)}
                  onDragEnd={(e) =>
                    handleShapeChange(
                      { ...shape, x: e.target.x(), y: e.target.y() },
                      i
                    )
                  }
                />
              );
            } else if (shape.figure === "crossedRectangle") {
              return (
                <Group key={shape.id}>
                  <Rect
                    key={shape.id}
                    {...shape}
                    draggable
                    onClick={() => selectShape(shape.id)}
                    onDragEnd={(e) => {
                      const updatedFigures = figures.slice();
                      updatedFigures[i] = {
                        ...shape,
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      setFigures(updatedFigures);
                    }}
                  />
                  {shape.lines.map((line, j) => (
                    <Line
                      key={`${shape.id}_line${j}`}
                      points={line.points.map((p, index) =>
                        index % 2 === 0 ? p + shape.x : p + shape.y
                      )}
                      stroke={line.stroke}
                      strokeWidth={line.strokeWidth}
                    />
                  ))}
                </Group>
              );
            } else if (shape.figure === "rectangleId") {
              return (
                <Group key={shape.id}>
                  <Rect
                    {...shape}
                    draggable
                    onClick={() => selectShape(shape.id)}
                    onDragEnd={(e) => {
                      const x = e.target.x();
                      const y = e.target.y();
                      const updatedFigures = figures.slice();
                      updatedFigures[i] = {
                        ...shape,
                        x,
                        y,
                        innerRect: { ...shape.innerRect, x: x + 10, y: y + 10 },
                      };
                      setFigures(updatedFigures);
                    }}
                  />
                  <Rect {...shape.innerRect} />
                </Group>
              );
            }
            return null;
          })}

          {texts.map((text, i) => (
            <Text
              key={i}
              {...text}
              draggable
              onClick={() => selectShape(text.id)}
              onDragEnd={(e) => {
                const updatedTexts = texts.slice();
                updatedTexts[i] = { ...text, x: e.target.x(), y: e.target.y() };
                setTexts(updatedTexts);
              }}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
);

export default KonvaStage;
