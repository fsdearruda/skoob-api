import fetch from "../lib/fetch";
import type { User } from "../@types";

async function getUserById(id: string): Promise<User> {
  const user = await fetch<User>(`/v1/user/${id}`);
  return user;
}

export { getUserById };
