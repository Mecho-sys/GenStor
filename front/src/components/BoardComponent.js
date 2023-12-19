import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const imageRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([imageRef.current]);
      const layer = trRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [isSelected, image]);

  const handleDragEnd = (e) => {
    onChange({
      ...image,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransform = () => {
    const node = imageRef.current;

    onChange({
      ...image,
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
      rotation: node.rotation(),
    });
  };

  return (
    <React.Fragment>
      <Image
        image={img}
        {...image}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        ref={imageRef}
        onTransform={handleTransform}
        onTransformEnd={handleTransform}
        rotation={image.rotation}
      />
      {isSelected && (
        <Transformer
          ref={(node) => {
            imageRef.current.transformer = node;
          }}
          enabledAnchors={["middle-left", "middle-right", "bottom-center"]}
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
const BoardComponent = ({ images, setImages, stageRef }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [textToAdd, setTextToAdd] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);

    if (textToAdd) {
      setImages((prevImages) => [
        ...prevImages,
        {
          x: stageRef.current.width() / 2,
          y: stageRef.current.height() / 2,
          text: textToAdd,
          id: `text-${prevImages.length + 1}`,
          isText: true,
        },
      ]);
      setTextToAdd(null);
    } else {
      const imageUrl = e.dataTransfer.getData("URL");

      setImages((prevImages) => [
        ...prevImages,
        {
          ...stageRef.current.getPointerPosition(),
          src: imageUrl,
          id: `image-${prevImages.length + 1}`,
        },
      ]);
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Stage
        width={window.innerWidth * 0.8}
        height={window.innerHeight}
        style={{ border: "1px solid grey" }}
        ref={stageRef}
      >
        <Layer>
          {images.map((image) => (
            <URLImage
              key={image.id}
              image={image}
              isSelected={image.id === selectedId}
              onSelect={() => handleSelect(image.id)}
              onChange={(newAttrs) => {
                const newImages = images.map((img) =>
                  img.id === image.id ? { ...img, ...newAttrs } : img
                );
                setImages(newImages);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default BoardComponent;
