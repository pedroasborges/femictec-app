import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

type UnknownRecord = Record<string, unknown>;

type EventoFeira = {
  nomeEvento: string;
  miniDescricao: string;
  dataIso: string | null;
};

export type FeiraCronogramaItem = {
  atividade: string;
  data: string;
};

export type FeiraAtividade = {
  horario: string;
  titulo: string;
};

export type FeiraProgramacaoDia = {
  dia: string;
  data: string;
  atividades: FeiraAtividade[];
};

export type FeiraContent = {
  edicaoTitulo: string;
  edicaoDescricao: string;
  tematicaImagemUrl: string | null;
  tematicaImagemAlt: string;
  objetivosTitulo: string;
  objetivosDescricao: string;
  regulamentoTitulo: string;
  regulamentoLabel: string;
  regulamentoUrl: string;
  cronogramaTitulo: string;
  dataRealizacao: string;
  cronogramaItens: FeiraCronogramaItem[];
  mapaImagemUrl: string | null;
  mapaImagemAlt: string;
  programacaoTitulo: string;
  programacaoDias: FeiraProgramacaoDia[];
};

const fallbackContent: FeiraContent = {
  edicaoTitulo: "Edicao Atual da FEMICTEC",
  edicaoDescricao:
    "A FEMICTEC e o espaco para conectar escolas, pesquisadores e comunidade em torno de projetos que transformam o territorio.",
  tematicaImagemUrl: null,
  tematicaImagemAlt: "Tematica da edicao",
  objetivosTitulo: "Objetivos da Edicao",
  objetivosDescricao:
    "Incentivar a cultura cientifica na educacao basica, promover o intercambio entre instituicoes e ampliar a visibilidade dos projetos.",
  regulamentoTitulo: "Consulte os Regulamentos",
  regulamentoLabel: "Acessar Regulamentos",
  regulamentoUrl: "#",
  cronogramaTitulo: "Cronograma",
  dataRealizacao: "Data a definir",
  cronogramaItens: [],
  mapaImagemUrl: null,
  mapaImagemAlt: "Mapa interno da feira",
  programacaoTitulo: "Programacao Completa",
  programacaoDias: [],
};

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as UnknownRecord;
}

function normalizeItem(value: unknown): UnknownRecord | null {
  const record = asRecord(value);
  if (!record) return null;

  const attributes = asRecord(record.attributes);
  return attributes ? { ...record, ...attributes } : record;
}

function toList(value: unknown): UnknownRecord[] {
  if (Array.isArray(value)) {
    return value.map(normalizeItem).filter((item): item is UnknownRecord => item !== null);
  }

  const record = asRecord(value);
  if (!record) return [];

  if (Array.isArray(record.data)) {
    return record.data.map(normalizeItem).filter((item): item is UnknownRecord => item !== null);
  }

  const single = normalizeItem(record.data);
  return single ? [single] : [];
}

function normalizeRoot(payload: unknown): UnknownRecord | null {
  const record = asRecord(payload);
  if (!record) return null;

  if (record.data !== undefined) {
    const fromData = normalizeItem(record.data);
    if (fromData) return fromData;
  }

  return normalizeItem(record);
}

function toDate(value: unknown): Date | null {
  const text = extractText(value);
  if (!text) return null;

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed;
}

function formatDatePtBr(value: Date | null, includeTime = false): string {
  if (!value) return "Data a definir";

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "America/Sao_Paulo",
  });

  return formatter.format(value);
}

function formatHourPtBr(value: Date | null): string {
  if (!value) return "Horario a definir";

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(value);
}

function formatDayMonthPtBr(value: Date | null): string {
  if (!value) return "Data";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(value);
}

function formatWeekdayPtBr(value: Date | null): string {
  if (!value) return "Dia";

  const weekday = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    timeZone: "America/Sao_Paulo",
  }).format(value);

  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

function mapCronograma(items: UnknownRecord[]): FeiraCronogramaItem[] {
  return items
    .map((item) => {
      const atividade = extractText(item.atividade);
      const data = extractText(item.data);
      if (!atividade && !data) return null;
      return {
        atividade: atividade || "Atividade",
        data: data || "Data a definir",
      };
    })
    .filter((item): item is FeiraCronogramaItem => item !== null);
}

function mapProgramacaoDias(items: UnknownRecord[]): FeiraProgramacaoDia[] {
  return items
    .map((item, index) => {
      const dia = extractText(item.dia) || `Dia ${index + 1}`;
      const data = extractText(item.data) || "Data";
      const atividadesRaw = toList(item.atividades);

      const atividades = atividadesRaw
        .map((atividade) => {
          const horario = extractText(atividade.horario);
          const titulo = extractText(atividade.titulo);
          if (!horario && !titulo) return null;
          return {
            horario: horario || "Horario a definir",
            titulo: titulo || "Atividade",
          };
        })
        .filter((atividade): atividade is FeiraAtividade => atividade !== null);

      if (atividades.length === 0) return null;

      return {
        dia,
        data,
        atividades,
      };
    })
    .filter((item): item is FeiraProgramacaoDia => item !== null);
}

function extractEventos(node: unknown): UnknownRecord[] {
  if (Array.isArray(node)) {
    return node.flatMap(extractEventos);
  }

  const record = asRecord(node);
  if (!record) return [];

  const hasEventoFields =
    "nomeEvento" in record || "miniDescricao" in record || "dataHorario" in record || "data" in record || "dados" in record;

  const nestedValues = Object.values(record).flatMap(extractEventos);
  return hasEventoFields ? [record, ...nestedValues] : nestedValues;
}

function mapEventos(node: unknown): EventoFeira[] {
  const raw = extractEventos(node);

  const mapped = raw
    .map((item) => {
      const nomeEvento = extractText(item.nomeEvento);
      if (!nomeEvento) return null;

      const miniDescricao = extractText(item.miniDescricao);
      const dataIsoText = extractText(item.dataHorario) || extractText(item.data) || extractText(item.dados);

      return {
        nomeEvento,
        miniDescricao,
        dataIso: dataIsoText || null,
      };
    })
    .filter((item): item is EventoFeira => item !== null);

  const unique = new Map<string, EventoFeira>();
  for (const evento of mapped) {
    const key = `${evento.nomeEvento}|${evento.dataIso ?? "sem-data"}`;
    if (!unique.has(key)) unique.set(key, evento);
  }

  return Array.from(unique.values());
}

function buildCronogramaFromEventos(eventos: EventoFeira[]): FeiraCronogramaItem[] {
  return [...eventos]
    .sort((a, b) => {
      const aDate = toDate(a.dataIso)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bDate = toDate(b.dataIso)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return aDate - bDate;
    })
    .map((evento) => {
      const date = toDate(evento.dataIso);
      return {
        atividade: evento.nomeEvento,
        data: formatDatePtBr(date, true),
      };
    });
}

function buildProgramacaoFromEventos(eventos: EventoFeira[]): FeiraProgramacaoDia[] {
  const grouped = new Map<string, FeiraProgramacaoDia>();

  const sorted = [...eventos].sort((a, b) => {
    const aDate = toDate(a.dataIso)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const bDate = toDate(b.dataIso)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return aDate - bDate;
  });

  for (const evento of sorted) {
    const date = toDate(evento.dataIso);
    const dayKey = date ? date.toISOString().slice(0, 10) : "sem-data";

    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, {
        dia: formatWeekdayPtBr(date),
        data: formatDayMonthPtBr(date),
        atividades: [],
      });
    }

    const dia = grouped.get(dayKey);
    if (!dia) continue;

    dia.atividades.push({
      horario: formatHourPtBr(date),
      titulo: evento.nomeEvento,
    });
  }

  return Array.from(grouped.values()).filter((item) => item.atividades.length > 0);
}

async function fetchFeiraPayload(): Promise<unknown | null> {
  const endpoints = [
    "/api/feira?populate=*",
    "/api/feira?populate=deep,5",
    "/api/a-feira?populate=*",
    "/api/a-feira?populate=deep,5",
  ];

  for (const path of endpoints) {
    const payload = await fetchStrapiJson<unknown | null>(path, null);
    if (payload) return payload;
  }

  return null;
}

async function fetchEventosPayload(): Promise<unknown | null> {
  const endpoints = [
    "/api/eventos-feiras?populate=*&sort[0]=dataHorario:asc&sort[1]=createdAt:asc",
    "/api/eventos-feiras?populate=*",
    "/api/eventos-da-feira?populate=*",
  ];

  for (const path of endpoints) {
    const payload = await fetchStrapiJson<unknown | null>(path, null);
    if (payload) return payload;
  }

  return null;
}

export async function getFeiraContent(): Promise<FeiraContent> {
  const [feiraPayload, eventosPayload] = await Promise.all([fetchFeiraPayload(), fetchEventosPayload()]);

  const source = normalizeRoot(feiraPayload);
  const eventos = mapEventos(eventosPayload);

  const cronogramaFromStrapi = source ? mapCronograma(toList(source.cronogramaItens)) : [];
  const programacaoFromStrapi = source ? mapProgramacaoDias(toList(source.programacaoDias)) : [];

  const cronogramaFromEventos = buildCronogramaFromEventos(eventos);
  const programacaoFromEventos = buildProgramacaoFromEventos(eventos);

  const cronogramaItens = cronogramaFromStrapi.length ? cronogramaFromStrapi : cronogramaFromEventos;
  const programacaoDias = programacaoFromStrapi.length ? programacaoFromStrapi : programacaoFromEventos;

  if (!source) {
    return {
      ...fallbackContent,
      cronogramaItens,
      programacaoDias,
      dataRealizacao: cronogramaItens[0]?.data ?? fallbackContent.dataRealizacao,
    };
  }

  const regulamentoUrl = extractText(source.regulamentoUrl) || "#";

  return {
    edicaoTitulo: extractText(source.edicaoTitulo) || fallbackContent.edicaoTitulo,
    edicaoDescricao: extractText(source.edicaoDescricao) || fallbackContent.edicaoDescricao,
    tematicaImagemUrl: resolveMediaUrl(source.tematicaImagem),
    tematicaImagemAlt: extractText(source.tematicaImagemAlt) || fallbackContent.tematicaImagemAlt,
    objetivosTitulo: extractText(source.objetivosTitulo) || fallbackContent.objetivosTitulo,
    objetivosDescricao: extractText(source.objetivosDescricao) || fallbackContent.objetivosDescricao,
    regulamentoTitulo: extractText(source.regulamentoTitulo) || fallbackContent.regulamentoTitulo,
    regulamentoLabel: extractText(source.regulamentoLabel) || fallbackContent.regulamentoLabel,
    regulamentoUrl,
    cronogramaTitulo: extractText(source.cronogramaTitulo) || fallbackContent.cronogramaTitulo,
    dataRealizacao: extractText(source.dataRealizacao) || cronogramaItens[0]?.data || fallbackContent.dataRealizacao,
    cronogramaItens,
    mapaImagemUrl: resolveMediaUrl(source.mapaImagem),
    mapaImagemAlt: extractText(source.mapaImagemAlt) || fallbackContent.mapaImagemAlt,
    programacaoTitulo: extractText(source.programacaoTitulo) || fallbackContent.programacaoTitulo,
    programacaoDias,
  };
}
