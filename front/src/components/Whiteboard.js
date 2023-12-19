import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";

const Sidebar = ({ onShapeClick }) => {
  return (
    <div
      style={{ float: "left", marginRight: "10px", border: "1px solid red" }}
    >
      <div
        onClick={() => onShapeClick("rect")}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "white",
          border: "1px solid black",
          marginBottom: "10px",
        }}
      ></div>
      <div
        onClick={() => onShapeClick("circle")}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "1px solid black",
        }}
      ></div>
    </div>
  );
};

const CustomComponent = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);

  const handleShapeClick = (shapeType) => {
    const newShape = {
      type: shapeType,
      id: shapes.length + 1,
      x: 50,
      y: 50,
    };

    setShapes([...shapes, newShape]);
    setSelectedShapeId(newShape.id);
  };

  const handleDragEnd = (e) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === e.target.id()
          ? { ...shape, x: e.target.x(), y: e.target.y() }
          : shape
      )
    );
  };

  const handleTransformEnd = (e) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === e.target.id()
          ? {
              ...shape,
              x: e.target.x(),
              y: e.target.y(),
              scaleX: e.target.scaleX(),
              scaleY: e.target.scaleY(),
            }
          : shape
      )
    );
  };

  return (
    <div>
      {/* Barra lateral */}
      <Sidebar onShapeClick={handleShapeClick} />

      {/* Canvas con Konva */}
      <div style={{ marginLeft: "70px" }}>
        <Stage width={500} height={500} style={{ border: "1px solid red" }}>
          <Layer>
            {/* Figuras en el Layer */}
            {shapes.map((shape) => (
              <React.Fragment key={shape.id}>
                {shape.type === "rect" && (
                  <Rect
                    x={shape.x}
                    y={shape.y}
                    width={50}
                    height={50}
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                    draggable
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                    id={shape.id}
                    isSelected={shape.id === selectedShapeId}
                  />
                )}
                {shape.type === "circle" && (
                  <Circle
                    x={shape.x}
                    y={shape.y}
                    radius={25}
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                    draggable
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                    id={shape.id}
                    isSelected={shape.id === selectedShapeId}
                  />
                )}
                {shape.id === selectedShapeId && (
                  <Transformer
                    anchorSize={6}
                    borderDash={[3, 3]}
                    borderEnabled
                    boundBoxFunc={(oldBox, newBox) => {
                      // Limitar la escala mínima
                      if (newBox.width < 10 || newBox.height < 10) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                    rotateEnabled={false} // Desactivar rotación si es necesario
                    key={`transformer-${shape.id}`}
                  />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CustomComponent;
