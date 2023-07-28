import { Router } from "express";
import { loginController } from "../controller/auth.controller.js";

const authRoute = Router();

authRoute.post("/", loginController);

export default authRoute;