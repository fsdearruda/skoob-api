import fetch from "../lib/fetch";
import connect from "../utils/connect";

import { getAmazonUrl, getBookISBN, getBookPrice } from "../utils/amazon";

/** Retorna lista de livros que contém o termo passado como parâmetro  */
async function getBooksByTitle(title: string, limit?: number): Promise<Book[]> {
  const { results } = await fetch<SearchResult>(`/search/v1?q=${title}&limit=${limit || 3}`);
  return results;
}

/** Retorna detalhes do livro com id passado como parâmetro */
async function getBookById(bookId: string): Promise<Book> {
  try {
    const db = await connect();
    let book = await db.collection<Book>("books").findOne({ id: parseInt(bookId) });
    if (book) {
      const { _id, ...bookWithoutId } = book!;
      return bookWithoutId;
    }
    console.log("Book not found in database. Fetching from Skoob...");
    const { response } = await fetch<SkoobResponse<SkoobBook>>(`/v1/book/${bookId}`);
    const fetchedBook = await formatBook(response);
    await db.collection<Book>("books").insertOne({ ...fetchedBook });
    return fetchedBook;
  } catch (err) {
    throw err;
  }
}

/** Transforma o livro retornado pelo Skoob em um livro com melhor formatação */
async function formatBook(book: any): Promise<Book> {
  const { id, livro_id, titulo, subtitulo, ano, paginas, autor, sinopse, editora, capa_grande, url } = book;
  const isbn = await getBookISBN(url);
  let price = null;
  let amazon_url = null;
  let ttl = 0;
  if (isbn) amazon_url = await getAmazonUrl(isbn[1]);
  if (amazon_url) price = await getBookPrice(amazon_url);
  if (price) ttl = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 dias

  const formattedBook: Book = {
    id,
    book_id: livro_id,
    title: titulo,
    subtitle: subtitulo,
    year: ano,
    pages: paginas,
    author: autor,
    synopsis: sinopse.trim(),
    publisher: editora,
    skoob_url: url,
    cover: capa_grande,
    isbn_10: isbn ? isbn[0] : null,
    isbn_13: isbn ? isbn[1] : null,
    amazon_info: {
      amazon_url,
      price,
      ttl,
      in_stock: price !== null ? true : false,
    },
  };

  return formattedBook;
}

async function updateBook(book_id: string, newBook: Book) {
  try {
    const db = await connect();
    const book = await db.collection<Book>("books").findOne({
      id: Number(book_id),
    });
    if (!book) return;
    console.log("Updating book in database...");
    await db
      .collection<Book>("books")
      .updateOne({ id: Number(book_id) }, { $set: newBook })
      .then(() => console.log("Book updated!"));
  } catch (err) {
    console.log(err);
  }
}

export { getBooksByTitle, getBookById, updateBook };
