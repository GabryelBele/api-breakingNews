import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({ email: email });

const createUserRepository = (body) => User.create(body);

const findAllUserRepository = () => User.find();

const findByIdUserRepository = (userId) => User.findById(userId);
createUserRepository;
const updateUserRepository = (
  userId,
  name,
  username,
  email,
  password,
  avatar,
  background  
) =>
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
    {
      rawResult: true,
    }
  );

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
};
