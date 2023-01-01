import { Response, Router } from "express";
import { getBookReviews, getUserReviews } from "../controllers";
const router = Router();

router.get("/users/:id", async (req, res: Response<Review[] | ErrorMessage>) => {
  const { id } = req.params as { id: string };
  if (!id) return res.status(400).send({ error: "Id do usuário não informado" });
  try {
    const reviews = await getUserReviews(id);
    if (!reviews) return res.status(200).json({ error: "Usuário não possui reviews" });
    return res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/books/:id", async (req, res: Response<Review[] | ErrorMessage>) => {
  const { id } = req.params as { id: string };
  if (!id) return res.status(400).json({ error: "Id do livro não informado" });
  try {
    const reviews = await getBookReviews(id);
    if (!reviews) return res.status(200).json({ error: "Livro não possui reviews" });
    return res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
