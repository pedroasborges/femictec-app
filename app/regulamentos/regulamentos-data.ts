import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { normalizeStrapiItem, type StrapiSingleResponse } from "../lib/strapi-normalize";
import { fetchStrapiJson, toStrapiUrl } from "../lib/strapi";

export type RegulamentoContent = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  pdfUrl: string | null;
  pdfLabel: string;
  isAvailable: boolean;
};

type RegulamentoAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  conteudo?: unknown;
  pdfLabel?: unknown;
  pdfArquivo?: unknown;
};

type RegulamentoResponse = StrapiSingleResponse<RegulamentoAttributes>;

const REGULAMENTOS_ENDPOINTS = ["/api/regulamento?populate=pdfArquivo", "/api/regulamento?populate=*"];

const fallbackRegulamento: RegulamentoContent = {
  titulo: "Regulamentos",
  subtitulo: "Normas e diretrizes da feira",
  conteudo: "Os regulamentos ainda nao foram publicados no CMS.",
  pdfUrl: null,
  pdfLabel: "Baixar regulamento em PDF",
  isAvailable: false,
};

function normalizeRegulamento(payload: RegulamentoResponse): RegulamentoContent {
  const source = normalizeStrapiItem<RegulamentoAttributes>(payload.data) ?? {};

  return {
    titulo: extractText(source.titulo) || fallbackRegulamento.titulo,
    subtitulo: extractText(source.subtitulo) || fallbackRegulamento.subtitulo,
    conteudo: extractText(source.conteudo) || fallbackRegulamento.conteudo,
    pdfUrl: resolveMediaUrl(source.pdfArquivo),
    pdfLabel: extractText(source.pdfLabel) || fallbackRegulamento.pdfLabel,
    isAvailable: false,
  };
}

export async function getRegulamento(): Promise<RegulamentoContent> {
  for (const endpoint of REGULAMENTOS_ENDPOINTS) {
    const payload = await fetchStrapiJson<RegulamentoResponse>(endpoint, { data: null });
    const normalized = normalizeRegulamento(payload);

    const hasCmsData =
      normalized.titulo !== fallbackRegulamento.titulo ||
      normalized.subtitulo !== fallbackRegulamento.subtitulo ||
      normalized.conteudo !== fallbackRegulamento.conteudo ||
      Boolean(normalized.pdfUrl);

    if (hasCmsData) {
      return {
        ...normalized,
        isAvailable: true,
      };
    }
  }

  return fallbackRegulamento;
}

export function toAbsolutePdfUrl(url: string | null): string | null {
  if (!url) return null;
  return toStrapiUrl(url);
}
