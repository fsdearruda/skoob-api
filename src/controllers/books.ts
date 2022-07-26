import fetch from "../lib/fetch";
import { getBookISBN, getAmazonUrl, getBookPrice } from "../utils/amazon";
import { Book, SearchResult, SkoobResponse, SkoobBook } from "../@types";

// Retorna lista de livros que contém o termo passado como parâmetro
async function getBooksByTitle(title: string, limit: number | undefined): Promise<Array<Book>> {
  const { results } = await fetch<SearchResult>(`/search/v1?q=${title}&limit=${limit || 3}`);
  return results;
}

// Retorna detalhes do livro com id passado como parâmetro
async function getBookById(id: string): Promise<Book> {
  const { response } = await fetch<SkoobResponse<SkoobBook>>(`/v1/book/${id}`);
  const book = await formatBook(response);
  return book;
}

// Transforma o livro retornado pelo Skoob em um livro com melhor formatação
async function formatBook(book: any): Promise<Book> {
  const { id, livro_id, titulo, subtitulo, ano, paginas, autor, sinopse, editora, leitores, capa_grande, url } = book;

  const isbn = await getBookISBN(url);
  const amazon_url = await getAmazonUrl(isbn);

  const formattedBook: Book = {
    id,
    livro_id,
    titulo,
    subtitulo,
    ano,
    paginas,
    autor,
    sinopse: sinopse.trim(),
    editora,
    leitores,
    isbn_10: isbn ? isbn[0] : null,
    isbn_13: isbn ? isbn[1] : null,
    skoob_url: url,
    amazon_url,
    capa: capa_grande,
    preco: amazon_url ? await getBookPrice(amazon_url) : null,
  };

  return formattedBook;
}

export { getBooksByTitle, getBookById };
