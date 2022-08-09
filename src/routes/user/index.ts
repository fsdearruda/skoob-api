import { Router, Response } from "express";
import { getUserById, getBookshelf } from "../../controllers";
import { User, Bookshelf } from "../../@types";

const router = Router();

type ErrorMessage = {
  error: string;
};

router.get("/:id", async (req, res: Response<ErrorMessage | User>) => {
  const { id } = req.params as { id: string };
  if (!id) return res.status(400).send({ error: "Id não de usuário informado" });
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});

router.get("/:id/bookshelf", async (req, res: Response<ErrorMessage | Bookshelf>) => {
  const { id } = req.params as { id: string };
  if (!id) return res.status(400).json({ error: "Id de usuário não informado" });

  const bookshelf = await getBookshelf(id);
  if (!bookshelf) return res.status(404).json({ error: "Usuário não encontrado" });
  return res.status(200).json(bookshelf);
});

export default router;
