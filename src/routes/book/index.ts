import { Router, Response } from "express";

import { getBookById } from "../../controllers";
import { Book } from "../../@types";

import { getAmazonUrl, getBookPrice } from "../../utils/amazon";
import { WithId } from "mongodb";

const router = Router();

type Error = {
  error: string;
};

router.get("/:id", async (req, res: Response<Error | Book>) => {
  const { id } = req.params;

  if (!id) return res.status(400).send({ error: "Id do livro não informado" });
  try {
    const book = (await getBookById(id)) as WithId<Book>;
    const { _id, ...bookWithoutId } = book;
    if (!bookWithoutId) return res.status(404).send({ error: "Id inválido" });
    return res.status(200).send(bookWithoutId);
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

type Query = {
  tag: string;
};

router.get("/:id/price", async (req, res: Response<Error | PriceResponse>) => {
  const { id } = req.params;
  const { tag } = req.query as Query;
  if (!id) return res.status(400).send({ error: "Id do livro não informado" });
  try {
    const book: Book = await getBookById(id);
    if (!book) return res.status(404).send({ error: "Id inválido" });
    const { isbn_13 } = book;
    if (!isbn_13) return res.status(404).send({ error: "ISBN não encontrado" });
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
