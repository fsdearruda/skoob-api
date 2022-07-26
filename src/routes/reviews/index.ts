import { Response, Router } from "express";
import { Review } from "../../@types";
import { getReviews } from "../../controllers";
const router = Router();

type ErrorMessage = {
  error: string;
};

router.get("/book/:id", (req, res: Response<Review[] | ErrorMessage>) => {
  res.status(200).json({
    error: "Essa rota ainda não foi implementada",
  });
});

router.get("/user/:id", async (req, res: Response<Review[] | ErrorMessage>) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: "Id do usuário não informado" });
  try {
    const reviews = await getReviews(id);
    if (!reviews) return res.status(200).json({ error: "Usuário não possui reviews" });
    return res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
