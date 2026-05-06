import { toStrapiUrl } from "../lib/strapi";
import { extractText } from "../lib/content-utils";

export type Projeto = {
  id: string;
  titulo: string;
  escola: string;
  area: string;
  participantes: number;
};

type StrapiProjeto = {
  id?: number | string;
  documentId?: string;
  Titulo?: unknown;
  escola?: unknown;
  area?: unknown;
  participantes?: unknown;
  attributes?: {
    Titulo?: unknown;
    escola?: unknown;
    area?: unknown;
    participantes?: unknown;
  };
};

type ProjetosResponse = {
  data?: StrapiProjeto[] | StrapiProjeto | null;
};

const PROJETOS_ENDPOINTS = [
  "/api/projetos?sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100",
  "/api/projetos?pagination[pageSize]=100",
];

function normalizeResponse(payload: ProjetosResponse): StrapiProjeto[] {
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && typeof payload.data === "object") return [payload.data];
  return [];
}

function toPositiveNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(",", ".").trim());
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return 0;
}

function normalizeProjeto(item: StrapiProjeto, index: number): Projeto {
  const source = item.attributes ?? item;
  const titulo = extractText(source.Titulo) || `Projeto ${index + 1}`;
  const escola = extractText(source.escola) || "Escola nao informada";
  const area = extractText(source.area) || "Area nao informada";
  const participantes = toPositiveNumber(source.participantes);

  return {
    id: String(item.documentId ?? item.id ?? `projeto-${index + 1}`),
    titulo,
    escola,
    area,
    participantes,
  };
}

async function fetchProjetosFromEndpoint(path: string): Promise<Projeto[]> {
  const response = await fetch(toStrapiUrl(path), { cache: "no-store" });
  if (!response.ok) return [];

  const payload = (await response.json()) as ProjetosResponse;
  return normalizeResponse(payload).map(normalizeProjeto);
}

export async function getProjetos(): Promise<Projeto[]> {
  try {
    for (const endpoint of PROJETOS_ENDPOINTS) {
      const projetos = await fetchProjetosFromEndpoint(endpoint);
      if (projetos.length > 0) return projetos;
    }
    return [];
  } catch {
    return [];
  }
}
