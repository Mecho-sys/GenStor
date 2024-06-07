import {
  checkProyectToCreate,
  checkProyectsToGet,
  checkProyectToDelete,
  checkProyectToEdit,
} from "../controllers/proyecto.controllers.js";

async function addProyect(req, res, next) {
  const proyect = req.body;
  await checkProyectToCreate(proyect, res);
}

async function getProyects(req, res, next) {
  await checkProyectsToGet(res);
}

async function deleteProyect(req, res, next) {
  console.log("Entro en midleware de delete");
  const proyectId = req.body.id;
  await checkProyectToDelete(proyectId, res);
}

async function editProyect(req, res, next) {
  const { id, data } = req.body;
  await checkProyectToEdit(id, data, res);
}

export { addProyect, getProyects, deleteProyect, editProyect };
