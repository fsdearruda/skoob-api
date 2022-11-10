import { Bookshelf, SkoobBookshelf, SkoobBook, Book } from "../@types";

/**  Recebe um um objeto do tipo SkoobBook e retorna um do tipo Book */
function convertBook(book: SkoobBook): Book {
  const { id, livro_id, titulo, subtitulo, ano, paginas, autor, sinopse, editora, capa_grande, url } = book;
  return {
    id: id,
    book_id: livro_id,
    title: titulo,
    subtitle: subtitulo,
    year: ano,
    pages: paginas,
    author: autor,
    synopsis: sinopse,
    publisher: editora,
    cover: capa_grande,
    skoob_url: url,
  };
}

/**  Recebe um objeto do tipo SkoobBookshelf e retorna um do tipo Bookshelf */
export const convertBookshelf = (bookshelf: SkoobBookshelf): Bookshelf => {
  return bookshelf.map(book => {
    const { tipo, ranking, desejado, favorito, paginas, dt_leitura, dt_resenha, edicao } = book;
    return {
      type: parseInt(tipo),
      rating: ranking,
      wished: !!desejado,
      favorite: !!favorito,
      pages: paginas ?? null,
      review_date: dt_resenha ? new Date(dt_resenha) : null,
      read_date: dt_leitura ? new Date(dt_leitura) : null,
      edition: convertBook(edicao),
    };
  });
};
