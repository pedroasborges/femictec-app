import { extractText } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type ContatoPageContent = {
  titulo: string;
  subtitulo: string;
  descricao: string;
  email: string;
  telefone: string;
  endereco: string;
};

type ContatoAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  descricao?: unknown;
  email?: unknown;
  telefone?: unknown;
  endereco?: unknown;
};

type ContatoItem = ContatoAttributes & {
  attributes?: ContatoAttributes;
};

type ContatoResponse = {
  data?: ContatoItem | null;
};

const fallbackContato: ContatoPageContent = {
  titulo: "Contato",
  subtitulo: "Fale com a organizacao",
  descricao: "Use este canal para tirar duvidas, solicitar informacoes ou registrar sua mensagem.",
  email: "femictec@novohamburgo.rs.gov.br",
  telefone: "(51) 0000-0000",
  endereco: "Novo Hamburgo/RS",
};

export async function getContatoPageContent(): Promise<ContatoPageContent> {
  const payload = await fetchStrapiJson<ContatoResponse>("/api/contato?populate=*", { data: null });
  const raw = payload.data;
  const source = raw?.attributes ?? raw ?? {};

  return {
    titulo: extractText(source.titulo) || fallbackContato.titulo,
    subtitulo: extractText(source.subtitulo) || fallbackContato.subtitulo,
    descricao: extractText(source.descricao) || fallbackContato.descricao,
    email: extractText(source.email) || fallbackContato.email,
    telefone: extractText(source.telefone) || fallbackContato.telefone,
    endereco: extractText(source.endereco) || fallbackContato.endereco,
  };
}
