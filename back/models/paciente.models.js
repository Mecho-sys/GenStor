import { createConnection } from "../data-base/mysql.js";

export const getPacientes = async () => {
  let connection;
  try {
    connection = await createConnection();
    const [rows, fields] = await connection.query("SELECT * FROM pacientes");
    return rows;
  } catch (err) {
    console.error("Error fetching pacientes:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
      console.log("Closed the database connection.");
    }
  }
};

export const addPaciente = async (paciente) => {
  let connection;
  try {
    connection = await createConnection();
    const sql = `
        INSERT INTO pacientes (
          rut, nombre, apaterno, amaterno, sexo, fnacimiento, edad, 
          establecimiento, parentesco, ecivil, escolaridad, profesion, 
          prevision, nacionalidad, poriginario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [
      paciente.rut,
      paciente.nombre,
      paciente.apaterno,
      paciente.amaterno,
      paciente.sexo,
      paciente.fnacimiento,
      paciente.edad,
      paciente.establecimiento,
      paciente.parentesco,
      paciente.ecivil,
      paciente.escolaridad,
      paciente.profesion,
      paciente.prevision,
      paciente.nacionalidad,
      paciente.poriginario,
    ];
    const [result] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.error("Error adding paciente:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
      console.log("Closed the database connection.");
    }
  }
};
