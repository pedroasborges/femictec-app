import { fetchStrapiJson } from "../lib/strapi";
import { extractText, formatDateTimePtBr, resolveMediaUrl } from "../lib/content-utils";

type UnknownRecord = Record<string, unknown>;

export type EventoItem = {
  id: number;
  slug: string;
  nomeEvento: string;
  dados: string;
  miniDescricao: string;
  descricao: string;
  imagemEvento: string | null;
  linkInscricao: string;
  linkRegulamento: string;
};

const fallbackEventosDaFeira: EventoItem[] = [];

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractEventos(node: unknown): UnknownRecord[] {
  if (Array.isArray(node)) {
    return node.flatMap(extractEventos);
  }

  if (!node || typeof node !== "object") return [];

  const record = node as UnknownRecord;
  const hasEventoFields =
    "nomeEvento" in record ||
    "miniDescricao" in record ||
    "descricao" in record ||
    "dados" in record ||
    "data" in record ||
    "dataHorario" in record;

  const nestedValues = Object.values(record).flatMap(extractEventos);
  return hasEventoFields ? [record, ...nestedValues] : nestedValues;
}

function mapStrapiEvento(item: UnknownRecord, index: number): EventoItem | null {
  const nomeEvento = extractText(item.nomeEvento).trim();
  if (!nomeEvento) return null;

  const miniDescricao = extractText(item.miniDescricao) || "Mini descricao nao informada.";
  const descricao = extractText(item.descricao) || miniDescricao;
  const dataRaw = item.dados ?? item.data ?? item.dataHorario;
  const dados = formatDateTimePtBr(dataRaw);
  const imagemEvento = resolveMediaUrl(item.imagemEvento);
  const id = typeof item.id === "number" ? item.id : index + 1;
  const slugBase = slugify(nomeEvento) || `evento-${id}`;

  return {
    id,
    slug: slugBase,
    nomeEvento,
    dados,
    miniDescricao,
    descricao,
    imagemEvento,
    linkInscricao: "#",
    linkRegulamento: "#",
  };
}

async function fetchFromStrapi(path: string): Promise<unknown | null> {
  return fetchStrapiJson<unknown | null>(path, null);
}

async function fetchEventosPayload(): Promise<unknown | null> {
  const candidates = [
    "/api/eventos-feiras?populate=*",
    "/api/eventos-da-feira?populate=*",
    "/api/a-feira?populate=deep,5",
  ];

  for (const path of candidates) {
    const payload = await fetchFromStrapi(path);
    if (payload) return payload;
  }

  return null;
}

export async function getEventosDaFeira(): Promise<EventoItem[]> {
  const payload = await fetchEventosPayload();
  if (!payload) return fallbackEventosDaFeira;

  const rawList = extractEventos(payload);
  const mapped = rawList
    .map((item, index) => mapStrapiEvento(item, index))
    .filter((item): item is EventoItem => item !== null);

  if (mapped.length === 0) return fallbackEventosDaFeira;

  const uniqueBySlug = new Map<string, EventoItem>();
  for (const evento of mapped) {
    if (!uniqueBySlug.has(evento.slug)) {
      uniqueBySlug.set(evento.slug, evento);
    }
  }

  return Array.from(uniqueBySlug.values());
}

export async function findEventoBySlug(slug: string): Promise<EventoItem | undefined> {
  const eventos = await getEventosDaFeira();
  return eventos.find((evento) => evento.slug === slug);
}

