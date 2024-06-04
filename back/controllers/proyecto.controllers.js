import { createProyect, getProyects } from "../models/proyecto.models.js";

async function checkProyectToCreate(proyect, res) {
  try {
    const result = await createProyect(proyect);
    return res.json({ message: "Proyecto creado exitosamente", data: result });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return res.status(500).json({
      message: "Proyecto no creado exitosamente",
      error: error.message,
    });
  }
}

export const checkProyectsToGet = async (res) => {
  try {
    const projects = await getProyects();
    return res.json({
      message: "Proyectos obtenidos exitosamente",
      data: projects,
    });
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return res.status(500).json({
      message: "Error al obtener los proyectos",
      error: error.message,
    });
  }
};

export { checkProyectToCreate };
