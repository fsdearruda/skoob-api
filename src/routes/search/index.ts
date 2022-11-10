import { Router } from "express";
import { getBooksByTitle } from "../../controllers";
const router = Router();

type Query = {
  limit: number | undefined;
  tag: string | undefined;
};

router.get("/books/:title", async (req, res) => {
  const { title } = req.params;
  const { limit } = req.query as Query;
  if (!title)
    return res.status(400).send({
      error: "Título não informado",
    });
  const book = await getBooksByTitle(title, limit);
  res.status(200).json(book);
});

export default router;
