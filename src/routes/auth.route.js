import { Router } from "express";
const router = Router();

import { login } from "../controller/auth.controller.js";

router.post("/", login);

export default router;