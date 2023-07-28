import {
  commentsDeleteRepository,
  commentsRepository,
  countNews,
  createPostRepository,
  deletePostRepository,
  findByIdPostRepository,
  findPostsByUserIdRepository,
  likesDeletePostRepository,
  searchPostRepository,
  topNewsRepository,
  updatePostRepository,
} from "../repositories/news.repositories.js";

export const createPostService = async (body, userId) => {
  const { title, text, banner } = body;

  if (!title || !banner || !text)
    throw new Error("Submit all fields for registration");

  const { id } = await createPostRepository(title, banner, text, userId);

  return {
    message: "Post created successfully!",
    post: { id, title, banner, text },
  };
};

export const findAllPostService = async (offset, limit, currentUrl) => {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const news = await findAllPostService(offset, limit);
  const total = await countNews();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  if (news.length === 0) throw new Error("There are no registered news");

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: news.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  };
};

export const topNewsService = async () => {
  const news = await topNewsRepository();

  if (!news) throw new Error("There is no registered post");

  return {
    news: {
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      userAvatar: news.user.avatar,
    },
  };
};

export const findByIdPostService = async (id) => {
  const news = await findByIdPostRepository(id);

  if (!news) throw new Error("Post not found");

  return {
    news: {
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      userAvatar: news.user.avatar,
    },
  };
};

export const searchByTitleService = async (title) => {
  const news = await searchPostRepository(title);

  if (news.length === 0) throw new Error("There are no news with this title");

  return {
    results: news.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  };
};

export const findPostsByUserIdService = async (id) => {
  const news = await findPostsByUserIdRepository(id);

  return res.send({
    postsByUser: news.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  });
};

export const updatePostService = async (body, id, userId) => {
  const { title, text, banner } = body;

  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the News");

  const news = await findByIdService(id);

  if (String(news.user._id) !== userId)
    throw new Error("You didn't update this News");

  await updatePostRepository(id, title, text, banner);

  return { message: "News successfully updated!" };
};

export const deletePostService = async (id, userId) => {
  const post = await findPostsByUserIdService(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await deletePostRepository(id);
}

export const likePostService = async (id, userId) => {
  const postLiked = await likePostService(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await likesDeletePostRepository(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

export const commentPostService = async (postId, message, userId) => {
  if (!message) throw new Error("Write a message to comment");

  const post = await findPostsByUserIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await commentsRepository(postId, message, userId);
}

export const commentDeletePostService = async (postId, userId, idComment) => {
  const post = await findPostsByUserIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await commentsDeleteRepository(postId, userId, idComment);
}
