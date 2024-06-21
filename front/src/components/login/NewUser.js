// NewUser.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const NewUser = ({ open, onClose }) => {
  console.log("Dialog open:", open);

  const [formData, setFormData] = useState({
    Nombre: "",
    Correo: "",
    Clave: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      Nombre: formData.Nombre,
      Correo: formData.Correo,
      Clave: formData.Clave,
    };
    console.log(dataToSend);
    /*
    axios
      .post("http://${servidorWeb}:8080/api/newUser", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });*/
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear nueva cuenta</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Nombre"
            label="Nombre"
            name="Nombre"
            autoComplete="Nombre"
            autoFocus
            value={formData.Nombre}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Correo"
            label="Correo Electrónico"
            name="Correo"
            autoComplete="Correo"
            value={formData.Correo}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Clave"
            label="Contraseña"
            type="password"
            id="Clave"
            autoComplete="contraseña"
            value={formData.Clave}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Crear cuenta
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUser;
