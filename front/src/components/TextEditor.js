import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PaletteIcon from "@mui/icons-material/Palette";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const TextEditor = ({ onAddText }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");

  const handleFontSizeIncrease = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const handleFontSizeDecrease = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 10));
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleAddText = () => {
    onAddText("Texto de ejemplo");
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <Button variant="text" sx={{ margin: "8px 0" }} onClick={handleAddText}>
        <Typography
          variant="body1"
          sx={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            color: textColor,
          }}
        >
          Añadir texto
        </Typography>
      </Button>

      <IconButton>
        <PaletteIcon />
      </IconButton>

      <IconButton onClick={handleFontSizeDecrease}>
        <RemoveIcon />
      </IconButton>

      <IconButton onClick={handleFontSizeIncrease}>
        <AddIcon />
      </IconButton>

      <FormControl sx={{ margin: "4px 0" }} size="small">
        <Select
          labelId="font-family-label"
          id="font-family"
          value={fontFamily}
          onChange={handleFontFamilyChange}
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          <MenuItem value="Courier New">Courier New</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ margin: "4px 0" }} size="small">
        <Select
          labelId="text-color-label"
          id="text-color"
          value={textColor}
          onChange={handleTextColorChange}
        >
          <MenuItem value="#000000">Negro</MenuItem>
          <MenuItem value="#FF0000">Rojo</MenuItem>
          <MenuItem value="#00FF00">Verde</MenuItem>
          <MenuItem value="#0000FF">Azul</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TextEditor;
