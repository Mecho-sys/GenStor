import { createProyect } from "../models/proyecto.models.js";

async function checkProyectToCreate(proyect, res) {
  try {
    const result = await createProyect(proyect);
    return res.json({ message: "Proyecto creado exitosamente", data: result });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return res
      .status(500)
      .json({
        message: "Proyecto no creado exitosamente",
        error: error.message,
      });
  }
}

export { checkProyectToCreate };
