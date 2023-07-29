import { Router } from "express";
import userController from "../controller/user.controller.js";
import { validId } from "../middlewares/global.middleware.js";

const userRoute = Router();

userRoute.post("/", userController.createUserController);
userRoute.get("/", userController.findAllUserController);
userRoute.get("/:id", validId, userController.findByIdUserController);
userRoute.patch("/:id", validId, userController.updateUserController);

export default userRoute;