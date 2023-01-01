import axios from "axios";
import * as cheerio from "cheerio";
import { WithId } from "mongodb";

import connect from "../utils/connect";

/** Retorna todas as páginas html de reviews de um usuário específico. */
async function fetchPages(userId: string): Promise<any[]> {
  const page = await axios.get(`https://www.skoob.com.br/estante/resenhas/${userId}`, { responseEncoding: "binary" });
  const $ = cheerio.load(page.data.toString("ISO-8859-1"));
  const pageCount = Math.ceil(parseInt($(".contador").children().first().text().split(" ")[0]) / 5);
  if (!pageCount) return [page.data];
  let pages = new Array(pageCount).fill(null);
  return await Promise.all(
    pages.map(async (page, index) => {
      let response = await axios.get(`https://www.skoob.com.br/estante/resenhas/${userId}/mpage:${index + 1}`, { responseEncoding: "binary" });
      return response.data;
    })
  );
}

/**  Retorna todas as reviews de um usuário específico. */
async function getUserReviews(userId: string): Promise<Review[] | null> {
  const reviews: Review[] = [];
  const pages = await fetchPages(userId);
  pages.forEach((page: any) => {
    const $ = cheerio.load(page, { decodeEntities: false });
    const bookId = $("a.l15").attr("href")?.split("/")[2];
    $("div.curva2-5").each((i, el) => {
      const element = $(el);
      if (element.children().length === 1) {
        const author = element
          .first()
          .find("strong")
          .text()
          .split(/(?=[A-Z])/)[0];

        let title: string[] | string = element.first().find("strong").text();
        const date = element.first().find("span").text().trim();
        const reviewContent = element.first().contents().text();
        if (title) title = title.split(author)[1];
        // o formato de date é "dd/mm/yyyy". Provavelmente seria melhor trocar para uma Date do Javascript.

        const review: Review = {
          author_id: userId,
          book_id: bookId!,
          author: author.trim(),
          title: title ?? null,
          date,
          body: title ? reviewContent.split(date)[1].trim().split(title)[1] : reviewContent.split(date)[1].trim() + "",
          rating: parseInt($(element).parent().find("star-rating").attr("rate")!),
          profilePicture: $(page).find(".round-4").find("img").attr("src") ?? null,
        };
        reviews.push(review);
      }
    });
  });
  if (reviews.length === 0) return null;
  // por algum motivo as reviews estão sendo retornadas com _id, o que não deveria acontecer
  const db = await connect();
  await db.collection<Review>("reviews").insertMany(reviews);
  return reviews;
}
/** Retorna todas as reviews (salvas no banco de dados) de um livro  */
async function getBookReviews(bookId: string): Promise<Review[] | null> {
  const db = await connect();
  const reviews = await db.collection<Review>("reviews").find({ book_id: bookId }).toArray();
  const withoutIdReviews = reviews.map((review: WithId<Review>): Review => {
    const { _id, ...withoutId } = review;
    return withoutId;
  });
  return withoutIdReviews.length === 0 ? null : withoutIdReviews;
}

export { getUserReviews, getBookReviews };
