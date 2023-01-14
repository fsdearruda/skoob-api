import { WithId } from "mongodb";
import { Router, Response } from "express";
import { getBookById } from "../controllers";
import { getAmazonUrl, getBookPrice } from "../utils/amazon";
import { updateBook } from "../controllers/books";

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
  ttl: number; // timestamp
};

router.get("/:id/price", async (req, res: Response<ErrorMessage | PriceResponse>) => {
  const { id } = req.params;
  const { tag } = req.query as { tag: string };
  if (!id) return res.status(400).send({ error: "Id não informado." });
  try {
    const book: Book = await getBookById(id);
    if (!book) return res.status(404).send({ error: "Id inválido." });
    if (!book.isbn_13) return res.status(404).send({ error: "Não foi possível encontrar o preço do livro." });
    if (book.amazon_info && book.amazon_info.ttl >= Date.now()) return res.status(200).send(book.amazon_info); // cache

    let amazonURL = await getAmazonUrl(book.isbn_13);
    const price = await getBookPrice(amazonURL);
    const ttl = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
    if (amazonURL && tag) amazonURL += `?tag=${tag}`;
    updateBook(id, { ...book, amazon_info: { price, amazon_url: amazonURL, ttl, in_stock: price ? true : false } });
    return res.status(200).send({ price, ttl, amazon_url: amazonURL });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});

export default router;
