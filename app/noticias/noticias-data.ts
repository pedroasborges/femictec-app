import { toStrapiUrl } from "../lib/strapi";
import { extractText, resolveMediaUrl } from "../lib/content-utils";

export type Noticia = {
  id: string;
  titulo: string;
  miniDescricao: string;
  descricao: string;
  imagemUrl: string | null;
  publishedAt: string | null;
};

type StrapiMedia = Record<string, unknown> | null;

type StrapiNoticia = {
  id?: number | string;
  documentId?: string;
  titulo?: unknown;
  miniDescricao?: unknown;
  descricao?: unknown;
  imagem?: StrapiMedia;
  publishedAt?: unknown;
  createdAt?: unknown;
  attributes?: {
    titulo?: unknown;
    miniDescricao?: unknown;
    descricao?: unknown;
    imagem?: StrapiMedia;
    publishedAt?: unknown;
    createdAt?: unknown;
  };
};

type NoticiasResponse = {
  data?: StrapiNoticia[] | StrapiNoticia | null;
};

const NOTICIAS_ENDPOINTS = [
  "/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100",
  "/api/noticias?populate=*&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100",
  "/api/noticias?populate=*",
];

function normalizeNoticia(item: StrapiNoticia, index: number): Noticia {
  const source = item.attributes ?? item;

  const titulo = extractText(source.titulo) || `Noticia ${index + 1}`;
  const miniDescricao = extractText(source.miniDescricao);
  const descricao = extractText(source.descricao);

  return {
    id: String(item.documentId ?? item.id ?? `noticia-${index + 1}`),
    titulo,
    miniDescricao: miniDescricao || descricao.slice(0, 180),
    descricao,
    imagemUrl: resolveMediaUrl(source.imagem ?? null),
    publishedAt:
      typeof source.publishedAt === "string"
        ? source.publishedAt
        : typeof source.createdAt === "string"
          ? source.createdAt
          : null,
  };
}

function normalizeResponse(payload: NoticiasResponse): StrapiNoticia[] {
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && typeof payload.data === "object") return [payload.data];
  return [];
}

async function fetchNoticiasFromEndpoint(path: string): Promise<Noticia[]> {
  const response = await fetch(toStrapiUrl(path), {
    cache: "no-store",
  });

  if (!response.ok) return [];

  const payload = (await response.json()) as NoticiasResponse;
  const itens = normalizeResponse(payload);

  return itens.map(normalizeNoticia);
}

export async function getNoticias(): Promise<Noticia[]> {
  try {
    for (const endpoint of NOTICIAS_ENDPOINTS) {
      const noticias = await fetchNoticiasFromEndpoint(endpoint);
      if (noticias.length > 0) return noticias;
    }

    return [];
  } catch {
    return [];
  }
}

export type NoticiaWithNeighbors = {
  noticia: Noticia;
  anterior: Noticia | null;
  proxima: Noticia | null;
};

export async function getNoticiaWithNeighbors(id: string): Promise<NoticiaWithNeighbors | null> {
  const noticias = await getNoticias();
  const currentIndex = noticias.findIndex((item) => item.id === id);

  if (currentIndex === -1) return null;

  return {
    noticia: noticias[currentIndex],
    anterior: noticias[currentIndex - 1] ?? null,
    proxima: noticias[currentIndex + 1] ?? null,
  };
}
