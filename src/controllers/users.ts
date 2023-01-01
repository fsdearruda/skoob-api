import fetch from "../lib/fetch";
import connect from "../utils/connect";

import { WithId } from "mongodb";

// TODO: Aproveitar o request para a estante do usuário para salvá-la no banco de dados
// `getUserPages` retorna o números de páginas lidas por determinado usuário
async function getUserPages(userId: string) {
  let totalPages = 0;
  let { response } = await fetch<SkoobResponse<SkoobBook[]>>(`/v1/bookcase/books/${userId}/shelf_id:0/limit:1000000`);

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
  const user: User = {
    id: id.toString(),
    name: nome,
    nickname: apelido,
    skoob,
    profilePicture: foto_grande,
    following: !!following.status,
    friends: !!friends.status,
    totalPages: userPages,
  };
  return user;
}

async function getUserById(userId: string): Promise<User | null> {
  const db = await connect();
  const user = await db.collection<User>("users").findOne({ id: userId });
  const { _id, ...userWithoutId } = user as WithId<User>;
  if (user) return userWithoutId;
  const newUser = await getUser(userId);
  if (!newUser) return null;
  await db.collection<User>("users").insertOne(newUser);
  return newUser;
}

export { getUserById };
