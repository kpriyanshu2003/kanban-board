import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import compress from "compression";
import mongoose from "mongoose";
import express, { Application, Request, Response } from "express";

import routes from "./src/routes/index.routes";
import { ApiResponse } from "./src/utils/ApiResponse";

config();
const port = process.env.PORT || 3300;
const mongo_uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/express-mongo";
const app: Application = express();
const corsConfig = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(compress());
app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((req: Request, res: Response) =>
  res.send(new ApiResponse(200, "Api is running..."))
);

mongoose
  .connect(mongo_uri)
  .then(() =>
    app.listen(port, () => console.info(`Server is running on port ${port}`))
  )
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
