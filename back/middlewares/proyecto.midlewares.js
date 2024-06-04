import {
  checkProyectToCreate,
  checkProyectsToGet,
} from "../controllers/proyecto.controllers.js";

async function addProyect(req, res, next) {
  const proyect = req.body;
  console.log("Proyecto", proyect);
  await checkProyectToCreate(proyect, res);
}

async function getProyects(req, res, next) {
  await checkProyectsToGet(res);
}

export { addProyect, getProyects };
