import { Router } from "express";
import { getBooksByTitle } from "../controllers";
const router = Router();

router.get("/books/:title", async (req, res) => {
  const { title } = req.params;
  const { limit } = req.query as { limit?: number; tag?: string };
  if (!title.trim())
    return res.status(400).send({
      error: "Título não informado.",
    });
  const book = await getBooksByTitle(title, limit);
  res.status(200).json(book);
});

export default router;
