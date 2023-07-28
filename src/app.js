import express from "express";
import cors from "cors";
import connectDatabase from "./database/db.js";
import "dotenv/config";
import router from "./routes/index.js";

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
