import { extractText } from "../lib/content-utils";
import {
  normalizeStrapiItem,
  normalizeStrapiList,
  type StrapiSingleResponse,
} from "../lib/strapi-normalize";
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

type PerguntasFrequentesResponse = StrapiSingleResponse<PerguntasFrequentesAttributes>;

type PerguntaItem = {
  pergunta?: unknown;
  resposta?: unknown;
};

const fallbackFaq: PerguntasFrequentesContent = {
  titulo: "Perguntas Frequentes",
  subtitulo: "Duvidas comuns sobre a FEMICTEC e o uso do site",
  perguntas: [],
  isAvailable: false,
};

function normalizePergunta(source: PerguntaItem): PerguntaFrequente | null {
  const pergunta = extractText(source.pergunta);
  const resposta = extractText(source.resposta);
  if (!pergunta || !resposta) return null;
  return { pergunta, resposta };
}

function mapPerguntas(value: unknown): PerguntaFrequente[] {
  return normalizeStrapiList<PerguntaItem>(value)
    .map((item) => normalizePergunta(item))
    .filter((item): item is PerguntaFrequente => item !== null);
}

export async function getPerguntasFrequentesContent(): Promise<PerguntasFrequentesContent> {
  const endpoints = ["/api/faq?populate=perguntas", "/api/faq?populate=*", "/api/perguntas-frequentes?populate=perguntas", "/api/perguntas-frequentes?populate=*"];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<PerguntasFrequentesResponse>(endpoint, { data: null });
    const source = normalizeStrapiItem<PerguntasFrequentesAttributes>(payload.data);
    if (!source) continue;

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
