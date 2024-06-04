import { addProyect, getProyects } from "../middlewares/proyecto.midlewares.js";

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
}
