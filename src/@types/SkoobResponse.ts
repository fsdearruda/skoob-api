import type Book from "./Book";

type SkoobResponse = {
  success: boolean;
  response: any;
  logged_id?: number;
  modified?: string;
};

type SearchResult = {
  results: Book[];
};

export type { SkoobResponse, SearchResult };
