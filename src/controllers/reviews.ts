import axios from "axios";
import * as cheerio from "cheerio";

import type { Review } from "../@types";

// Retorna todas as páginas html de reviews de um usuário específico.
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

// Retorna todas as reviews de um usuário específico.
async function getReviews(userId: string): Promise<Review[] | null> {
  const reviews: Review[] = [];
  const pages = await fetchPages(userId);
  pages.forEach((page: any) => {
    const $ = cheerio.load(page, { decodeEntities: false });
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
        const review: Review = {
          author_id: userId,
          book_id: $(element).parent().find("star-rating").attr("id")!,
          author: author.trim(),
          title: title ?? null,
          date,
          review: title ? reviewContent.split(date)[1].trim().split(title)[1] : reviewContent.split(date)[1].trim() + "",
          rating: parseInt($(element).parent().find("star-rating").attr("rate")!),
          profilePicture: $(page).find(".round-4").find("img").attr("src") ?? null,
        };
        reviews.push(review);
      }
    });
  });
  if (reviews.length === 0) return null;
  return reviews;
}

export { getReviews };
