import fetch from "../lib/fetch";

import { convertBookshelf } from "../utils/convert";
import { Bookshelf, SkoobResponse, SkoobBookshelf } from "../@types";

export async function getBookshelf(userId: string): Promise<Bookshelf | null> {
  const { response, cod_error } = await fetch<SkoobResponse<SkoobBookshelf>>(`/v1/bookcase/books/${userId}/shelf_id:0/limit:1000000`);
  if (cod_error) return null;
  const convertedBookshelf = convertBookshelf(response);
  return convertedBookshelf;
}
