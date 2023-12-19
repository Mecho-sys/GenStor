import React from "react";
import { ImageList, ImageListItem, ImageListItemBar, Box } from "@mui/material";

import "./compStyle.css";

const Gallery = ({ images, onDragStart }) => {
  return (
    <Box>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item.img} sx={{ position: "relative" }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
            />
            <ImageListItemBar
              position="below"
              title={item.title}
              //subtitle={item.author}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Gallery;
