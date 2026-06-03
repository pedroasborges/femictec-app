import { toStrapiUrl } from "../lib/strapi";
import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { normalizeStrapiList, type StrapiListResponse } from "../lib/strapi-normalize";

export type Noticia = {
  id: string;
  titulo: string;
  miniDescricao: string;
  descricao: string;
  imagemUrl: string | null;
  publishedAt: string | null;
};

export type NoticiasPageData = {
  noticias: Noticia[];
  status: "ready" | "empty" | "unavailable";
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
};

type NoticiasResponse = StrapiListResponse<StrapiNoticia>;

const NOTICIAS_ENDPOINTS = [
  "/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100",
  "/api/noticias?populate=*&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100",
  "/api/noticias?populate=*",
];

function normalizeNoticia(item: StrapiNoticia, index: number): Noticia {
  const source = item;

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
  return normalizeStrapiList<StrapiNoticia>(payload.data);
}

async function fetchNoticiasFromEndpoint(path: string): Promise<{ items: Noticia[]; reachable: boolean }> {
  try {
    const response = await fetch(toStrapiUrl(path), { cache: "no-store" });
    if (!response.ok) return { items: [], reachable: false };

    const payload = (await response.json()) as NoticiasResponse;
    const itens = normalizeResponse(payload).map(normalizeNoticia);
    return { items: itens, reachable: true };
  } catch {
    return { items: [], reachable: false };
  }
}

export async function getNoticiasPageData(): Promise<NoticiasPageData> {
  let sawReachableEndpoint = false;

  for (const endpoint of NOTICIAS_ENDPOINTS) {
    const result = await fetchNoticiasFromEndpoint(endpoint);
    if (result.reachable) sawReachableEndpoint = true;
    if (result.items.length > 0) {
      return { noticias: result.items, status: "ready" };
    }
  }

  return {
    noticias: [],
    status: sawReachableEndpoint ? "empty" : "unavailable",
  };
}

export async function getNoticias(): Promise<Noticia[]> {
  const data = await getNoticiasPageData();
  return data.noticias;
}

export type NoticiaWithNeighbors = {
  noticia: Noticia;
  anterior: Noticia | null;
  proxima: Noticia | null;
  status: "ready" | "empty" | "unavailable";
};

export async function getNoticiaWithNeighbors(id: string): Promise<NoticiaWithNeighbors | null> {
  const data = await getNoticiasPageData();
  const currentIndex = data.noticias.findIndex((item) => item.id === id);

  if (data.status !== "ready") {
    return {
      noticia: data.noticias[0] ?? {
        id: "",
        titulo: "",
        miniDescricao: "",
        descricao: "",
        imagemUrl: null,
        publishedAt: null,
      },
      anterior: null,
      proxima: null,
      status: data.status,
    };
  }

  if (currentIndex === -1) return null;

  return {
    noticia: data.noticias[currentIndex],
    anterior: data.noticias[currentIndex - 1] ?? null,
    proxima: data.noticias[currentIndex + 1] ?? null,
    status: "ready",
  };
}
