type Book = {
  id: number;
  book_id: number;
  title: string;
  subtitle: string;
  year: number;
  pages: number;
  author: string;
  synopsis: string;
  publisher: string;
  cover: string;
  skoob_url: string;
  isbn_10?: string | null;
  isbn_13?: string | null;
  // amazon_url?: string | null;
  // price?: number | null;
};

export default Book;
