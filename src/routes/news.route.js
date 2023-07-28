import { commentDeletePostController, commentPostController, createPostController, deletePostController, findAllPostController, findPostsByUserIdController, likePostController, searchByTitleController, topNewsController, updatePostController } from "../controller/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const postRouter = Router();

postRouter.get("/", findAllPostController);
postRouter.get("/top", topNewsController);
postRouter.get("/search", searchByTitleController);

postRouter.use(authMiddleware);
postRouter.post("/create", createPostController);

postRouter.use(validId);
postRouter.get("/byIdPost/:id", findPostsByUserIdController);
postRouter.get("/byUserId", findPostsByUserIdController);
postRouter.patch("/update/:id", updatePostController);
postRouter.delete("/delete/:id", deletePostController);
postRouter.patch("/:id/like", likePostController);
postRouter.patch("/:id/comment", commentPostController);
postRouter.patch(
  "/:id/:idComment/comment",
  commentDeletePostController
);

export default postRouter;