import { extractText } from "../lib/content-utils";
import { normalizeStrapiItem, type StrapiSingleResponse } from "../lib/strapi-normalize";
import { fetchStrapiJson } from "../lib/strapi";

export type PoliticaPrivacidadeContent = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  atualizadoEm: string;
  isAvailable: boolean;
};

type PoliticaPrivacidadeAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  conteudo?: unknown;
  atualizadoEm?: unknown;
};

type PoliticaPrivacidadeResponse = StrapiSingleResponse<PoliticaPrivacidadeAttributes>;

const fallbackPolitica: PoliticaPrivacidadeContent = {
  titulo: "Politica de Privacidade",
  subtitulo: "Site da FEMICTEC - Secretaria Municipal de Educacao (SMED) - Prefeitura de Novo Hamburgo/RS",
  conteudo: "Conteudo nao disponivel",
  atualizadoEm: "nao disponivel",
  isAvailable: false,
};

export async function getPoliticaPrivacidadeContent(): Promise<PoliticaPrivacidadeContent> {
  const endpoints = [
    "/api/politica-de-privacidade?populate=*",
    "/api/politica-de-privacidades?populate=*",
    "/api/politica-privacidade?populate=*",
  ];

  let source: PoliticaPrivacidadeAttributes = {};
  let foundContent = false;

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<PoliticaPrivacidadeResponse>(endpoint, { data: null });
    const normalized = normalizeStrapiItem<PoliticaPrivacidadeAttributes>(payload.data);
    if (normalized) {
      source = normalized;
      foundContent = true;
      break;
    }
  }

  return {
    titulo: extractText(source.titulo) || fallbackPolitica.titulo,
    subtitulo: extractText(source.subtitulo) || fallbackPolitica.subtitulo,
    conteudo: extractText(source.conteudo) || fallbackPolitica.conteudo,
    atualizadoEm: extractText(source.atualizadoEm) || fallbackPolitica.atualizadoEm,
    isAvailable: foundContent,
  };
}
