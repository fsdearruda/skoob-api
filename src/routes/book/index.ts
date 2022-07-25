import { Router } from "express";
import { getBookById } from "../../controllers/books";
const router = Router();

type Query = {
  tag: string | undefined;
};

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { tag } = req.query as Query;
  if (!id) return res.status(400).send("Bad request");
  try {
    const book = await getBookById(id);
    if (!tag) return res.status(200).json(book);
    return res.status(200).json({
      ...book,
      amazon_url: `${book.amazon_url}?tag=${tag}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

export default router;
