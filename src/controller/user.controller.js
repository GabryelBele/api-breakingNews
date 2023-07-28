import userService from "../services/user.service.js";

const createUserController = async (req, res) => {
  const body = req.body;

  try {
    const user = await userService.createUserService(body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const findAllUserController = async (req, res) => {
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const findByIdUserController = async (req, res) => {
  const { id: userId } = req.params.id;
  const userIdLogged = req.userId;

  try {
    const user = userService.findUserByIdService(userId, userIdLogged);
    return res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateUserController = async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  try {
    const response = await userService.updateUserService(body, userId);
    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export default {
  createUserController,
  findAllUserController,
  findByIdUserController,
  updateUserController,
};
