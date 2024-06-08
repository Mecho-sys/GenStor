import { checkFamiliasToGet } from "../controllers/familia.controllers.js";

async function getFamilias(req, res, next) {
  await checkFamiliasToGet(req, res, next);
}

export { getFamilias };
