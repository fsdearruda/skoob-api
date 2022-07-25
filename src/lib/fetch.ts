import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
  baseURL: "https://www.skoob.com.br",
  responseEncoding: "binary",
  headers: {
    Cookie: process.env.SKOOB_AUTH!,
  },
});

async function fetch<T>(route: string): Promise<T> {
  const { data } = await api.get(route);
  return data as T;
}

export default fetch;
