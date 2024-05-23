import addProyect from "../middlewares/proyecto.midlewares.js"

export default function routes(app){
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/test", (req, res) => {
    res.send("PUTAMADRESIIIIIIIIIIII");
  });

  app.post("/addProyect", async (req, res) => {
    return addProyect(req, res);
  });

}
