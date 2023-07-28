import authRepositories from "../repositories/auth.repositories.js";

export const loginController = async (req, res) => {
  const body = req.body;

try {
  const response = await authRepositories.loginService(body)
  return res.send(response)
} catch (e) {
  res.status(500).send(e.message)
}
}