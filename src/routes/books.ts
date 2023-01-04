import { WithId } from "mongodb";
import { Router, Response } from "express";
import { getBookById } from "../controllers";
import { getAmazonUrl, getBookPrice } from "../utils/amazon";

const router = Router();

router.get("/:id", async (req, res: Response<ErrorMessage | Book>) => {
  const { id } = req.params as { id: string };

  if (!id) return res.status(400).send({ error: "Id não informado." });
  try {
    const book = await getBookById(id);
    if (!book) return res.status(404).send({ error: "Id inválido." });
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});

type PriceResponse = {
  price: number | null;
  amazon_url: string | null;
};

router.get("/:id/price", async (req, res: Response<ErrorMessage | PriceResponse>) => {
  const { id } = req.params;
  const { tag } = req.query as { tag: string };
  if (!id) return res.status(400).send({ error: "Id não informado." });
  try {
    const book: Book = await getBookById(id);
    if (!book) return res.status(404).send({ error: "Id inválido." });
    const { isbn_13 } = book;
    if (!isbn_13) return res.status(404).send({ error: "Não foi possível encontrar o preço do livro." });
    let amazonURL = await getAmazonUrl(isbn_13);
    const price = await getBookPrice(amazonURL);
    if (amazonURL && tag) amazonURL += `?tag=${tag}`;
    return res.status(200).send({ price, amazon_url: amazonURL });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});

export default router;
