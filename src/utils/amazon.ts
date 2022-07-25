import * as cheerio from "cheerio";
import axios from "axios";

const getBookPrice = async (amazonURL: string): Promise<number | null> => {
  console.log("Fetching price of", amazonURL);
  try {
    const page = await axios.get(amazonURL, { responseEncoding: "binary" });
    const $ = cheerio.load(page.data.toString("ISO-8859-1"));
    const price = $("span#price").text().split("Â")[1].trim().replace(",", ".");
    console.log(price);
    return parseFloat(price);
  } catch (err) {
    // Caso não seja possível obter o preço, retorna null. O usuário ainda terá a URL da Amazon.
    console.log("Couldn't fetch price of", amazonURL);
    return null;
  }
};

const getBookISBN = async (skoobURL: string) => {
  console.log("Fetching isbn of", skoobURL);
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
  console.log(`URL ${skoobURL}, ISBN: ${isbn}`);
  return isbn.length >= 2 ? isbn : null;
};

const getAmazonUrl = async (isbn: string[] | null) => {
  if (!isbn) return null;
  const amazonURL = `https://amazon.com.br/dp/${isbn[1]}`;
  return amazonURL;
};

export { getBookISBN, getAmazonUrl, getBookPrice };
