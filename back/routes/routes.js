import {
  addProyect,
  getProyects,
  deleteProyect,
  editProyect,
} from "../middlewares/proyecto.middlewares.js";
import { getFamilias } from "../middlewares/familia.middlewares.js";
import {
  getPacientes,
  addPacienteMiddleware,
} from "../middlewares/paciente.middlewares.js";

export default function routes(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/getProyects", (req, res) => {
    return getProyects(req, res);
  });

  app.post("/addProyect", async (req, res) => {
    return addProyect(req, res);
  });

  app.post("/deleteProyect", async (req, res) => {
    return deleteProyect(req, res);
  });

  app.post("/editProyect", async (req, res) => {
    return editProyect(req, res);
  });

  app.get("/getFamilias", async (req, res, next) => {
    return getFamilias(req, res, next);
  });

  app.get("/getPacientes", async (req, res, next) => {
    return getPacientes(req, res, next);
  });

  app.post("/addPaciente", async (req, res, next) => {
    return addPacienteMiddleware(req, res, next);
  });
}
