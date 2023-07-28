import {
  createPostService,
  findPostsByUserIdService,
  searchByTitleService,
  topNewsService,
  updatePostService,
} from "../services/news.service.js";

export const createPostController = async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  try {
    await createPostService(body, userId);
    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAllPostController = async (req, res) => {
  let { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const news = await findAllPostService(offset, limit, currentUrl);
    res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const topNewsController = async (req, res) => {
  try {
    const post = await topNewsService();
    res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const findByIdPostController = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await findByIdPostService(id);
    return res.send(news);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

export const searchByTitleController = async (req, res) => {
  const { title } = req.query;

  try {
    const news = await searchByTitleService(title);
    return res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const findPostsByUserIdController = async (req, res) => {
  const id = req.userId;

  try {
    const news = await findPostsByUserIdService(id);

    return res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const updatePostController = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const userId = req.userId;

  try {
    const news = await updatePostService(body, id, userId);
    return res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};


export const deletePostController = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.deletePostService(id, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export const likePostController = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await postService.likePostService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export const commentPostController = async (req, res) => {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await postService.commentPostService(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export const commentDeletePostController= async (req, res) => {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await postService.commentDeletePostService(postId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

