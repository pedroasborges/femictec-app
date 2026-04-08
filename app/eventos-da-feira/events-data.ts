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

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337";

const fallbackEventosDaFeira: EventoItem[] = [
  {
    id: 1,
    slug: "cerimonia-de-abertura",
    nomeEvento: "Cerimonia de Abertura",
    dados: "12/08 - 19:00",
    miniDescricao: "Inicio oficial da FEMICTEC com apresentacao das delegacoes e boas-vindas.",
    descricao:
      "A cerimonia de abertura marca o inicio da feira com recepcao institucional, apresentacoes culturais e orientacoes gerais para participantes e visitantes.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
  {
    id: 2,
    slug: "palestra-inovacao",
    nomeEvento: "Palestra",
    dados: "13/08 - 10:00",
    miniDescricao: "Painel com especialistas sobre ciencia, inovacao e impacto social.",
    descricao:
      "Encontro com convidados da area academica e tecnologica para discutir tendencias, oportunidades e desafios para jovens pesquisadores.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
  {
    id: 3,
    slug: "workshop-prototipacao",
    nomeEvento: "Workshop",
    dados: "13/08 - 14:00",
    miniDescricao: "Oficina pratica de prototipacao e validacao de ideias em equipe.",
    descricao:
      "Sessao orientada por mentores para transformar ideias em propostas testaveis, com uso de tecnicas de desenho de solucao e avaliacao rapida.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
  {
    id: 4,
    slug: "visitas-guiadas",
    nomeEvento: "Visitas Guiadas",
    dados: "14/08 - 09:00",
    miniDescricao: "Percurso orientado pelos estandes com destaque para projetos selecionados.",
    descricao:
      "Roteiro com mediacao para conhecer projetos de diferentes categorias e conversar com expositores sobre metodologia e resultados.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
  {
    id: 5,
    slug: "premiacoes",
    nomeEvento: "Premiacoes",
    dados: "14/08 - 17:00",
    miniDescricao: "Divulgacao dos destaques da edicao e entrega de certificados.",
    descricao:
      "Encerramento da avaliacao com anuncio dos projetos premiados por categoria, mencoes honrosas e reconhecimentos especiais.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
  {
    id: 6,
    slug: "cerimonia-de-encerramento",
    nomeEvento: "Cerimonia de Encerramento",
    dados: "14/08 - 18:30",
    miniDescricao: "Fechamento institucional com resumo da edicao e agradecimentos.",
    descricao:
      "Evento final com retomada dos principais momentos da feira, mensagens de encerramento e perspectivas para a proxima edicao.",
    imagemEvento: null,
    linkInscricao: "#",
    linkRegulamento: "#",
  },
];

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function getTextValue(value: unknown): string {
  const fromString = getStringValue(value).trim();
  if (fromString) return fromString;
  return blockTextToString(value);
}

function blockTextToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .flatMap((block) => {
      if (!block || typeof block !== "object") return [];
      const record = block as { children?: Array<{ text?: string }> };
      return (record.children ?? []).map((child) => child.text ?? "");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveMediaUrl(media: unknown): string | null {
  if (Array.isArray(media)) {
    for (const item of media) {
      const url = resolveMediaUrl(item);
      if (url) return url;
    }
    return null;
  }

  if (!media || typeof media !== "object") return null;

  const rawMedia = media as {
    url?: string;
    data?:
      | { url?: string; attributes?: { url?: string } }
      | Array<{ url?: string; attributes?: { url?: string } }>
      | null;
    attributes?: { url?: string };
  };

  if (Array.isArray(rawMedia.data)) {
    for (const item of rawMedia.data) {
      const url = resolveMediaUrl(item);
      if (url) return url;
    }
    return null;
  }

  const url =
    rawMedia.url ??
    rawMedia.attributes?.url ??
    rawMedia.data?.url ??
    rawMedia.data?.attributes?.url ??
    null;

  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
}

function extractEventos(node: unknown): UnknownRecord[] {
  if (Array.isArray(node)) {
    return node.flatMap(extractEventos);
  }

  if (!node || typeof node !== "object") return [];

  const record = node as UnknownRecord;
  const hasEventoFields =
    "nomeEvento" in record || "miniDescricao" in record || "descricao" in record || "dados" in record;

  const nestedValues = Object.values(record).flatMap(extractEventos);
  return hasEventoFields ? [record, ...nestedValues] : nestedValues;
}

function mapStrapiEvento(item: UnknownRecord, index: number): EventoItem | null {
  const nomeEvento = getStringValue(item.nomeEvento).trim();
  if (!nomeEvento) return null;

  const miniDescricao = blockTextToString(item.miniDescricao) || "Mini descricao nao informada.";
  const descricao = blockTextToString(item.descricao) || miniDescricao;
  const dataRaw = item.dados ?? item.data ?? item.dataHorario;
  const dataTexto = getTextValue(dataRaw).trim();
  const parsedDate = dataTexto ? new Date(dataTexto) : null;
  const dados =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }).format(parsedDate)
      : dataTexto || "Data e horario a definir";
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
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
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
