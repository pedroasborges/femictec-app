import { toStrapiUrl } from "../lib/strapi";

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
  data?: StrapiNoticia[] | null;
};

const NOTICIAS_ENDPOINT =
  "/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100";

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "children" in item) {
          const children = (item as { children?: Array<{ text?: unknown }> }).children ?? [];
          return children.map((child) => (typeof child.text === "string" ? child.text : "")).join(" ");
        }
        return "";
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return "";
}

function normalizeUrl(rawUrl: string): string {
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  return toStrapiUrl(rawUrl);
}

function findFirstUrl(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    if (value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") || value.startsWith("//")) {
      return value;
    }
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = findFirstUrl(item);
      if (url) return url;
    }
    return null;
  }

  if (typeof value !== "object") return null;

  const objectValue = value as Record<string, unknown>;

  if (typeof objectValue.url === "string") {
    return objectValue.url;
  }

  const priorityKeys = ["data", "attributes", "formats", "large", "medium", "small", "thumbnail"];
  for (const key of priorityKeys) {
    const url = findFirstUrl(objectValue[key]);
    if (url) return url;
  }

  for (const nested of Object.values(objectValue)) {
    const url = findFirstUrl(nested);
    if (url) return url;
  }

  return null;
}

function getImageUrl(image: StrapiMedia): string | null {
  const rawUrl = findFirstUrl(image);
  if (!rawUrl) return null;
  return normalizeUrl(rawUrl);
}

function normalizeNoticia(item: StrapiNoticia, index: number): Noticia {
  const source = item.attributes ?? item;

  const titulo = asText(source.titulo) || `Noticia ${index + 1}`;
  const miniDescricao = asText(source.miniDescricao);
  const descricao = asText(source.descricao);

  return {
    id: String(item.documentId ?? item.id ?? `noticia-${index + 1}`),
    titulo,
    miniDescricao: miniDescricao || descricao.slice(0, 180),
    descricao,
    imagemUrl: getImageUrl(source.imagem ?? null),
    publishedAt:
      typeof source.publishedAt === "string"
        ? source.publishedAt
        : typeof source.createdAt === "string"
          ? source.createdAt
          : null,
  };
}

export async function getNoticias(): Promise<Noticia[]> {
  try {
    const response = await fetch(toStrapiUrl(NOTICIAS_ENDPOINT), {
      next: { revalidate: 120 },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as NoticiasResponse;
    const itens = Array.isArray(payload.data) ? payload.data : [];

    return itens.map(normalizeNoticia);
  } catch {
    return [];
  }
}

export async function getNoticiaById(id: string): Promise<Noticia | null> {
  const noticias = await getNoticias();
  return noticias.find((item) => item.id === id) ?? null;
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
