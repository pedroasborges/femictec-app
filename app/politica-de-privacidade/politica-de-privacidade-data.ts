import { extractText } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type PoliticaPrivacidadeContent = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  atualizadoEm: string;
};

type PoliticaPrivacidadeAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  conteudo?: unknown;
  atualizadoEm?: unknown;
};

type PoliticaPrivacidadeItem = PoliticaPrivacidadeAttributes & {
  attributes?: PoliticaPrivacidadeAttributes;
};

type PoliticaPrivacidadeResponse = {
  data?: PoliticaPrivacidadeItem | null;
};

const fallbackPolitica: PoliticaPrivacidadeContent = {
  titulo: "Politica de Privacidade",
  subtitulo: "Site da FEMICTEC - Secretaria Municipal de Educacao (SMED) - Prefeitura de Novo Hamburgo/RS",
  conteudo: "Conteúdo não disponível",
  atualizadoEm: "não disponível",
};

export async function getPoliticaPrivacidadeContent(): Promise<PoliticaPrivacidadeContent> {
  const endpoints = [
    "/api/politica-de-privacidade?populate=*",
    "/api/politica-de-privacidades?populate=*",
    "/api/politica-privacidade?populate=*",
  ];

  let source: PoliticaPrivacidadeAttributes = {};

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<PoliticaPrivacidadeResponse>(endpoint, { data: null });
    const raw = payload.data;
    if (raw) {
      source = (raw.attributes ?? raw) as PoliticaPrivacidadeAttributes;
      break;
    }
  }

  return {
    titulo: extractText(source.titulo) || fallbackPolitica.titulo,
    subtitulo: extractText(source.subtitulo) || fallbackPolitica.subtitulo,
    conteudo: extractText(source.conteudo) || fallbackPolitica.conteudo,
    atualizadoEm: extractText(source.atualizadoEm) || fallbackPolitica.atualizadoEm,
  };
}
