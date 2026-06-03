import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { normalizeStrapiList } from "../lib/strapi-normalize";
import { fetchStrapiJson } from "../lib/strapi";

type UnknownRecord = Record<string, unknown>;

export type GaleriaImagem = {
  url: string;
  alt: string;
};

export type GaleriaEdicao = {
  id: string;
  slug: string;
  titulo: string;
  dataEdicaoIso: string | null;
  dataEdicaoLabel: string;
  imagens: GaleriaImagem[];
};

export type GaleriaPageData = {
  edicoes: GaleriaEdicao[];
  status: "ready" | "empty" | "unavailable";
};

function formatDateLabel(value: string | null): string {
  if (!value) return "Data nao informada";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapImagens(value: unknown): GaleriaImagem[] {
  const items = normalizeStrapiList<UnknownRecord>(value);
  return items
    .map((item) => {
      const url = resolveMediaUrl(item);
      if (!url) return null;
      const alt = extractText(item.alternativeText) || extractText(item.name) || "Imagem da galeria";
      return { url, alt };
    })
    .filter((item): item is GaleriaImagem => item !== null);
}

function mapEdicoes(items: UnknownRecord[]): GaleriaEdicao[] {
  return items
    .map((item, index) => {
      const id = extractText(item.documentId) || extractText(item.id) || String(index + 1);
      const titulo =
        extractText(item.tituloEdicao) ||
        extractText(item.titulo) ||
        extractText(item.edicao) ||
        `Edicao ${index + 1}`;

      const slug = extractText(item.slug) || slugify(titulo);
      const dataEdicaoIso = extractText(item.dataEdicao) || extractText(item.data) || extractText(item.publishedAt) || null;
      const imagens = mapImagens(item.imagens);
      if (!imagens.length) return null;

      return {
        id,
        slug,
        titulo,
        dataEdicaoIso,
        dataEdicaoLabel: formatDateLabel(dataEdicaoIso),
        imagens,
      };
    })
    .filter((item): item is GaleriaEdicao => item !== null)
    .sort((a, b) => {
      const aTs = a.dataEdicaoIso ? new Date(a.dataEdicaoIso).getTime() : 0;
      const bTs = b.dataEdicaoIso ? new Date(b.dataEdicaoIso).getTime() : 0;
      return bTs - aTs;
    });
}

async function fetchGaleriaPayload(): Promise<unknown | null> {
  const endpoints = [
    "/api/edicao-galerias?populate=*&sort[0]=dataEdicao:desc",
    "/api/edicao-galerias?populate[imagens][populate]=*&sort[0]=dataEdicao:desc",
    "/api/galeria-edicoes?populate=*&sort[0]=dataEdicao:desc",
    "/api/galeria-edicoes?populate[imagens][populate]=*&sort[0]=dataEdicao:desc",
  ];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<unknown | null>(endpoint, null);
    if (payload) return payload;
  }
  return null;
}

export async function getGaleriaPageData(): Promise<GaleriaPageData> {
  const payload = await fetchGaleriaPayload();
  const items = normalizeStrapiList<UnknownRecord>(payload);

  if (!items.length) {
    return {
      edicoes: [],
      status: payload ? "empty" : "unavailable",
    };
  }

  return {
    edicoes: mapEdicoes(items),
    status: "ready",
  };
}

export async function getGaleriaEdicoes(): Promise<GaleriaEdicao[]> {
  const data = await getGaleriaPageData();
  return data.edicoes;
}

export async function getGaleriaEdicaoBySlug(slug: string): Promise<GaleriaEdicao | null> {
  const data = await getGaleriaPageData();
  return data.edicoes.find((item) => item.slug === slug) ?? null;
}
