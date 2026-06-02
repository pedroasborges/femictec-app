import { extractText } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
};

export type PerguntasFrequentesContent = {
  titulo: string;
  subtitulo: string;
  perguntas: PerguntaFrequente[];
  isAvailable: boolean;
};

type PerguntasFrequentesAttributes = {
  titulo?: unknown;
  subtitulo?: unknown;
  perguntas?: unknown;
};

type PerguntasFrequentesItem = PerguntasFrequentesAttributes & {
  attributes?: PerguntasFrequentesAttributes;
};

type PerguntasFrequentesResponse = {
  data?: PerguntasFrequentesItem | PerguntasFrequentesItem[] | null;
};

type PerguntaItem = {
  pergunta?: unknown;
  resposta?: unknown;
  attributes?: {
    pergunta?: unknown;
    resposta?: unknown;
  };
};

const fallbackFaq: PerguntasFrequentesContent = {
  titulo: "Perguntas Frequentes",
  subtitulo: "Duvidas comuns sobre a FEMICTEC e o uso do site",
  perguntas: [],
  isAvailable: false,
};

function normalizePergunta(value: unknown): PerguntaFrequente | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as PerguntaItem;
  const source = item.attributes ?? item;
  const pergunta = extractText(source.pergunta);
  const resposta = extractText(source.resposta);
  if (!pergunta || !resposta) return null;
  return { pergunta, resposta };
}

function mapPerguntas(value: unknown): PerguntaFrequente[] {
  if (!Array.isArray(value)) return [];
  return value.map(normalizePergunta).filter((item): item is PerguntaFrequente => item !== null);
}

export async function getPerguntasFrequentesContent(): Promise<PerguntasFrequentesContent> {
  const endpoints = ["/api/faq?populate=perguntas", "/api/faq?populate=*", "/api/perguntas-frequentes?populate=perguntas", "/api/perguntas-frequentes?populate=*"];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<PerguntasFrequentesResponse>(endpoint, { data: null });
    const raw = payload.data;
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (!item) continue;

    const source = ((item as PerguntasFrequentesItem).attributes ?? item) as PerguntasFrequentesAttributes;
    const perguntas = mapPerguntas(source.perguntas);

    if (!perguntas.length) continue;

    return {
      titulo: extractText(source.titulo) || fallbackFaq.titulo,
      subtitulo: extractText(source.subtitulo) || fallbackFaq.subtitulo,
      perguntas,
      isAvailable: true,
    };
  }

  return fallbackFaq;
}
