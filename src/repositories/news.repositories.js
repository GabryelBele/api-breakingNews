import News from "../models/News.js";

export const createPostRepository = async (title, banner, text, userId) => {
  return await News.create({ title, banner, text, user: userId });
};

export const findAllPostsRepository = async (offset, limit) => {
  return await News.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
};

export const countNews = async () => await News.countDocuments();

export const topNewsRepository = async () => {
  return await News.findOne().sort({ _id: -1 }).populate("user");
}
export const searchPostRepository = async (title) => {
  return await News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
};

export const findPostByIdRepository = async (id) =>
  await News.findById(id).populate("User");

export const findPostsByUserIdRepository = async (id) => {
  return await News.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
};

export const updatePostRepository = async (id, title, banner, text) => {
  return await News.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    }
  );
};


export const deletePostRepository = async (id) => {
    return await News.findOneAndDelete({ _id: id });
  }
  
 export const likesRepository = (id, userId) => {
    return News.findOneAndUpdate(
      {
        _id: id,
        "likes.userId": { $nin: [userId] },
      },
      {
        $push: {
          likes: { userId, created: new Date() },
        },
      },
      {
        rawResult: true,
      }
    );
  }
  
 export const likesDeletePostRepository = async (id, userId) => {
    return await News.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          likes: {
            userId: userId,
          },
        },
      }
    );
  }
  
 export const commentsRepository = async (id, message, userId) => {
    let idComment = Math.floor(Date.now() * Math.random()).toString(36);
    return await News.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          comments: { idComment, userId, message, createdAt: new Date() },
        },
      },
      {
        rawResult: true,
      }
    );
  }
  
 export const commentsDeleteRepository = async (id, userId, idComment) => {
    return News.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          comments: {
            idComment: idComment,
            userId: userId,
          },
        },
      }
    );
  }