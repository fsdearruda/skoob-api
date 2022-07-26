import { Router, Response } from "express";
import { getUserById } from "../../controllers";

import { User } from "../../@types";

const router = Router();

type Error = {
  error: string;
};

router.get("/:id", async (req, res: Response<Error | User>) => {
  const { id } = req.params;
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

export default router;
