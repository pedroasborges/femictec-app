import { extractText } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type HomeDatasEtapa = {
  titulo: string;
  data: string;
};

export type HomeDatasContent = {
  tituloSecao: string;
  etapas: HomeDatasEtapa[];
  isAvailable: boolean;
};

type HomeDatasAttributes = {
  tituloSecao?: unknown;
  etapa1Titulo?: unknown;
  etapa1Data?: unknown;
  etapa2Titulo?: unknown;
  etapa2Data?: unknown;
  etapa3Titulo?: unknown;
  etapa3Data?: unknown;
};

type HomeDatasItem = HomeDatasAttributes & {
  attributes?: HomeDatasAttributes;
};

type HomeDatasResponse = {
  data?: HomeDatasItem | HomeDatasItem[] | null;
};

const fallbackHomeDatas: HomeDatasContent = {
  tituloSecao: "Confira as datas",
  etapas: [
    { titulo: "Inscricao", data: "Data a definir" },
    { titulo: "Submissao", data: "Data a definir" },
    { titulo: "Avaliacao", data: "Data a definir" },
  ],
  isAvailable: false,
};

export async function getHomeDatasContent(): Promise<HomeDatasContent> {
  const endpoints = [
    "/api/home-datas?populate=*",
    "/api/home-datas",
    "/api/datas-home?populate=*",
    "/api/datas-home",
    "/api/home-data?populate=*",
    "/api/home-data",
  ];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<HomeDatasResponse>(endpoint, { data: null });
    const raw = payload.data;
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (!item) continue;

    const source = ((item as HomeDatasItem).attributes ?? item) as HomeDatasAttributes;
    const etapas = [
      {
        titulo: extractText(source.etapa1Titulo) || fallbackHomeDatas.etapas[0].titulo,
        data: extractText(source.etapa1Data) || fallbackHomeDatas.etapas[0].data,
      },
      {
        titulo: extractText(source.etapa2Titulo) || fallbackHomeDatas.etapas[1].titulo,
        data: extractText(source.etapa2Data) || fallbackHomeDatas.etapas[1].data,
      },
      {
        titulo: extractText(source.etapa3Titulo) || fallbackHomeDatas.etapas[2].titulo,
        data: extractText(source.etapa3Data) || fallbackHomeDatas.etapas[2].data,
      },
    ];

    return {
      tituloSecao: extractText(source.tituloSecao) || fallbackHomeDatas.tituloSecao,
      etapas,
      isAvailable: true,
    };
  }

  return fallbackHomeDatas;
}
