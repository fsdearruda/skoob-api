import fetch from "../lib/fetch";
import connect from "../utils/connect";
import type { User, SkoobUser, SkoobResponse, SkoobBook } from "../@types";

// TODO: Aproveitar o request para a estante do usuário para salvá-la no banco de dados
// `getUserPages` retorna o números de páginas lidas por determinado usuário
async function getUserPages(userId: string) {
  let totalPages = 0;
  // `any` deve ser substituído por tipo SkoobBookshelf.
  let { response } = await fetch<SkoobResponse<SkoobBook[]>>(`/v1/bookcase/books/${userId}/shelf_id:0/limit:1000000`);
  // `any` deve ser substituído por tipo SkoobBook.

  response.forEach((book: any) => {
    totalPages += book.paginas_lidas;
  });
  return totalPages;
}

async function getUser(userId: string): Promise<User | null> {
  const userPages = await getUserPages(userId);
  const { response, cod_error } = await fetch<SkoobResponse<SkoobUser>>(`/v1/user/${userId}`);
  if (cod_error) return null;
  const { id, nome, apelido, foto_grande, skoob, following, friends } = response;
  const user: User = { id: id.toString(), nome, apelido, skoob, foto: foto_grande, following, friends, pages: userPages };
  return user;
}

async function getUserById(id: string): Promise<User | null> {
  const db = await connect();
  const user = await db.collection<User>("users").findOne({ id });
  if (user) return user;
  const newUser = await getUser(id);
  if (!newUser) return null;
  await db.collection<User>("users").insertOne(newUser);
  return newUser;
}

export { getUserById };
