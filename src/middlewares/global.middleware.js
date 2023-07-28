import mongoose from "mongoose";

export const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid id!" });
  }
  next();
};
