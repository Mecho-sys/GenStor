import { createConnection } from "../data-base/mysql.js";
const ENTITY_NAME = "familias";

export const getFamilias = async () => {
  let connection;
  try {
    connection = await createConnection();
    const [rows, fields] = await connection.query("SELECT * FROM familias");
    return rows;
  } catch (err) {
    console.error("Error fetching familias:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
      console.log("Closed the database connection.");
    }
  }
};
