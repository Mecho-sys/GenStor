import {
  addProyect,
  getProyects,
  deleteProyect,
  editProyect,
} from "../middlewares/proyecto.midlewares.js";

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
}
