// index.js

import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

dotenv.config();

connectDatabase();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/doc', swaggerRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
