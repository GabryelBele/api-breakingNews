import userRepositories from "../repositories/user.repositories.js";
import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";

const createUserService = async (body) => {
  const { name, username, email, password, avatar, background } = body;

  if (!username || !name || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

  const foundUser = await userRepositories.findByEmailUserRepository(email);

  if (foundUser) throw new Error("User already exist");

  const user = await userRepositories.createUserRepository(body);

  if (!user) throw new Error("Error Creating User");

  const token = authService.generateToken(user.id);

  return {
    message: "User created",
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
      background,
    },
    token,
  };
};

const findAllUserService = async () => {
  const users = await userRepositories.findAllUserRepository();

  if (users.length === 0) throw new Error("There are no registered users");

  return users;
};

const findUserByIdService = async(userIdParam, userIdLogged) => {
  let idParam;
  if (!userIdParam) {
    userIdParam = userIdLogged;
    idParam = userIdParam;
  } else {
    idParam = userIdParam;
  }
  if (!idParam)
    throw new Error("Send an id in the parameters to search for the user");

  const user = await userRepositories.findByIdUserRepository(idParam);

  if (!user) throw new Error("User not found");

  return user;
}


const updateUserService = async (body, userId) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error("Submit at least one field to update the user");

  const user = await userRepositories.findByIdUserRepository(userId);

  if (!user) throw new Error("Nonexistent user");

  if (user._id !== userId) throw new Error("You cannot update this user");

  if (password) password = await bcrypt.hash(password, 10);

  await userRepositories.updateUserRepository(
    userId,
    body
  );

  return res.send({ message: "User successfully updated!" });
};

export default {
  createUserService,
  findAllUserService,
  findUserByIdService,
  updateUserService,
};
