import type Book from "./Book";

type SkoobBook = {
  id: number;
  livro_id: number;
  titulo: string;
  nome_portugues: string;
  subtitulo: string;
  subtitulo_portugues: string;
  idioma: string;
  mes: number;
  ano: number;
  paginas: number;
  edicao: number;
  editora: string;
  sinopse: string;
  edicoes: number;
  leitores: number;
  capitulo_url: string;
  capa_grande: string;
  capa_media: string;
  capa_pequena: string;
  capa_mini: string;
  capa_micro: string;
  capa_nano: string;
  img_url: string;
  url: "string";
  tempo_leitura: {
    horas: number;
    minutos: number;
    segundos: number;
  };
};

type SkoobUser = {
  id: number;
  nome: string;
  apelido: string;
  cidade: string;
  estado: string;
  uf: string;
  foto_mini: string;
  foto_pequena: string;
  foto_media: string;
  foto_grande: string;
  foto: string;
  foto_placeholder: string;
  url: string;
  skoob: string;
  verified: string;
  beta: 1 | 0;
  ano: number;
  mes: number;
  about: string;
  random: number;
  premium: 1 | 0;
  termo: string;
  following: { success: 1 | 0; status: 1 | 0; description: string };
  friends: { success: 1 | 0; status: 1 | 0; description: string };
};

interface SkoobResponse<T> {
  success: boolean;
  response: T;
  cod_error?: number;
  cod_description?: string;
  logged_id?: number;
  modified?: string;
}

type SearchResult = {
  results: Book[];
};

export type { SkoobResponse, SearchResult, SkoobUser, SkoobBook };
