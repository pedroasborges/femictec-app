import { extractText } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type LocalizacaoContent = {
  titulo: string;
  descricao: string;
  endereco: string;
  coordenadas: string;
};

type LocalizacaoAttributes = {
  titulo?: unknown;
  descricao?: unknown;
  endereco?: unknown;
  coordenadas?: unknown;
};

type LocalizacaoItem = LocalizacaoAttributes & {
  attributes?: LocalizacaoAttributes;
};

type LocalizacaoResponse = {
  data?: LocalizacaoItem | null;
};

const fallbackLocalizacao: LocalizacaoContent = {
  titulo: "Localizacao",
  descricao: "Confira o local da FEMICTEC no mapa.",
  endereco: "Novo Hamburgo/RS",
  coordenadas: "-29.702856, -51.138347",
};

export async function getLocalizacaoContent(): Promise<LocalizacaoContent> {
  const payload = await fetchStrapiJson<LocalizacaoResponse>("/api/localizacao?populate=*", { data: null });
  const raw = payload.data;
  const source = raw?.attributes ?? raw ?? {};

  return {
    titulo: extractText(source.titulo) || fallbackLocalizacao.titulo,
    descricao: extractText(source.descricao) || fallbackLocalizacao.descricao,
    endereco: extractText(source.endereco) || fallbackLocalizacao.endereco,
    coordenadas: extractText(source.coordenadas) || fallbackLocalizacao.coordenadas,
  };
}

export function sanitizeCoordinates(input: string): string {
  const cleaned = input.trim().replace(/\s+/g, "");
  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(cleaned)) return cleaned;
  return fallbackLocalizacao.coordenadas.replace(/\s+/g, "");
}
