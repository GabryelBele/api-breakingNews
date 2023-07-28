import authService from "../services/auth.service.js"

export const loginController = async (req, res) => {
  const body = req.body;

try {
  const response = await authService.loginService(body)
  return res.send(response)
} catch (e) {
  res.status(500).send(e.message)
}
}