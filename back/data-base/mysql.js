import mysql from "mysql2/promise";
import { config } from "dotenv";
config({ path: "../.env" });

export async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        throw err;
      }
      console.log("Connected to MySQL");
    });
    return connection;
  } catch (error) {
    console.error("Error creating connection:", error);
    return error;
  }
}
