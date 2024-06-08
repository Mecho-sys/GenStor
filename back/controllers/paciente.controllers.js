import { getPacientes, addPaciente } from "../models/paciente.models.js";

export const checkPacientesToGet = async (req, res, next) => {
  try {
    const familias = await getPacientes();
    return res.json({
      message: "Pacientes obtenidos exitosamente",
      data: familias,
    });
  } catch (error) {
    console.error("Error al obtener los Pacientes:", error);
    return res.status(500).json({
      message: "Error al obtener los Pacientes",
      error: error.message,
    });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const paciente = req.body;
    const result = await addPaciente(paciente);
    return res.json({
      message: "Paciente agregado exitosamente",
      data: result,
    });
  } catch (error) {
    console.error("Error al agregar el paciente:", error);
    return res.status(500).json({
      message: "Error al agregar el paciente",
      error: error.message,
    });
  }
};
