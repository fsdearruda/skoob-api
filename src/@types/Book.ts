type Book = {
  id: string;
  livro_id: number;
  titulo: string;
  subtitulo: string;
  ano: number;
  paginas: number;
  autor: string;
  sinopse: string;
  editora: string;
  leitores: number;
  capa: string;
  skoob_url: string;
  amazon_url?: string | null;
  isbn_10: string | null;
  isbn_13: string | null;
  preco: number | null;
};

export default Book;
