import {
  checkPacientesToGet,
  createPaciente,
} from "../controllers/paciente.controllers.js";

async function getPacientes(req, res, next) {
  await checkPacientesToGet(req, res, next);
}

async function addPacienteMiddleware(req, res, next) {
  await createPaciente(req, res, next);
}

export { getPacientes, addPacienteMiddleware };
