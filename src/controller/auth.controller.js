import authService from "../services/auth.service.js"

export const loginController = async (req, res) => {
  const body = req.body;

try {
  const token = await authService.loginService(body)
  return res.send({token: token})
} catch (e) {
  res.status(500).send(e.message)
}
}