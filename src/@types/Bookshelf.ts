import Book from "./Book";

interface BookshelfBook {
  rating: number;
  type: number;
  favorite: boolean;
  wished: boolean;
  review_date: Date | null;
  read_date: Date | null;
  edition: Book;
}

type Bookshelf = Array<BookshelfBook>;

export type { Bookshelf, BookshelfBook };
