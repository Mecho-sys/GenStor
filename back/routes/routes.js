import express from "express";
import { addProyect } from "../middlewares/proyecto.midlewares";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/addProyect", async (req, res) => {
  return addProyect(req, res);
});

export default router;
