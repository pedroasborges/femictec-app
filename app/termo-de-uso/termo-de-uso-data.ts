import { extractText } from "../lib/content-utils";
import { normalizeStrapiItem, type StrapiSingleResponse } from "../lib/strapi-normalize";
import { fetchStrapiJson } from "../lib/strapi";

export type TermoDeUsoContent = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  atualizadoEm: string;
  isAvailable: boolean;
};

type TermoDeUsoAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  conteudo?: unknown;
  atualizadoEm?: unknown;
};

type TermoDeUsoResponse = StrapiSingleResponse<TermoDeUsoAttributes>;

const fallbackTermo: TermoDeUsoContent = {
  titulo: "Termo de Uso",
  subtitulo: "Site da FEMICTEC - Secretaria Municipal de Educacao (SMED) - Prefeitura de Novo Hamburgo/RS",
  conteudo:
    "Este Termo de Uso regula a utilizacao do portal institucional da FEMICTEC. Ao acessar o site, voce concorda com as condicoes descritas abaixo e com as politicas complementares disponiveis nesta plataforma.",
  atualizadoEm: "nao disponivel",
  isAvailable: false,
};

export async function getTermoDeUsoContent(): Promise<TermoDeUsoContent> {
  const endpoints = ["/api/termo-de-uso?populate=*", "/api/termos-de-uso?populate=*", "/api/termo-uso?populate=*"];

  let source: TermoDeUsoAttributes = {};
  let foundContent = false;

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<TermoDeUsoResponse>(endpoint, { data: null });
    const normalized = normalizeStrapiItem<TermoDeUsoAttributes>(payload.data);
    if (normalized) {
      source = normalized;
      foundContent = true;
      break;
    }
  }

  return {
    titulo: extractText(source.titulo) || fallbackTermo.titulo,
    subtitulo: extractText(source.subtitulo) || fallbackTermo.subtitulo,
    conteudo: extractText(source.conteudo) || fallbackTermo.conteudo,
    atualizadoEm: extractText(source.atualizadoEm) || fallbackTermo.atualizadoEm,
    isAvailable: foundContent,
  };
}
