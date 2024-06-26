import { config } from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
routes(app);

app.listen(PORT, () => {
  console.log(
    `Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`
  );
});
