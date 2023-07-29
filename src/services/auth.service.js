import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";
import authRepositories from "../repositories/auth.repositories.js";

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });


const loginService = async (body) => {
  const { email, password } = body;

  if (!email || !password) throw new Error("Wrong password or username");


  const user = await authRepositories.loginRepository(email);

  if (!user) throw new Error("Wrong password or username");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(user.id);

  return token;
};

export default { loginService, generateToken };
