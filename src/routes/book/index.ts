import { Router, Response } from "express";
import { getBookById } from "../../controllers";

import { Book } from "../../@types";

const router = Router();

type Query = {
  tag: string | undefined;
};
type Error = {
  error: string;
};

router.get("/:id", async (req, res: Response<Error | Book>) => {
  const { id } = req.params;
  const { tag } = req.query as Query;
  if (!id)
    return res.status(400).send({
      error: "Id do livro não informado",
    });
  try {
    const book = await getBookById(id);
    if (!tag) return res.status(200).json(book);
    return res.status(200).json({
      ...book,
      amazon_url: `${book.amazon_url}?tag=${tag}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});

export default router;
