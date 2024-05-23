import { checkProyectToCreate } from "../controllers/proyecto.controllers";

async function addProyect(req, res, next) {
  const proyect = req.body;
  console.log("Proyecto", proyect);
  await checkProyectToCreate(proyect, res);
}

export { addProyect };
