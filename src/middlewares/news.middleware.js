import newsService from "../services/news.service.js";

export const validNews = async (req,res,next) => {
    const id = req.params.id;

    const news = await newsService.findbyIdService(id)

    if (String(news.user._id) !== req.userId) {
      return res
        .status(400)
        .send({ message: "Você não pode fazer alterações neste post" });
    }

    next()
} 