import React from "react";

import Box from "@mui/material/Box";
import GenGallery from "./GenGallety";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }} p={4}>
      <GenGallery />
    </Box>
  );
}
