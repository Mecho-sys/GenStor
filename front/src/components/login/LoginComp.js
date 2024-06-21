import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

import NewUser from "./NewUser";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    //validacion por correo, y ver si la contraseña es la misma
    const loginData = {
      correo: email,
      clave: password,
    };

    console.log(loginData);
    navigate("/home");
    /*
    axios
      .post("http://${servidorWeb}:8080/api/validUser", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Si la validación es exitosa, redirige a la vista de Home
        if (response.data.message === "Inicio de sesión exitoso") {
          console.log("Inicio de sesión exitoso");
          navigate("/home");
        } else {
          console.log("Credenciales incorrectas");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
      */
  };

  const handleCreateAccount = () => {
    console.log("isDialogOpen before:", isDialogOpen);
    setDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen);
    console.log("isDialogOpen after:", isDialogOpen);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={{ backgroundColor: "#f50057" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginTop: 10 }}>
          Iniciar Sesión
        </Typography>
        <form style={{ width: "100%", marginTop: 10 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            component="button"
            variant="body2"
            onClick={handleCreateAccount}
          >
            Crear nueva cuenta
          </Link>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </form>

        <NewUser open={isDialogOpen} onClose={handleCloseDialog} />
      </Paper>
    </Container>
  );
};

export default Login;
