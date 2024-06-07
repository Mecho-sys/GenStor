import {
  createProyect,
  getProyects,
  deleteProyectById,
  updateProyectById,
} from "../models/proyecto.models.js";

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

async function checkProyectToDelete(proyectId, res) {
  console.log("Entro en controller de delete");
  try {
    await deleteProyectById(proyectId);
    return res.json({ message: "Proyecto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return res.status(500).json({
      message: "Error al eliminar el proyecto",
      error: error.message,
    });
  }
}

async function checkProyectToEdit(id, data, res) {
  try {
    const updatedProyect = await updateProyectById(id, data);
    return res.json({
      message: "Proyecto actualizado exitosamente",
      data: updatedProyect,
    });
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    return res.status(500).json({
      message: "Error al actualizar el proyecto",
      error: error.message,
    });
  }
}

export { checkProyectToCreate, checkProyectToDelete, checkProyectToEdit };
