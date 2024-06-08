import { getFamilias } from "../models/familia.models.js";

export const checkFamiliasToGet = async (req, res, next) => {
  try {
    const familias = await getFamilias();
    return res.json({
      message: "Familias obtenidas exitosamente",
      data: familias,
    });
  } catch (error) {
    console.error("Error al obtener las Familias:", error);
    return res.status(500).json({
      message: "Error al obtener las Familias",
      error: error.message,
    });
  }
};
