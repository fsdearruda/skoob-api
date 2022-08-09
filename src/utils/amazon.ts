import * as cheerio from "cheerio";
import axios from "axios";

/** Recebe url da amazon de um livro e retorna seu preço. Pode retornar null caso não encontre */
const getBookPrice = async (amazonURL: string | null): Promise<number | null> => {
  if (!amazonURL) return null;
  try {
    const page = await axios.get(amazonURL, { responseEncoding: "binary" });
    const $ = cheerio.load(page.data.toString("ISO-8859-1"));
    const price = $("span#price").text().split("Â")[1].trim().replace(",", ".");

    return parseFloat(price);
  } catch (err) {
    console.log("Couldn't fetch price of", amazonURL);
    return null;
  }
};

/** Recebe url do skoob e retorna array com ISBN 10 e 13 ou null  */
const getBookISBN = async (skoobURL: string): Promise<string[] | null> => {
  const page = await axios.get(`https://skoob.com.br${skoobURL}`, { responseEncoding: "binary" });
  const $ = cheerio.load(page.data.toString("ISO-8859-1"));
  let isbn: string[] = [];
  $("div[class='sidebar-desc']")
    .children()
    .each((i, el) => {
      let text = $(el).text();
      if (text) {
        isbn.push(text);
      }
    });
  if (isbn.length >= 3) {
    isbn.pop();
  }
  return isbn.length >= 2 ? isbn : null;
};

/** Recebe ISBN 13 de um livro e retorna o link da amazon do produto  */
const getAmazonUrl = async (isbn: string | null) => {
  if (!isbn) return null;
  const amazonURL = `https://amazon.com.br/dp/${isbn}`;
  return amazonURL;
};

export { getBookISBN, getAmazonUrl, getBookPrice };
