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
  amazon_info?: {
    amazon_url: string | null;
    price: number | null;
    ttl: number;
    in_stock: boolean;
  };
};

// Bookshelf

interface BookshelfBook {
  rating: number;
  type: number;
  favorite: boolean;
  wished: boolean;
  review_date: Date | null;
  read_date: Date | null;
  edition: Book;
}

type Bookshelf = BookshelfBook[];
