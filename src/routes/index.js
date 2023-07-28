import { Router } from "express";

import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import swaggerRoute from "./swagger.route.cjs"
import newsRoute from "./news.route.js"


const router = Router()

router.use('/doc', swaggerRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/news', newsRoute);

export default router